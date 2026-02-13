import React, { useState } from 'react';
import { MousePointer2, Zap, Bot, ArrowUpCircle, TreeDeciduous } from 'lucide-react';
import { GameState, ClickEffect } from '../types';
import { UPGRADES } from '../constants';
import { formatNumber, calculateCost } from '../utils';
import { getTranslation } from '../locales';

interface GameTabProps {
  gameState: GameState;
  onManualClick: () => number; // Updated to return amount
  onBuyUpgrade: (upgradeId: string) => void;
  clickPower: number;
  autoPower: number;
  multiplier: number;
  onOpenSkillTree: () => void;
}

const GameTab: React.FC<GameTabProps> = ({ 
  gameState, 
  onManualClick, 
  onBuyUpgrade, 
  clickPower, 
  autoPower,
  multiplier,
  onOpenSkillTree
}) => {
  const lang = gameState.language;
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);

  const handleGameClick = (e: React.MouseEvent) => {
    // Get stats from logic
    const amount = onManualClick();
    const isCrit = amount > clickPower;

    // Visual effect
    const newEffect: ClickEffect = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      value: amount,
      isCrit: isCrit
    };

    setClickEffects(prev => [...prev, newEffect]);

    // Cleanup effect (auto remove after animation)
    setTimeout(() => {
      setClickEffects(prev => prev.filter(eff => eff.id !== newEffect.id));
    }, 800);
  };
  
  return (
    <div className="flex flex-col h-full p-4 space-y-6 pb-24 overflow-y-auto relative no-select select-none">
      
      {/* Floating Click Effects */}
      {clickEffects.map(effect => (
        <div
          key={effect.id}
          className="fixed pointer-events-none z-50 animate-float-up font-bold text-shadow"
          style={{ 
            left: effect.x, 
            top: effect.y,
            color: effect.isCrit ? '#ff4d4d' : '#fff',
            fontSize: effect.isCrit ? '2rem' : '1.5rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          +{formatNumber(effect.value)}
          {effect.isCrit && <span className="text-xl ml-1">💥</span>}
        </div>
      ))}

      {/* Skill Tree Button - Floating Top Right */}
      <button 
        onClick={onOpenSkillTree}
        className="absolute top-2 right-2 z-20 bg-gradient-to-br from-green-600 to-green-800 p-3 rounded-full shadow-lg border-2 border-green-400 active:scale-95 transition-transform group"
      >
        <TreeDeciduous className="text-white w-6 h-6" />
        {gameState.skillPoints > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-yellow-500 text-[10px] items-center justify-center font-bold text-black border border-white">
              {gameState.skillPoints}
            </span>
          </span>
        )}
      </button>

      {/* Header Stats */}
      <div className="flex flex-col items-center justify-center space-y-2 mt-4">
        <h2 className="text-4xl font-bold text-white tracking-wider flex items-center gap-2">
          {formatNumber(gameState.currency)} <span className="text-yellow-400">💰</span>
        </h2>
        <div className="text-sm font-semibold text-purple-300 bg-purple-900/40 px-3 py-1 rounded-full border border-purple-500/30">
          {getTranslation('multiplier', lang)}: +{Math.round((multiplier - 1) * 100)}%
        </div>
      </div>

      {/* Main Button */}
      <div className="flex justify-center py-6">
        <button
          onClick={handleGameClick}
          className="relative group active:scale-95 transition-transform duration-75"
        >
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div className="w-40 h-40 rounded-full bg-gradient-to-b from-blue-500 to-blue-700 shadow-[0_10px_20px_rgba(0,0,0,0.5)] border-4 border-blue-400 flex items-center justify-center relative overflow-hidden group-hover:brightness-110 transition-all">
            <span className="text-6xl select-none">💎</span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
        <div className="flex flex-col items-center">
          <span className="text-gray-400 text-xs uppercase font-bold">{getTranslation('click_power', lang)}</span>
          <div className="flex items-center gap-1 text-xl font-bold text-white">
            <MousePointer2 className="w-4 h-4 text-cyan-400" />
            <span>+{formatNumber(clickPower)}</span>
          </div>
        </div>
        <div className="flex flex-col items-center border-l border-gray-700">
          <span className="text-gray-400 text-xs uppercase font-bold">{getTranslation('auto_sec', lang)}</span>
          <div className="flex items-center gap-1 text-xl font-bold text-white">
            <Bot className="w-4 h-4 text-green-400" />
            <span>+{formatNumber(autoPower)}</span>
          </div>
        </div>
      </div>

      {/* Upgrades Section */}
      <div className="flex flex-col space-y-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ArrowUpCircle className="w-5 h-5 text-purple-400" />
          {getTranslation('upgrades_available', lang)}
        </h3>
        
        <div className="space-y-3">
          {UPGRADES.map((upgrade) => {
            const currentLevel = gameState.upgrades[upgrade.id] || 0;
            const cost = calculateCost(upgrade.baseCost, upgrade.costMultiplier, currentLevel);
            const canAfford = gameState.currency >= cost;

            return (
              <button
                key={upgrade.id}
                onClick={() => onBuyUpgrade(upgrade.id)}
                disabled={!canAfford}
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                  canAfford 
                    ? 'bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-purple-500' 
                    : 'bg-gray-900/50 border-gray-800 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-md ${upgrade.type === 'click' ? 'bg-cyan-900/50 text-cyan-400' : 'bg-green-900/50 text-green-400'}`}>
                    {upgrade.type === 'click' ? <Zap size={20} /> : <Bot size={20} />}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white">{upgrade.name[lang]} <span className="text-xs text-gray-400 ml-1">{getTranslation('lvl', lang)} {currentLevel}</span></div>
                    <div className="text-xs text-gray-400">{upgrade.description[lang]}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`font-bold ${canAfford ? 'text-yellow-400' : 'text-red-400'}`}>
                    {formatNumber(cost)} 💰
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GameTab;