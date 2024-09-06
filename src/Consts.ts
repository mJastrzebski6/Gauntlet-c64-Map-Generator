export const blockCodes = {
  destructibleWalls: [1, 2, 3],
  indestructibleWalls: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  spawnersImages: [20, 21, 22, 23, 24, 25],
  exit: 26,
  glass: [27, 28],
  key: 29,
  medallion: 30,
  meat: 31,
  yellowBottle: 32,
  magicPotion: 33,
  fightPowerPotion: 34,
  magicPowerPotion: 35,
  extraArmourPotion: 36,
  extraCarryingAbilityPotion: 37,
  extraShotPower: 38,
  ghost: -80,
  grunt: -81,
  demon: -82,
  sorcerer: -83,
  lobber: -84,
  death: -85,
  spawners: [70,71,72,73,74,75,76,77,78,79,80,81],
  boxes: [39,40,41],
  portals: [42,43,44],
  purpleFog: [45,46,47]
};

export const blockGroups = {
  monsters:[
    blockCodes.ghost,
    blockCodes.grunt,
    blockCodes.death,
    blockCodes.demon,
    blockCodes.lobber,
    blockCodes.sorcerer
  ],

  walls: [
      ...blockCodes.destructibleWalls, ...blockCodes.indestructibleWalls
  ],

  noTransition: [
    ...blockCodes.destructibleWalls, ...blockCodes.indestructibleWalls, ...blockCodes.glass, ...blockCodes.spawners,
  ],

  noTransitionForProjectile: [
    ...blockCodes.destructibleWalls,
    ...blockCodes.indestructibleWalls,
    ...blockCodes.spawnersImages, 
    ...blockCodes.boxes,
    ...blockCodes.glass, 
    blockCodes.key,
    blockCodes.meat,
    blockCodes.medallion
  ],

  pickableItems: [
    ...blockCodes.boxes, 
    ...blockCodes.glass,
    blockCodes.key,
    blockCodes.yellowBottle,
    blockCodes.meat,
    blockCodes.medallion,
    blockCodes.magicPotion,
    blockCodes.fightPowerPotion,
    blockCodes.magicPowerPotion,
    blockCodes.extraArmourPotion,
    blockCodes.extraCarryingAbilityPotion,
    blockCodes.extraShotPower],

  destroyableThings: [
    ...blockCodes.destructibleWalls,
    ...blockCodes.spawnersImages,
    blockCodes.yellowBottle, 
    blockCodes.magicPotion,
    blockCodes.fightPowerPotion,
    blockCodes.magicPowerPotion,
    blockCodes.extraArmourPotion,
    blockCodes.extraCarryingAbilityPotion,
    blockCodes.extraShotPower,
  ],

  destroyableThingsByHand: [
    ...blockCodes.spawnersImages, blockCodes.grunt,blockCodes.demon,blockCodes.sorcerer,blockCodes.lobber,
  ], //...blockCodes.spawners

  destroyableByDemons: [
    blockCodes.magicPotion,
    blockCodes.fightPowerPotion,
    blockCodes.magicPowerPotion,
    blockCodes.extraArmourPotion,
    blockCodes.extraCarryingAbilityPotion,
    blockCodes.extraShotPower,
    blockCodes.yellowBottle
  ],
};

export const Constants = {
  multiplier: 5,
};
