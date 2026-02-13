export enum Tab {
  PLAY = 'play',
  QUESTS = 'quests',
  ACHIEVEMENTS = 'achievements',
  PRESTIGE = 'prestige',
  SETTINGS = 'settings'
}

export type Language = 'en' | 'pt' | 'es';

export interface LocalizedString {
  en: string;
  pt: string;
  es: string;
}

export interface Upgrade {
  id: string;
  name: LocalizedString;
  baseCost: number;
  costMultiplier: number;
  type: 'click' | 'auto';
  power: number; // Power added per level
  description: LocalizedString;
  icon: string;
}

export interface Quest {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  type: 'click_count' | 'currency_accumulate' | 'upgrades_buy' | 'auto_count' | 'play_time' | 'achievements_count';
  target: number;
  reward: number;
  unlockThreshold: number; // Lifetime earnings required to see this quest
}

export interface Achievement {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: string; // Emoji or Lucide name
  points: number;
  type: 'click_count' | 'currency_total' | 'upgrade_count' | 'play_time' | 'quest_count' | 'prestige_count';
  target: number;
}

// Skill Tree Types
export type SkillBranch = 'click' | 'auto' | 'prestige';

export interface SkillNode {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  branch: SkillBranch;
  maxLevel: number;
  cost: number; // SP cost per level
  position: { x: number; y: number }; // Percentage 0-100 for layout
  parents: string[]; // IDs of prerequisite skills
  icon: string;
  effect: (level: number) => string; // Returns formatted effect string
}

export interface GameState {
  currency: number;
  lifetimeCurrency: number; 
  lifetimeCurrencyPrestige: number; 
  clickCount: number;
  startTime: number;
  upgrades: Record<string, number>; // id -> level
  completedQuests: string[];
  unlockedAchievements: string[];
  prestigeLevel: number;
  prestigeCurrency: number; 
  lastSaveTime: number;
  language: Language;
  // Skill Tree
  skillPoints: number;
  skills: Record<string, number>; // id -> level
}

export interface ToastNotification {
  id: number;
  message: string;
  type: 'success' | 'achievement' | 'info' | 'crit';
}

export interface ClickEffect {
  id: number;
  x: number;
  y: number;
  value: number;
  isCrit: boolean;
}