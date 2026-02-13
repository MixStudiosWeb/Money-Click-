import React, { useState } from 'react';
import { Settings, Save, Globe, Info, Trash2, AlertTriangle } from 'lucide-react';
import { GameState, Language } from '../types';
import { getTranslation } from '../locales';

interface SettingsTabProps {
  gameState: GameState;
  onLanguageChange: (lang: Language) => void;
  onSaveGame: () => void;
  onHardReset: () => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ gameState, onLanguageChange, onSaveGame, onHardReset }) => {
  const [lastSaved, setLastSaved] = useState<number | null>(null);
  const lang = gameState.language;

  const handleSave = () => {
    onSaveGame();
    setLastSaved(Date.now());
  };

  const handleReset = () => {
    const confirmMsg = getTranslation('reset_confirm', lang);
    if (window.confirm(confirmMsg)) {
      onHardReset();
    }
  };

  return (
    <div className="flex flex-col h-full p-4 pb-24 overflow-y-auto">
      <div className="flex items-center gap-2 mb-6 mt-2">
        <Settings className="text-gray-400 w-8 h-8" />
        <h2 className="text-2xl font-bold text-white">{getTranslation('settings_title', lang)}</h2>
      </div>

      <div className="space-y-6">
        {/* Language Section */}
        <div className="bg-gray-800/80 p-5 rounded-2xl border border-gray-700 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-400" />
            {getTranslation('language', lang)}
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => onLanguageChange('en')}
              className={`py-3 rounded-xl border-2 font-bold transition-all ${
                lang === 'en' 
                  ? 'bg-blue-600 border-blue-400 text-white shadow-lg' 
                  : 'bg-gray-700 border-gray-600 text-gray-400 hover:bg-gray-600'
              }`}
            >
              🇺🇸 EN
            </button>
            <button
              onClick={() => onLanguageChange('pt')}
              className={`py-3 rounded-xl border-2 font-bold transition-all ${
                lang === 'pt' 
                  ? 'bg-green-600 border-green-400 text-white shadow-lg' 
                  : 'bg-gray-700 border-gray-600 text-gray-400 hover:bg-gray-600'
              }`}
            >
              🇧🇷 PT
            </button>
            <button
              onClick={() => onLanguageChange('es')}
              className={`py-3 rounded-xl border-2 font-bold transition-all ${
                lang === 'es' 
                  ? 'bg-yellow-600 border-yellow-400 text-white shadow-lg' 
                  : 'bg-gray-700 border-gray-600 text-gray-400 hover:bg-gray-600'
              }`}
            >
              🇪🇸 ES
            </button>
          </div>
        </div>

        {/* Game Data Section */}
        <div className="bg-gray-800/80 p-5 rounded-2xl border border-gray-700 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Save className="w-5 h-5 text-green-400" />
            {getTranslation('game_data', lang)}
          </h3>
          
          {/* Manual Save */}
          <div>
            <button
              onClick={handleSave}
              className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl border border-gray-600 font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Save size={18} />
              {getTranslation('save_game', lang)}
            </button>
            <p className="text-xs text-gray-400 mt-1 text-center">
              {getTranslation('save_desc', lang)}
              {lastSaved && <span className="text-green-400 block mt-1">Saved at {new Date(lastSaved).toLocaleTimeString()}</span>}
            </p>
          </div>

          <div className="border-t border-gray-700 my-2"></div>

          {/* Hard Reset */}
          <div>
            <button
              onClick={handleReset}
              className="w-full py-3 bg-red-900/50 hover:bg-red-800 text-red-200 hover:text-white rounded-xl border border-red-800 font-bold transition-all active:scale-95 flex items-center justify-center gap-2 group"
            >
              <Trash2 size={18} className="group-hover:animate-bounce" />
              {getTranslation('reset_game', lang)}
            </button>
            <p className="text-xs text-red-400 mt-1 text-center flex items-center justify-center gap-1">
              <AlertTriangle size={12} />
              {getTranslation('reset_desc', lang)}
            </p>
          </div>
        </div>

        {/* Credits Section */}
        <div className="bg-gray-800/80 p-5 rounded-2xl border border-gray-700 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-purple-400" />
            {getTranslation('credits', lang)}
          </h3>
          
          <div className="text-center p-4 bg-gray-900/50 rounded-xl">
             <p className="text-gray-400 text-sm mb-1">{getTranslation('created_by', lang)}</p>
             <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
               MixStudios
             </p>
             <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between text-xs text-gray-500">
                <span>Gem Clicker Advanced</span>
                <span>{getTranslation('version', lang)} 2.2</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;