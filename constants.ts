import { Achievement, Quest, Upgrade, SkillNode } from './types';

export const UPGRADES: Upgrade[] = [
  {
    id: 'click_double',
    name: { en: 'Double Click', pt: 'Clique Duplo', es: 'Doble Clic' },
    baseCost: 50,
    costMultiplier: 1.5,
    type: 'click',
    power: 1,
    description: { en: '+1 Click Power', pt: '+1 Poder de Clique', es: '+1 Poder de Clic' },
    icon: 'MousePointer2',
  },
  {
    id: 'auto_bot',
    name: { en: 'Auto-Clicker', pt: 'Auto-Clicker', es: 'Auto-Clic' },
    baseCost: 100,
    costMultiplier: 1.2,
    type: 'auto',
    power: 1,
    description: { en: '+1 Coin / sec', pt: '+1 Moeda / seg', es: '+1 Moneda / seg' },
    icon: 'Bot',
  },
  {
    id: 'click_mega',
    name: { en: 'Mega Clicker', pt: 'Mega Clicker', es: 'Mega Clic' },
    baseCost: 500,
    costMultiplier: 1.6,
    type: 'click',
    power: 10,
    description: { en: '+10 Click Power', pt: '+10 Poder de Clique', es: '+10 Poder de Clic' },
    icon: 'Zap',
  },
  {
    id: 'factory',
    name: { en: 'Coin Factory', pt: 'Fábrica de Moedas', es: 'Fábrica de Monedas' },
    baseCost: 2000,
    costMultiplier: 1.3,
    type: 'auto',
    power: 15,
    description: { en: '+15 Coins / sec', pt: '+15 Moedas / seg', es: '+15 Monedas / seg' },
    icon: 'Factory',
  },
  {
    id: 'mine',
    name: { en: 'Gem Mine', pt: 'Mina de Gemas', es: 'Mina de Gemas' },
    baseCost: 10000,
    costMultiplier: 1.4,
    type: 'auto',
    power: 50,
    description: { en: '+50 Coins / sec', pt: '+50 Moedas / seg', es: '+50 Monedas / seg' },
    icon: 'Pickaxe',
  },
];

export const QUESTS: Quest[] = [
  // Clicks
  { id: 'q_click_50', name: { en: 'Warming Up', pt: 'Aquecendo', es: 'Calentando' }, description: { en: 'Click 50 times', pt: 'Clique 50 vezes', es: 'Haz clic 50 veces' }, type: 'click_count', target: 50, reward: 100, unlockThreshold: 0 },
  { id: 'q_click_200', name: { en: 'Finger Workout', pt: 'Malhando o Dedo', es: 'Ejercicio de Dedo' }, description: { en: 'Click 200 times', pt: 'Clique 200 vezes', es: 'Haz clic 200 veces' }, type: 'click_count', target: 200, reward: 500, unlockThreshold: 0 },
  { id: 'q_click_1000', name: { en: 'Marathon', pt: 'Maratona', es: 'Maratón' }, description: { en: 'Click 1000 times', pt: 'Clique 1000 vezes', es: 'Haz clic 1000 veces' }, type: 'click_count', target: 1000, reward: 2000, unlockThreshold: 1000 },
  
  // Accumulation
  { id: 'q_earn_500', name: { en: 'Small Savings', pt: 'Cofrinho', es: 'Ahorros' }, description: { en: 'Earn 500 coins (Lifetime)', pt: 'Ganhe 500 moedas (Total)', es: 'Gana 500 monedas (Total)' }, type: 'currency_accumulate', target: 500, reward: 200, unlockThreshold: 0 },
  { id: 'q_earn_5000', name: { en: 'Big Wallet', pt: 'Carteira Cheia', es: 'Billetera Grande' }, description: { en: 'Earn 5,000 coins (Lifetime)', pt: 'Ganhe 5.000 moedas', es: 'Gana 5.000 monedas' }, type: 'currency_accumulate', target: 5000, reward: 1000, unlockThreshold: 200 },
  { id: 'q_earn_50000', name: { en: 'Banker', pt: 'Banqueiro', es: 'Banquero' }, description: { en: 'Earn 50,000 coins (Lifetime)', pt: 'Ganhe 50.000 moedas', es: 'Gana 50.000 monedas' }, type: 'currency_accumulate', target: 50000, reward: 5000, unlockThreshold: 5000 },
  
  // Upgrades
  { id: 'q_upg_3', name: { en: 'Shopper', pt: 'Comprador', es: 'Comprador' }, description: { en: 'Buy 3 total upgrades', pt: 'Compre 3 melhorias', es: 'Compra 3 mejoras' }, type: 'upgrades_buy', target: 3, reward: 300, unlockThreshold: 0 },
  { id: 'q_upg_dbl_5', name: { en: 'Double Trouble', pt: 'Problema em Dobro', es: 'Problema Doble' }, description: { en: 'Buy Double Click level 5', pt: 'Compre Clique Duplo niv 5', es: 'Compra Doble Clic niv 5' }, type: 'upgrades_buy', target: 5, reward: 500, unlockThreshold: 0 },
  
  // Auto
  { id: 'q_auto_2', name: { en: 'Automation', pt: 'Automação', es: 'Automatización' }, description: { en: 'Own 2 Auto-clickers', pt: 'Tenha 2 Auto-clickers', es: 'Ten 2 Auto-clics' }, type: 'auto_count', target: 2, reward: 400, unlockThreshold: 50 },
  { id: 'q_auto_5', name: { en: 'Industrial', pt: 'Industrial', es: 'Industrial' }, description: { en: 'Own 5 Auto-clickers', pt: 'Tenha 5 Auto-clickers', es: 'Ten 5 Auto-clics' }, type: 'auto_count', target: 5, reward: 1000, unlockThreshold: 500 },
  
  // Time
  { id: 'q_time_60', name: { en: 'Quick Minute', pt: 'Um Minutinho', es: 'Un Minuto' }, description: { en: 'Play for 1 minute', pt: 'Jogue por 1 minuto', es: 'Juega por 1 minuto' }, type: 'play_time', target: 60, reward: 100, unlockThreshold: 0 },
  { id: 'q_time_600', name: { en: 'Stay Awhile', pt: 'Fica um pouco', es: 'Quédate' }, description: { en: 'Play for 10 minutes', pt: 'Jogue por 10 minutos', es: 'Juega por 10 minutos' }, type: 'play_time', target: 600, reward: 500, unlockThreshold: 0 },
];

export const ACHIEVEMENTS: Achievement[] = [
  // Clicks
  { id: 'a_click_1', title: { en: 'First Step', pt: 'Primeiro Passo', es: 'Primer Paso' }, description: { en: 'Click 1 time', pt: 'Clique 1 vez', es: 'Haz clic 1 vez' }, icon: 'Pointer', points: 5, type: 'click_count', target: 1 },
  { id: 'a_click_100', title: { en: 'Clicker Novice', pt: 'Iniciante', es: 'Novato' }, description: { en: 'Click 100 times', pt: 'Clique 100 vezes', es: 'Haz clic 100 veces' }, icon: 'Mouse', points: 10, type: 'click_count', target: 100 },
  { id: 'a_click_500', title: { en: 'Clicker Pro', pt: 'Profissional', es: 'Profesional' }, description: { en: 'Click 500 times', pt: 'Clique 500 vezes', es: 'Haz clic 500 veces' }, icon: 'MousePointer2', points: 10, type: 'click_count', target: 500 },
  { id: 'a_click_2000', title: { en: 'Master Clicker', pt: 'Mestre', es: 'Maestro' }, description: { en: 'Click 2000 times', pt: 'Clique 2000 vezes', es: 'Haz clic 2000 veces' }, icon: 'Zap', points: 15, type: 'click_count', target: 2000 },
  
  // Currency
  { id: 'a_earn_100', title: { en: 'Penny', pt: 'Centavo', es: 'Centavo' }, description: { en: 'Earn 100 coins', pt: 'Ganhe 100 moedas', es: 'Gana 100 monedas' }, icon: 'Coins', points: 5, type: 'currency_total', target: 100 },
  { id: 'a_earn_10k', title: { en: 'Millionaire Starter', pt: 'Milionário Jr', es: 'Millonario Jr' }, description: { en: 'Earn 10,000 coins', pt: 'Ganhe 10.000 moedas', es: 'Gana 10.000 monedas' }, icon: 'Banknote', points: 10, type: 'currency_total', target: 10000 },
  { id: 'a_earn_100k', title: { en: 'Rich', pt: 'Rico', es: 'Rico' }, description: { en: 'Earn 100,000 coins', pt: 'Ganhe 100.000 moedas', es: 'Gana 100.000 monedas' }, icon: 'Gem', points: 15, type: 'currency_total', target: 100000 },
  { id: 'a_earn_1m', title: { en: 'Tycoon', pt: 'Magnata', es: 'Magnate' }, description: { en: 'Earn 1,000,000 coins', pt: 'Ganhe 1.000.000 moedas', es: 'Gana 1.000.000 monedas' }, icon: 'Crown', points: 20, type: 'currency_total', target: 1000000 },
  
  // Upgrades
  { id: 'a_upg_1', title: { en: 'Consumer', pt: 'Consumidor', es: 'Consumidor' }, description: { en: 'Buy your first upgrade', pt: 'Compre a primeira melhoria', es: 'Compra tu primera mejora' }, icon: 'ShoppingBag', points: 5, type: 'upgrade_count', target: 1 },
  { id: 'a_upg_10', title: { en: 'Collector', pt: 'Colecionador', es: 'Coleccionista' }, description: { en: 'Buy 10 total upgrades', pt: 'Compre 10 melhorias', es: 'Compra 10 mejoras' }, icon: 'Package', points: 15, type: 'upgrade_count', target: 10 },
  
  // Time
  { id: 'a_time_60', title: { en: 'New Player', pt: 'Novo Jogador', es: 'Nuevo Jugador' }, description: { en: 'Play for 1 minute', pt: 'Jogue por 1 minuto', es: 'Juega por 1 minuto' }, icon: 'Clock', points: 5, type: 'play_time', target: 60 },
  { id: 'a_time_600', title: { en: 'Dedicated', pt: 'Dedicado', es: 'Dedicado' }, description: { en: 'Play for 10 minutes', pt: 'Jogue por 10 minutos', es: 'Juega por 10 minutos' }, icon: 'Watch', points: 10, type: 'play_time', target: 600 },
  
  // Special
  { id: 'a_quest_1', title: { en: 'Mission Accomplished', pt: 'Missão Cumprida', es: 'Misión Cumplida' }, description: { en: 'Complete 1 quest', pt: 'Complete 1 missão', es: 'Completa 1 misión' }, icon: 'Target', points: 5, type: 'quest_count', target: 1 },
  { id: 'a_quest_5', title: { en: 'Quest Hunter', pt: 'Caçador de Missões', es: 'Cazador de Misiones' }, description: { en: 'Complete 5 quests', pt: 'Complete 5 missões', es: 'Completa 5 misiones' }, icon: 'Crosshair', points: 15, type: 'quest_count', target: 5 },
  { id: 'a_prestige_1', title: { en: 'Prestigious', pt: 'Prestigioso', es: 'Prestigioso' }, description: { en: 'Perform your first prestige', pt: 'Faça seu primeiro prestige', es: 'Haz tu primer prestigio' }, icon: 'Star', points: 25, type: 'prestige_count', target: 1 },
];

export const SKILL_TREE: SkillNode[] = [
  // Root
  {
    id: 's_root',
    name: { en: 'Genesis', pt: 'Gênese', es: 'Génesis' },
    description: { en: 'Unlock the potential of your clicks', pt: 'Libere o potencial dos seus cliques', es: 'Libera el potencial de tus clics' },
    branch: 'prestige',
    maxLevel: 1,
    cost: 1,
    position: { x: 50, y: 85 },
    parents: [],
    icon: 'Tree',
    effect: () => '+5% Global Multiplier'
  },
  
  // Click Branch (Left)
  {
    id: 's_click_base',
    name: { en: 'Sharp Touch', pt: 'Toque Afiado', es: 'Toque Afilado' },
    description: { en: 'Increases base click power', pt: 'Aumenta poder base do clique', es: 'Aumenta poder base' },
    branch: 'click',
    maxLevel: 5,
    cost: 1,
    position: { x: 25, y: 65 },
    parents: ['s_root'],
    icon: 'MousePointer2',
    effect: (lvl) => `+${lvl * 20}% Click Power`
  },
  {
    id: 's_click_crit',
    name: { en: 'Critical Strike', pt: 'Acerto Crítico', es: 'Golpe Crítico' },
    description: { en: 'Chance to deal double damage', pt: 'Chance de dano duplo', es: 'Posibilidad de doble daño' },
    branch: 'click',
    maxLevel: 5,
    cost: 1,
    position: { x: 15, y: 45 },
    parents: ['s_click_base'],
    icon: 'Zap',
    effect: (lvl) => `${lvl * 2}% Critical Chance`
  },
  
  // Auto Branch (Right)
  {
    id: 's_auto_base',
    name: { en: 'Automation', pt: 'Automação', es: 'Automatización' },
    description: { en: 'Increases auto-clicker efficiency', pt: 'Aumenta eficiência do auto', es: 'Aumenta eficiencia auto' },
    branch: 'auto',
    maxLevel: 5,
    cost: 1,
    position: { x: 75, y: 65 },
    parents: ['s_root'],
    icon: 'Bot',
    effect: (lvl) => `+${lvl * 20}% Auto Power`
  },
  {
    id: 's_auto_passive',
    name: { en: 'Passive Income', pt: 'Renda Passiva', es: 'Ingreso Pasivo' },
    description: { en: 'Boosts passive coin generation', pt: 'Melhora geração passiva', es: 'Mejora generación pasiva' },
    branch: 'auto',
    maxLevel: 5,
    cost: 1,
    position: { x: 85, y: 45 },
    parents: ['s_auto_base'],
    icon: 'Factory',
    effect: (lvl) => `+${lvl * 10}% Global Income`
  },

  // Prestige Branch (Middle)
  {
    id: 's_prestige_luck',
    name: { en: 'Ancient Wisdom', pt: 'Sabedoria Antiga', es: 'Sabiduría Antigua' },
    description: { en: 'Improves prestige bonus', pt: 'Melhora bônus de prestige', es: 'Mejora bono de prestigio' },
    branch: 'prestige',
    maxLevel: 3,
    cost: 2,
    position: { x: 50, y: 55 },
    parents: ['s_root'],
    icon: 'Crown',
    effect: (lvl) => `+${lvl * 5}% Prestige Effect`
  },
];
