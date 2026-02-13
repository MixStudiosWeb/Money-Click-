import React from 'react';
import { Target, CheckCircle2 } from 'lucide-react';
import { GameState, Quest } from '../types';
import { QUESTS } from '../constants';
import { formatNumber } from '../utils';
import { getTranslation } from '../locales';

interface QuestsTabProps {
  gameState: GameState;
  onClaimQuest: (questId: string) => void;
  clickPower: number; 
}

const QuestsTab: React.FC<QuestsTabProps> = ({ gameState, onClaimQuest }) => {
  const lang = gameState.language;

  // Logic to determine active quests
  const getActiveQuests = () => {
    // Filter out completed
    const incomplete = QUESTS.filter(q => !gameState.completedQuests.includes(q.id));
    // Filter by unlock threshold
    const unlocked = incomplete.filter(q => gameState.lifetimeCurrency >= q.unlockThreshold);
    // Take top 5
    return unlocked.slice(0, 5);
  };

  const getQuestProgress = (quest: Quest) => {
    switch (quest.type) {
      case 'click_count': return gameState.clickCount;
      case 'currency_accumulate': return gameState.lifetimeCurrency;
      case 'upgrades_buy':
        if (quest.id === 'q_upg_dbl_5') return gameState.upgrades['click_double'] || 0;
        return Object.values(gameState.upgrades).reduce((a: number, b: number) => a + b, 0);
      case 'auto_count': return gameState.upgrades['auto_bot'] || 0;
      case 'play_time': return Math.floor((Date.now() - gameState.startTime) / 1000);
      default: return 0;
    }
  };

  const activeQuests = getActiveQuests();

  return (
    <div className="flex flex-col h-full p-4 pb-24 overflow-y-auto">
      <div className="flex items-center gap-2 mb-6">
        <Target className="text-yellow-500 w-8 h-8" />
        <h2 className="text-2xl font-bold text-white">{getTranslation('active_missions', lang)}</h2>
      </div>

      <div className="space-y-4">
        {activeQuests.length === 0 ? (
          <div className="text-center p-8 bg-gray-800/50 rounded-xl border border-gray-700">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white">{getTranslation('all_clear', lang)}</h3>
            <p className="text-gray-400 mt-2">{getTranslation('all_clear_desc', lang)}</p>
          </div>
        ) : (
          activeQuests.map(quest => {
            const current = getQuestProgress(quest);
            const percent = Math.min(100, Math.floor((current / quest.target) * 100));
            const isComplete = current >= quest.target;

            return (
              <div key={quest.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg relative overflow-hidden">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-900/50 flex items-center justify-center text-yellow-400">
                      <Target size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{quest.name[lang]}</h4>
                      <p className="text-xs text-gray-400">{quest.description[lang]}</p>
                    </div>
                  </div>
                  <div className="text-green-400 font-bold text-sm bg-green-900/30 px-2 py-1 rounded">
                    +{formatNumber(quest.reward)} 💰
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>{getTranslation('progress', lang)}</span>
                    <span>{percent}% ({formatNumber(current)}/{formatNumber(quest.target)})</span>
                  </div>
                  <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${isComplete ? 'bg-green-500' : 'bg-blue-500'}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                {isComplete && (
                  <button
                    onClick={() => onClaimQuest(quest.id)}
                    className="mt-4 w-full py-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 animate-pulse"
                  >
                    <CheckCircle2 size={16} /> {getTranslation('claim_reward', lang)}
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="mt-8 border-t border-gray-700 pt-6">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">{getTranslation('completed', lang)} ({gameState.completedQuests.length})</h3>
        <div className="grid grid-cols-1 gap-2 opacity-50">
           {QUESTS.filter(q => gameState.completedQuests.includes(q.id)).map(q => (
             <div key={q.id} className="flex items-center justify-between text-xs text-gray-400 bg-gray-900 p-2 rounded">
               <span>{q.name[lang]}</span>
               <CheckCircle2 size={12} className="text-green-500" />
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default QuestsTab;