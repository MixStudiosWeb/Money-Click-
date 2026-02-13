import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameState, Tab, ToastNotification, Language } from './types';
import { UPGRADES, QUESTS, ACHIEVEMENTS, SKILL_TREE } from './constants';
import GameTab from './components/GameTab';
import QuestsTab from './components/QuestsTab';
import AchievementsTab from './components/AchievementsTab';
import PrestigeTab from './components/PrestigeTab';
import SettingsTab from './components/SettingsTab';
import SkillTreeModal from './components/SkillTreeModal';
import LoadingScreen from './components/LoadingScreen';
import { calculateCost } from './utils';
import { MousePointer2, Target, Award, Crown, Settings, Zap } from 'lucide-react';
import { getTranslation } from './locales';

const INITIAL_STATE: GameState = {
  currency: 0,
  lifetimeCurrency: 0,
  lifetimeCurrencyPrestige: 0,
  clickCount: 0,
  startTime: Date.now(),
  upgrades: {},
  completedQuests: [],
  unlockedAchievements: [],
  prestigeLevel: 0,
  prestigeCurrency: 0,
  lastSaveTime: Date.now(),
  language: 'pt',
  skillPoints: 0,
  skills: {},
};

// Logic to safely load game data BEFORE component render
const loadGameData = (): GameState => {
  try {
    const saved = localStorage.getItem('gemClickerSave');
    if (saved) {
      const parsed = JSON.parse(saved);
      
      // Sanitize and Migrate Data
      if (typeof parsed.prestigeLevel !== 'number' || isNaN(parsed.prestigeLevel)) parsed.prestigeLevel = 0;
      if (typeof parsed.currency !== 'number' || isNaN(parsed.currency)) parsed.currency = 0;
      if (typeof parsed.lifetimeCurrency !== 'number' || isNaN(parsed.lifetimeCurrency)) parsed.lifetimeCurrency = 0;
      if (!parsed.upgrades) parsed.upgrades = {};
      if (!parsed.language) parsed.language = 'pt';
      if (!parsed.skills) parsed.skills = {};
      
      // Migration: Calculate missing skill points
      if (typeof parsed.skillPoints !== 'number') {
          const spentSP = Object.entries(parsed.skills || {}).reduce((acc: number, [id, lvl]) => {
            const node = SKILL_TREE.find(n => n.id === id);
            return acc + (Number(lvl) * (node?.cost || 1));
          }, 0);
          parsed.skillPoints = Math.max(0, (parsed.prestigeLevel || 0) - spentSP);
      }

      // Merge saved data ON TOP of initial state to ensure new fields exist
      return { ...INITIAL_STATE, ...parsed };
    }
  } catch (e) {
    console.error("Failed to load save", e);
  }
  return INITIAL_STATE;
};

function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.PLAY);
  const [showSkillTree, setShowSkillTree] = useState(false);
  
  // Initialize state using a function (lazy init) to ensure we load localStorage 
  // BEFORE the first render. This prevents overwriting save with defaults.
  const [gameState, setGameState] = useState<GameState>(loadGameData);
  
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);
  const gameStateRef = useRef(gameState); 
  
  // Sync ref
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Centralized Save Function
  const saveGame = useCallback(() => {
    if (loading) return;
    try {
      const stateToSave = {
        ...gameStateRef.current,
        lastSaveTime: Date.now()
      };
      localStorage.setItem('gemClickerSave', JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Save failed", e);
    }
  }, [loading]);

  // Hard Reset Function
  const handleHardReset = useCallback(() => {
    localStorage.removeItem('gemClickerSave');
    window.location.reload();
  }, []);

  // Calculate Powers with Skill Tree Bonuses
  const getMultiplier = useCallback(() => {
    // Base Prestige: +1% per level
    let multiplier = 1 + (gameState.prestigeLevel * 0.01);
    
    // Skill Tree: Prestige Branch
    const rootLvl = gameState.skills['s_root'] || 0;
    multiplier += rootLvl * 0.05; // +5% global from Root

    const prestigeLuckLvl = gameState.skills['s_prestige_luck'] || 0;
    multiplier += prestigeLuckLvl * 0.05; 

    const passiveLvl = gameState.skills['s_auto_passive'] || 0;
    multiplier += passiveLvl * 0.10; // +10% global income from Auto branch end

    return multiplier;
  }, [gameState.prestigeLevel, gameState.skills]);

  const getClickPower = useCallback(() => {
    let base = 1;
    // Add upgrades
    const doubleClickLevel = gameState.upgrades['click_double'] || 0;
    const megaClickLevel = gameState.upgrades['click_mega'] || 0;
    
    base += (doubleClickLevel * 1); 
    base += (megaClickLevel * 10);

    // Skill Tree Multipliers
    const clickBaseLvl = gameState.skills['s_click_base'] || 0;
    const clickMult = 1 + (clickBaseLvl * 0.20); // +20% per level

    return Math.floor(base * getMultiplier() * clickMult);
  }, [gameState.upgrades, gameState.skills, getMultiplier]);

  const getAutoPower = useCallback(() => {
    let base = 0;
    const autoBotLevel = gameState.upgrades['auto_bot'] || 0;
    const factoryLevel = gameState.upgrades['factory'] || 0;
    const mineLevel = gameState.upgrades['mine'] || 0;

    base += (autoBotLevel * 1);
    base += (factoryLevel * 15);
    base += (mineLevel * 50);

    // Skill Tree Multipliers
    const autoBaseLvl = gameState.skills['s_auto_base'] || 0;
    const autoMult = 1 + (autoBaseLvl * 0.20);

    return Math.floor(base * getMultiplier() * autoMult);
  }, [gameState.upgrades, gameState.skills, getMultiplier]);


  // Toast System
  const addNotification = (message: string, type: 'success' | 'achievement' | 'info' | 'crit') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  // Game Loop
  useEffect(() => {
    // Only start game loop if not loading
    if (loading) return;

    const tickRate = 100; // 100ms
    const interval = setInterval(() => {
      const current = gameStateRef.current;
      const autoAmount = getAutoPower(); // Per second
      const tickAmount = autoAmount / (1000 / tickRate); 

      if (tickAmount > 0) {
        setGameState(prev => ({
          ...prev,
          currency: prev.currency + tickAmount,
          lifetimeCurrency: prev.lifetimeCurrency + tickAmount,
          lifetimeCurrencyPrestige: prev.lifetimeCurrencyPrestige + tickAmount
        }));
      }

      checkAchievements(current);
      
    }, tickRate);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAutoPower, loading]); 

  // Robust Auto-Save System
  useEffect(() => {
    if (loading) return;

    // 1. Regular interval save (every 3 seconds)
    const intervalId = setInterval(saveGame, 3000);

    // 2. Save on window unload (refresh/close)
    const handleBeforeUnload = () => saveGame();
    
    // 3. Save on visibility change (tab switch/mobile background)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        saveGame();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      saveGame(); // Final save attempt on unmount
    };
  }, [loading, saveGame]);

  const checkAchievements = (state: GameState) => {
    const unlocked = new Set(state.unlockedAchievements);
    let newUnlock = false;
    const newUnlockedIds: string[] = [];
    const lang = state.language;

    ACHIEVEMENTS.forEach(ach => {
      if (unlocked.has(ach.id)) return;

      let achieved = false;
      switch (ach.type) {
        case 'click_count': achieved = state.clickCount >= ach.target; break;
        case 'currency_total': achieved = state.lifetimeCurrency >= ach.target; break;
        case 'upgrade_count': 
          const totalUpgrades = Object.values(state.upgrades).reduce((a, b) => a + b, 0);
          achieved = totalUpgrades >= ach.target; 
          break;
        case 'play_time': 
          const secondsPlayed = (Date.now() - state.startTime) / 1000;
          achieved = secondsPlayed >= ach.target;
          break;
        case 'quest_count': achieved = state.completedQuests.length >= ach.target; break;
        case 'prestige_count': achieved = state.prestigeLevel >= ach.target; break;
      }

      if (achieved) {
        newUnlock = true;
        unlocked.add(ach.id);
        newUnlockedIds.push(ach.id);
        addNotification(`${getTranslation('ach_unlocked', lang)}: ${ach.title[lang]}`, 'achievement');
      }
    });

    if (newUnlock) {
      setGameState(prev => ({
        ...prev,
        unlockedAchievements: [...prev.unlockedAchievements, ...newUnlockedIds]
      }));
    }
  };

  // Actions
  const handleManualClick = (): number => {
    let power = getClickPower();
    let isCrit = false;
    
    // Check Critical Strike Skill
    const critLvl = gameState.skills['s_click_crit'] || 0;
    if (critLvl > 0) {
      const chance = critLvl * 0.02; // 2% per level
      if (Math.random() < chance) {
        power *= 2;
        isCrit = true;
        addNotification("CRITICAL CLICK! 2x", 'crit');
      }
    }

    setGameState(prev => ({
      ...prev,
      currency: prev.currency + power,
      lifetimeCurrency: prev.lifetimeCurrency + power,
      lifetimeCurrencyPrestige: prev.lifetimeCurrencyPrestige + power,
      clickCount: prev.clickCount + 1
    }));
    
    return power;
  };

  const handleBuyUpgrade = (upgradeId: string) => {
    const upgrade = UPGRADES.find(u => u.id === upgradeId);
    if (!upgrade) return;

    const currentLevel = gameState.upgrades[upgradeId] || 0;
    const cost = calculateCost(upgrade.baseCost, upgrade.costMultiplier, currentLevel);

    if (gameState.currency >= cost) {
      setGameState(prev => ({
        ...prev,
        currency: prev.currency - cost,
        upgrades: {
          ...prev.upgrades,
          [upgradeId]: currentLevel + 1
        }
      }));
    }
  };

  const handleClaimQuest = (questId: string) => {
    const quest = QUESTS.find(q => q.id === questId);
    if (!quest) return;

    setGameState(prev => ({
      ...prev,
      currency: prev.currency + quest.reward, 
      completedQuests: [...prev.completedQuests, questId]
    }));
    addNotification(`${getTranslation('quest_complete', gameState.language)}: +${quest.reward} Coins`, 'success');
  };

  const handlePrestige = () => {
    setGameState(prev => ({
      ...INITIAL_STATE,
      prestigeLevel: prev.prestigeLevel + 1,
      skillPoints: prev.skillPoints + 1, // Grant 1 SP per prestige
      skills: prev.skills, // Keep skills
      startTime: prev.startTime, 
      unlockedAchievements: prev.unlockedAchievements, 
      lifetimeCurrency: prev.lifetimeCurrency,
      clickCount: prev.clickCount,
      language: prev.language, // Keep language
      currency: 0,
      upgrades: {},
      completedQuests: [],
    }));
    saveGame(); // Save immediately after prestige
    addNotification(`${getTranslation('ascended', gameState.language)}`, 'success');
    setActiveTab(Tab.PLAY);
  };

  const handleBuySkill = (skillId: string) => {
    const skill = SKILL_TREE.find(s => s.id === skillId);
    if (!skill) return;
    
    if (gameState.skillPoints >= skill.cost) {
      setGameState(prev => ({
        ...prev,
        skillPoints: prev.skillPoints - skill.cost,
        skills: {
          ...prev.skills,
          [skillId]: (prev.skills[skillId] || 0) + 1
        }
      }));
    }
  };

  const handleLanguageChange = (lang: Language) => {
    setGameState(prev => ({ ...prev, language: lang }));
  };

  const handleManualSave = () => {
    saveGame();
    addNotification(getTranslation('saved_msg', gameState.language), 'success');
  };

  return (
    <div className="flex flex-col h-screen bg-[#1a1a2e] text-white overflow-hidden font-inter relative">
      
      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <>
          {/* Toast Overlay */}
          <div className="absolute top-4 right-4 z-[60] flex flex-col gap-2 pointer-events-none">
            {notifications.map(n => (
              <div key={n.id} className={`pointer-events-auto px-4 py-3 rounded shadow-lg flex items-center gap-2 text-sm font-bold animate-bounce-click ${
                n.type === 'achievement' ? 'bg-yellow-500 text-black' : 
                n.type === 'success' ? 'bg-green-500 text-white' : 
                n.type === 'crit' ? 'bg-red-600 text-white border-2 border-yellow-400' :
                'bg-blue-500 text-white'
              }`}>
                {n.type === 'achievement' && <Award size={16} />}
                {n.type === 'success' && <Target size={16} />}
                {n.type === 'crit' && <Zap size={16} />}
                {n.message}
              </div>
            ))}
          </div>

          {/* Skill Tree Modal */}
          {showSkillTree && (
            <SkillTreeModal 
              gameState={gameState} 
              onClose={() => setShowSkillTree(false)} 
              onBuySkill={handleBuySkill}
            />
          )}

          {/* Main Content Area */}
          <div className="flex-1 relative overflow-hidden">
            {activeTab === Tab.PLAY && (
              <GameTab 
                gameState={gameState} 
                onManualClick={handleManualClick} 
                onBuyUpgrade={handleBuyUpgrade}
                clickPower={getClickPower()}
                autoPower={getAutoPower()}
                multiplier={getMultiplier()}
                onOpenSkillTree={() => setShowSkillTree(true)}
              />
            )}
            {activeTab === Tab.QUESTS && (
              <QuestsTab 
                gameState={gameState} 
                onClaimQuest={handleClaimQuest}
                clickPower={getClickPower()}
              />
            )}
            {activeTab === Tab.ACHIEVEMENTS && (
              <AchievementsTab gameState={gameState} />
            )}
            {activeTab === Tab.PRESTIGE && (
              <PrestigeTab 
                gameState={gameState} 
                onPrestige={handlePrestige} 
              />
            )}
            {activeTab === Tab.SETTINGS && (
              <SettingsTab 
                gameState={gameState} 
                onLanguageChange={handleLanguageChange}
                onSaveGame={handleManualSave}
                onHardReset={handleHardReset}
              />
            )}
          </div>

          {/* Navigation Bar */}
          <div className="h-20 bg-[#0f3460] border-t border-[#4a4a6a] flex shrink-0 shadow-2xl relative z-10">
            <button 
              onClick={() => setActiveTab(Tab.PLAY)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${activeTab === Tab.PLAY ? 'text-[#e94560] bg-[#16213e]' : 'text-gray-400 hover:text-gray-200'}`}
            >
              <MousePointer2 size={24} />
              <span className="text-xs font-bold">{getTranslation('nav_play', gameState.language)}</span>
            </button>
            
            <button 
              onClick={() => setActiveTab(Tab.QUESTS)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${activeTab === Tab.QUESTS ? 'text-[#e94560] bg-[#16213e]' : 'text-gray-400 hover:text-gray-200'}`}
            >
              <div className="relative">
                <Target size={24} />
                {QUESTS.filter(q => !gameState.completedQuests.includes(q.id) && gameState.lifetimeCurrency >= q.unlockThreshold).slice(0,5).some(q => {
                  return false; 
                }) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                )}
              </div>
              <span className="text-xs font-bold">{getTranslation('nav_quests', gameState.language)}</span>
            </button>

            <button 
              onClick={() => setActiveTab(Tab.ACHIEVEMENTS)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${activeTab === Tab.ACHIEVEMENTS ? 'text-[#e94560] bg-[#16213e]' : 'text-gray-400 hover:text-gray-200'}`}
            >
              <Award size={24} />
              <span className="text-xs font-bold">{getTranslation('nav_awards', gameState.language)}</span>
            </button>

            <button 
              onClick={() => setActiveTab(Tab.PRESTIGE)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${activeTab === Tab.PRESTIGE ? 'text-yellow-400 bg-[#16213e]' : 'text-gray-400 hover:text-gray-200'}`}
            >
              <Crown size={24} />
              <span className="text-xs font-bold">{getTranslation('nav_prestige', gameState.language)}</span>
            </button>

            <button 
              onClick={() => setActiveTab(Tab.SETTINGS)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${activeTab === Tab.SETTINGS ? 'text-blue-400 bg-[#16213e]' : 'text-gray-400 hover:text-gray-200'}`}
            >
              <Settings size={24} />
              <span className="text-xs font-bold">{getTranslation('nav_settings', gameState.language)}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;