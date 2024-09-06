export interface MapObjectInterface{
    width: number,
    height:number,
    array: number[][],
    startHealth:number,
    startScore:number,
    levelNumber:number,
    wallsColor:string,
    characterStartCoords: number[],
    wallsType:number,
    portalsCoords: number[][]
}

export interface HSLInterface{
  h:number,
  s:number,
  l:number
}

export interface colsAndRows{
  cols:number,
  rows:number
}

export interface Coords{
  x:number,
  y:number
}

export interface selectionCoords{
  xStart:number,
  yStart:number,
  xEnd:number,
  yEnd:number
}

export interface AppState{
  gameObject: MapObjectInterface;
}

export enum SpawnerMonsters{
  grunt="grunt",
  demon="demon",
  sorcerer="sorcerer",
  lobber="lobber"
}