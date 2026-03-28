const XP_FACTOR = 100;

const calculateLevel = (xp) => {
  return Math.floor(Math.sqrt(xp / XP_FACTOR)) + 1;
};

const getXpForCurrentLevel = (level) => {
  return XP_FACTOR * Math.pow(level - 1, 2);
};

const getXpForNextLevel = (level) => {
  return XP_FACTOR * Math.pow(level, 2);
};

export { calculateLevel, getXpForCurrentLevel, getXpForNextLevel };