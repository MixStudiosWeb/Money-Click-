import React from 'react';
import { X, Lock, Check, Zap, MousePointer2, Bot, Factory, Crown, TreeDeciduous } from 'lucide-react';
import { GameState, SkillNode } from '../types';
import { SKILL_TREE } from '../constants';
import { getTranslation } from '../locales';

interface SkillTreeModalProps {
  gameState: GameState;
  onClose: () => void;
  onBuySkill: (skillId: string) => void;
}

const SkillTreeModal: React.FC<SkillTreeModalProps> = ({ gameState, onClose, onBuySkill }) => {
  const lang = gameState.language;
  const { skills, skillPoints } = gameState;

  // Helper to get icon component
  const getIcon = (iconName: string, className: string) => {
    switch(iconName) {
      case 'MousePointer2': return <MousePointer2 className={className} />;
      case 'Zap': return <Zap className={className} />;
      case 'Bot': return <Bot className={className} />;
      case 'Factory': return <Factory className={className} />;
      case 'Crown': return <Crown className={className} />;
      case 'Tree': return <TreeDeciduous className={className} />;
      default: return <TreeDeciduous className={className} />;
    }
  };

  // Check if a skill is unlocked (parents bought)
  const isUnlocked = (node: SkillNode) => {
    if (node.parents.length === 0) return true;
    return node.parents.every(pid => (skills[pid] || 0) > 0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in p-4">
      <div className="bg-[#1a1a2e] w-full max-w-4xl h-[90vh] rounded-3xl border border-purple-500/30 shadow-2xl flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 bg-[#0f3460] border-b border-purple-500/20 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <TreeDeciduous className="text-green-400 w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{getTranslation('skill_tree', lang)}</h2>
              <div className="text-sm text-gray-400">
                {getTranslation('available_points', lang)}: <span className="text-yellow-400 font-bold text-lg ml-1">{skillPoints}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
          >
            <X size={28} />
          </button>
        </div>

        {/* Tree Area */}
        <div className="flex-1 relative overflow-auto bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1f2942] to-[#0f1524]">
          <div className="min-w-[800px] min-h-[600px] w-full h-full relative p-10">
            
            {/* Connection Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {SKILL_TREE.map(node => {
                return node.parents.map(parentId => {
                  const parent = SKILL_TREE.find(n => n.id === parentId);
                  if (!parent) return null;
                  
                  // Simple coordinates assumption based on percentage
                  // This relies on the container being relatively stable in aspect ratio or lines might skew
                  // For a robust system, we'd calculate pixels, but % works for responsive basics
                  return (
                    <line 
                      key={`${parentId}-${node.id}`}
                      x1={`${parent.position.x}%`} 
                      y1={`${parent.position.y}%`} 
                      x2={`${node.position.x}%`} 
                      y2={`${node.position.y}%`} 
                      stroke={(skills[parentId] || 0) > 0 ? '#667eea' : '#4a4a6a'} 
                      strokeWidth="4" 
                      className="transition-colors duration-500"
                    />
                  );
                });
              })}
            </svg>

            {/* Nodes */}
            {SKILL_TREE.map(node => {
              const currentLevel = skills[node.id] || 0;
              const locked = !isUnlocked(node);
              const maxed = currentLevel >= node.maxLevel;
              const canAfford = skillPoints >= node.cost;
              
              let statusColor = 'bg-gray-700 border-gray-600'; // Locked
              if (!locked) statusColor = 'bg-gray-800 border-blue-500 hover:bg-gray-700'; // Available
              if (currentLevel > 0) statusColor = 'bg-indigo-900 border-indigo-400'; // Bought
              if (maxed) statusColor = 'bg-yellow-900/80 border-yellow-500'; // Maxed

              return (
                <div 
                  key={node.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group z-10"
                  style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
                >
                  <button
                    onClick={() => !locked && !maxed && canAfford ? onBuySkill(node.id) : null}
                    disabled={locked || maxed || !canAfford}
                    className={`w-16 h-16 rounded-full border-4 flex items-center justify-center shadow-lg transition-all duration-300 relative ${statusColor} ${!locked && !maxed && canAfford ? 'animate-pulse hover:scale-110 cursor-pointer' : 'cursor-default'}`}
                  >
                    {locked ? <Lock size={20} className="text-gray-500" /> : getIcon(node.icon, `w-8 h-8 ${maxed ? 'text-yellow-400' : 'text-white'}`)}
                    
                    {/* Level Badge */}
                    <div className="absolute -bottom-2 -right-2 bg-black border border-gray-600 text-xs font-bold px-2 py-0.5 rounded-full text-white">
                      {currentLevel}/{node.maxLevel}
                    </div>
                  </button>

                  {/* Tooltip Card (Always visible on hover or if it's the only interaction) */}
                  <div className="absolute top-20 w-48 bg-gray-900/95 border border-gray-700 p-3 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 text-center backdrop-blur-md">
                    <h4 className="font-bold text-white text-sm">{node.name[lang]}</h4>
                    <p className="text-xs text-gray-400 mt-1 mb-2 leading-tight">{node.description[lang]}</p>
                    <div className="text-xs font-mono text-blue-300 mb-2">{node.effect(currentLevel + (maxed ? 0 : 1))}</div>
                    
                    {!maxed && (
                      <div className={`text-xs font-bold py-1 px-2 rounded ${canAfford && !locked ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'}`}>
                        {locked ? getTranslation('req_parent', lang) : `${getTranslation('cost_sp', lang)}: ${node.cost}`}
                      </div>
                    )}
                    {maxed && <div className="text-xs font-bold text-yellow-500">MAXED</div>}
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillTreeModal;