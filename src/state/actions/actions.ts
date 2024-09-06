import { MapObjectInterface } from "../../Interfaces";
import { ActionType } from "../action-types/actionTypes";

interface UpdateWidthAction {
  type: ActionType.UPDATE_WIDTH;
  value: number;
}

interface UpdateHeightAction {
  type: ActionType.UPDATE_HEIGHT;
  value: number;
}

interface UpdateArrayAction {
  type: ActionType.UPDATE_ARRAY;
  value: number[][];
}

interface UpdateStartHealthAction {
  type: ActionType.UPDATE_START_HEALTH;
  value: number;
}

interface UpdateStartScoreAction {
  type: ActionType.UPDATE_START_SCORE;
  value: number;
}

interface UpdateLevelNumberAction {
  type: ActionType.UPDATE_LEVEL_NUMBER;
  value: number;
}

interface UpdateWallsColorAction {
  type: ActionType.UPDATE_WALLS_COLOR;
  value: string;
}

interface UpdateWallsTypeAction {
  type: ActionType.UPDATE_WALLS_TYPE;
  value: number;
}

interface UpdateCharacterCoordsAction {
  type: ActionType.UPDATE_CHARACTER_COORDS;
  value: number[];
}

interface UpdateWholeState {
  type: ActionType.UPDATE_WHOLE_STATE;
  value: MapObjectInterface
}

interface UpdatePortalsCoords {
  type: ActionType.UPDATE_PORTALS_COORDS;
  value: number[][]
}

export type Action =
  | UpdateWidthAction
  | UpdateHeightAction
  | UpdateArrayAction
  | UpdateStartHealthAction
  | UpdateStartScoreAction
  | UpdateLevelNumberAction
  | UpdateWallsColorAction
  | UpdateWallsTypeAction
  | UpdateCharacterCoordsAction
  | UpdateWholeState
  | UpdatePortalsCoords;
