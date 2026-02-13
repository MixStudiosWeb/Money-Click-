import React from 'react';
import { Crown, Sparkles, RefreshCcw, Lock } from 'lucide-react';
import { GameState } from '../types';
import { formatNumber } from '../utils';
import { getTranslation } from '../locales';

interface PrestigeTabProps {
  gameState: GameState;
  onPrestige: () => void;
}

const PrestigeTab: React.FC<PrestigeTabProps> = ({ gameState, onPrestige }) => {
  const PRESTIGE_COST = 10000;
  const level = gameState.prestigeLevel || 0;
  const lang = gameState.language;
  
  const currentCost = Math.floor(PRESTIGE_COST * Math.pow(1.5, level));
  const canPrestige = gameState.currency >= currentCost;
  
  // Guard against NaN
  let progressPercent = 0;
  if (currentCost > 0) {
    progressPercent = Math.min(100, (gameState.currency / currentCost) * 100);
  }
  if (isNaN(progressPercent)) progressPercent = 0;

  return (
    <div className="flex flex-col h-full p-4 pb-24 overflow-y-auto">
      <div className="flex flex-col items-center mb-8 mt-4 text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-20"></div>
          <Crown className="w-20 h-20 text-yellow-400 mb-4 relative z-10" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-wider">{getTranslation('nav_prestige', lang)}</h2>
        <div className="mt-2 text-purple-300 font-semibold bg-purple-900/30 px-4 py-1 rounded-full border border-purple-500/30">
          {getTranslation('current_level', lang)}: {level}
        </div>
        <div className="text-gray-400 mt-2 text-sm">
          {getTranslation('global_multiplier', lang)}: <span className="text-white font-bold">+{level}%</span>
        </div>
      </div>

      <div className="bg-gray-800/80 p-6 rounded-2xl border border-gray-700 shadow-xl space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-2">{getTranslation('next_ascension', lang)}</h3>
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>{getTranslation('requirement', lang)}</span>
            <span>{formatNumber(gameState.currency)} / {formatNumber(currentCost)} Coins</span>
          </div>
          <div className="h-3 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
             <div 
               className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 transition-all duration-500" 
               style={{ width: `${progressPercent}%` }}
             ></div>
          </div>
        </div>

        <div className="bg-gray-900/50 p-4 rounded-lg text-sm text-gray-300 space-y-2">
          <p className="font-bold text-white flex items-center gap-2">
            <RefreshCcw size={14} className="text-red-400" />
            {getTranslation('upon_prestige', lang)}
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li className="text-red-300">{getTranslation('reset_coins', lang)}</li>
            <li className="text-red-300">{getTranslation('reset_upgrades', lang)}</li>
            <li className="text-red-300">{getTranslation('reset_quests', lang)}</li>
            <li className="text-green-400 font-bold">{getTranslation('gain_level', lang)}</li>
            <li className="text-green-400 font-bold">{getTranslation('gain_mult', lang)}</li>
          </ul>
        </div>

        <button
          onClick={onPrestige}
          disabled={!canPrestige}
          className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${
            canPrestige 
              ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-black hover:brightness-110 active:scale-95' 
              : 'bg-gray-700 text-gray-500 cursor-not-allowed grayscale'
          }`}
        >
          {canPrestige ? <Sparkles className="animate-spin" /> : <Lock size={20} />}
          {canPrestige ? getTranslation('ascend_now', lang) : getTranslation('locked_btn', lang)}
        </button>
      </div>

      <div className="mt-8">
        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">{getTranslation('prestige_history', lang)}</h4>
        <div className="space-y-2">
           {Array.from({length: Math.max(0, level)}).map((_, i) => (
             <div key={i} className="flex justify-between items-center bg-gray-900 p-3 rounded border border-gray-800 opacity-60">
               <span className="text-gray-400 text-sm">{getTranslation('ascension_num', lang)}{i+1}</span>
               <span className="text-yellow-500 text-xs font-bold">+1% {getTranslation('multiplier', lang)}</span>
             </div>
           ))}
           {level === 0 && (
             <div className="text-center text-xs text-gray-600 italic py-2">{getTranslation('no_ascensions', lang)}</div>
           )}
        </div>
      </div>
    </div>
  );
};

export default PrestigeTab;