import React from 'react';
import { Award, Lock, Star, MousePointer2, Coins, Clock, ShoppingBag } from 'lucide-react';
import { GameState } from '../types';
import { ACHIEVEMENTS } from '../constants';
import { getTranslation } from '../locales';

interface AchievementsTabProps {
  gameState: GameState;
}

const AchievementsTab: React.FC<AchievementsTabProps> = ({ gameState }) => {
  const lang = gameState.language;
  const unlockedCount = gameState.unlockedAchievements.length;
  const totalCount = ACHIEVEMENTS.length;
  const totalPoints = ACHIEVEMENTS.reduce((acc, curr) => acc + (gameState.unlockedAchievements.includes(curr.id) ? curr.points : 0), 0);
  const maxPoints = ACHIEVEMENTS.reduce((acc, curr) => acc + curr.points, 0);

  const getIcon = (iconName: string, className: string) => {
    switch(iconName) {
      case 'Pointer': case 'Mouse': case 'MousePointer2': return <MousePointer2 className={className} />;
      case 'Coins': case 'Banknote': case 'Gem': case 'Crown': return <Coins className={className} />;
      case 'ShoppingBag': case 'Package': return <ShoppingBag className={className} />;
      case 'Clock': case 'Watch': return <Clock className={className} />;
      default: return <Star className={className} />;
    }
  };

  return (
    <div className="flex flex-col h-full p-4 pb-24 overflow-y-auto">
      <div className="flex items-center gap-2 mb-2">
        <Award className="text-yellow-500 w-8 h-8" />
        <h2 className="text-2xl font-bold text-white">{getTranslation('achievements', lang)}</h2>
      </div>
      
      <div className="flex justify-between items-center bg-gray-800 p-3 rounded-lg border border-gray-700 mb-6">
        <div>
           <div className="text-xs text-gray-400 uppercase">{getTranslation('unlocked', lang)}</div>
           <div className="font-bold text-white">{unlockedCount} / {totalCount}</div>
        </div>
        <div className="text-right">
           <div className="text-xs text-gray-400 uppercase">{getTranslation('points', lang)}</div>
           <div className="font-bold text-yellow-400">{totalPoints} / {maxPoints}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {ACHIEVEMENTS.map(ach => {
          const isUnlocked = gameState.unlockedAchievements.includes(ach.id);
          
          return (
            <div 
              key={ach.id} 
              className={`relative p-4 rounded-xl border flex items-center gap-4 transition-all ${
                isUnlocked 
                  ? 'bg-gradient-to-r from-gray-800 to-gray-800 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.1)]' 
                  : 'bg-gray-900 border-gray-800 opacity-60'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2 ${
                isUnlocked ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500' : 'bg-gray-800 border-gray-700 text-gray-600'
              }`}>
                {getIcon(ach.icon, isUnlocked ? "w-6 h-6" : "w-6 h-6")}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className={`font-bold ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>{ach.title[lang]}</h4>
                  {isUnlocked && <span className="text-xs font-bold text-yellow-400">+{ach.points} PTS</span>}
                </div>
                <p className="text-xs text-gray-400 mt-1">{ach.description[lang]}</p>
                
                {!isUnlocked && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-red-400/70">
                    <Lock size={10} /> {getTranslation('locked', lang)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsTab;