import { Dispatch } from "react";
import { ActionType } from "../action-types/actionTypes";
import { Action } from "../actions/actions";
import { MapObjectInterface } from "../../Interfaces";

export const updateWidth = (value: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.UPDATE_WIDTH,
            value: value
        })
    }
}
export const updateHeight = (value: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.UPDATE_HEIGHT,
            value: value
        })
    }
}
export const updateArray = (value: number[][]) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.UPDATE_ARRAY,
            value: value
        })
    }
}
export const updateStartScore = (value: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.UPDATE_START_SCORE,
            value: value
        })
    }
}
export const updateStartHealth = (value: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.UPDATE_START_HEALTH,
            value: value
        })
    }
}
export const updateLevelNumber = (value: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.UPDATE_LEVEL_NUMBER,
            value: value
        })
    }
}
export const updateWallsColor = (value: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.UPDATE_WALLS_COLOR,
            value: value
        })
    }
}
export const updateWallsType = (value: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.UPDATE_WALLS_TYPE,
            value: value
        })
    }
}
export const updateCharacterCoords = (value: number[]) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.UPDATE_CHARACTER_COORDS,
            value:value
        })
    }
}

export const updateWholeState = (value: MapObjectInterface) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.UPDATE_WHOLE_STATE,
            value:value
        })
    }
}

export const updatePortalsCoords = (value: number[][]) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.UPDATE_PORTALS_COORDS,
            value:value
        })
    }
}

export const updatePassagesCoords = (value: [number, number, [number, number][]]) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.UPDATE_PASSAGE_COORDS,
            value:value
        })
    }
}