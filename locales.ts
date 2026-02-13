import { Language } from './types';

type TranslationMap = Record<string, Record<Language, string>>;

export const UI_TEXT: TranslationMap = {
  // Navigation
  nav_play: { en: 'Play', pt: 'Jogar', es: 'Jugar' },
  nav_quests: { en: 'Quests', pt: 'Missões', es: 'Misiones' },
  nav_awards: { en: 'Awards', pt: 'Conquistas', es: 'Logros' },
  nav_prestige: { en: 'Prestige', pt: 'Prestige', es: 'Prestigio' },
  nav_settings: { en: 'Settings', pt: 'Ajustes', es: 'Ajustes' },

  // Game Tab
  multiplier: { en: 'Multiplier', pt: 'Multiplicador', es: 'Multiplicador' },
  click_power: { en: 'Click Power', pt: 'Poder de Clique', es: 'Poder de Clic' },
  auto_sec: { en: 'Auto / Sec', pt: 'Auto / Seg', es: 'Auto / Seg' },
  upgrades_available: { en: 'Upgrades Available', pt: 'Melhorias Disponíveis', es: 'Mejoras Disponibles' },
  lvl: { en: 'Lvl', pt: 'Niv', es: 'Niv' },

  // Quests Tab
  active_missions: { en: 'Active Missions', pt: 'Missões Ativas', es: 'Misiones Activas' },
  all_clear: { en: 'All Clear!', pt: 'Tudo Limpo!', es: '¡Todo Listo!' },
  all_clear_desc: { en: 'Earn more coins to unlock higher tier missions.', pt: 'Ganhe mais moedas para desbloquear novas missões.', es: 'Gana más monedas para desbloquear nuevas misiones.' },
  progress: { en: 'Progress', pt: 'Progresso', es: 'Progreso' },
  claim_reward: { en: 'Claim Reward', pt: 'Receber Prêmio', es: 'Reclamar' },
  completed: { en: 'Completed', pt: 'Completas', es: 'Completadas' },

  // Achievements Tab
  achievements: { en: 'Achievements', pt: 'Conquistas', es: 'Logros' },
  unlocked: { en: 'Unlocked', pt: 'Desbloqueados', es: 'Desbloqueados' },
  points: { en: 'Points', pt: 'Pontos', es: 'Puntos' },
  locked: { en: 'Locked', pt: 'Bloqueado', es: 'Bloqueado' },

  // Prestige Tab
  current_level: { en: 'Current Level', pt: 'Nível Atual', es: 'Nivel Actual' },
  global_multiplier: { en: 'Global Multiplier', pt: 'Mult. Global', es: 'Mult. Global' },
  next_ascension: { en: 'Next Ascension', pt: 'Próxima Ascensão', es: 'Siguiente Ascensión' },
  requirement: { en: 'Requirement', pt: 'Requisito', es: 'Requisito' },
  upon_prestige: { en: 'Upon Prestige:', pt: 'Ao Prestigiar:', es: 'Al Prestigiar:' },
  reset_coins: { en: 'Coins reset to 0', pt: 'Moedas resetam para 0', es: 'Monedas a 0' },
  reset_upgrades: { en: 'Upgrades reset to 0', pt: 'Melhorias resetam para 0', es: 'Mejoras a 0' },
  reset_quests: { en: 'Completed Quests reset', pt: 'Missões resetam', es: 'Misiones se reinician' },
  gain_level: { en: 'Prestige Level +1', pt: 'Nível de Prestige +1', es: 'Nivel de Prestigio +1' },
  gain_mult: { en: 'Multiplier increases by +1%', pt: 'Multiplicador aumenta +1%', es: 'Multiplicador aumenta +1%' },
  ascend_now: { en: 'ASCEND NOW', pt: 'PRESTIGIAR AGORA', es: 'ASCENDER AHORA' },
  locked_btn: { en: 'LOCKED', pt: 'BLOQUEADO', es: 'BLOQUEADO' },
  prestige_history: { en: 'Prestige History', pt: 'Histórico', es: 'Historial' },
  ascension_num: { en: 'Ascension #', pt: 'Ascensão #', es: 'Ascensión #' },
  no_ascensions: { en: 'No ascensions yet.', pt: 'Nenhum prestige ainda.', es: 'Sin ascensiones aún.' },

  // Settings Tab
  settings_title: { en: 'Settings', pt: 'Configurações', es: 'Configuración' },
  language: { en: 'Language', pt: 'Idioma', es: 'Idioma' },
  game_data: { en: 'Game Data', pt: 'Dados do Jogo', es: 'Datos de Juego' },
  save_game: { en: 'Save Game', pt: 'Salvar Jogo', es: 'Guardar Juego' },
  save_desc: { en: 'Manually save your progress', pt: 'Salvar progresso manualmente', es: 'Guardar progreso manualmente' },
  reset_game: { en: 'HARD RESET', pt: 'APAGAR SAVE', es: 'BORRAR DATOS' },
  reset_desc: { en: 'Wipe all progress and restart', pt: 'Apagar tudo e reiniciar do zero', es: 'Borrar todo y reiniciar' },
  reset_confirm: { en: 'Are you sure? This will delete ALL progress permanently!', pt: 'Tem certeza? Isso apagará TODO o progresso permanentemente!', es: '¿Estás seguro? ¡Esto borrará TODO el progreso permanentemente!' },
  credits: { en: 'Credits', pt: 'Créditos', es: 'Créditos' },
  created_by: { en: 'Created by', pt: 'Criado por', es: 'Creado por' },
  version: { en: 'Version', pt: 'Versão', es: 'Versión' },
  
  // Notifications
  saved_msg: { en: 'Game Saved Successfully!', pt: 'Jogo Salvo com Sucesso!', es: '¡Juego Guardado con Éxito!' },
  quest_complete: { en: 'Quest Complete', pt: 'Missão Completa', es: 'Misión Completa' },
  ach_unlocked: { en: 'Achievement Unlocked', pt: 'Conquista Desbloqueada', es: 'Logro Desbloqueado' },
  ascended: { en: 'Ascended!', pt: 'Ascendeu!', es: '¡Ascendió!' },
  
  // Skill Tree
  skill_tree: { en: 'Skill Tree', pt: 'Árvore de Habilidades', es: 'Árbol de Habilidades' },
  available_points: { en: 'Available Points', pt: 'Pontos Disponíveis', es: 'Puntos Disponibles' },
  max_level: { en: 'Max Level', pt: 'Nível Máx', es: 'Nivel Máx' },
  buy_skill: { en: 'Unlock Skill', pt: 'Desbloquear', es: 'Desbloquear' },
  upgrade_skill: { en: 'Upgrade', pt: 'Melhorar', es: 'Mejorar' },
  cost_sp: { en: 'SP', pt: 'Pts', es: 'Pts' },
  req_parent: { en: 'Requires previous skill', pt: 'Requer habilidade anterior', es: 'Requiere habilidad anterior' },
};

export const getTranslation = (key: string, lang: Language): string => {
  return UI_TEXT[key]?.[lang] || UI_TEXT[key]?.['en'] || key;
};