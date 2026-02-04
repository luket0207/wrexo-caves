export const checkStartBattleEffects = ({ player, enemies, biome }) => {
  console.log("Checking start battle effects", { player, enemies, biome });
};

export const checkStartTurnEffects = ({ turnOwner }) => {
  console.log("Checking start turn effects", { turnOwner });
};

export const checkRollEffects = ({ turnOwner, roll }) => {
  console.log("Checking roll effects", { turnOwner, roll });
};

export const checkEndTurnEffects = ({ turnOwner }) => {
  console.log("Checking end turn effects", { turnOwner });
};

export const deathCheck = () => {
  console.log("Checked for death");
  return false;
};
