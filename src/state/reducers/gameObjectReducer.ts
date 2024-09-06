import { MapObjectInterface } from "../../Interfaces";
import { ActionType } from "../action-types/actionTypes";
import { Action } from "../actions/actions";
import {createTwoDimensionalArray, lol} from "../../Helpers"

const initialState: MapObjectInterface = {
    width:33, 
    height:33, 
    array: createTwoDimensionalArray(33,33), 
    startHealth:2000, 
    startScore:0, 
    levelNumber:0, 
    wallsColor:"#6049ed", 
    wallsType:0,
    characterStartCoords:[-1,-1],
    portalsCoords: []
};

const reducer = (state:MapObjectInterface = initialState, action: Action) => {
    switch(action.type){
        case ActionType.UPDATE_WIDTH:
            return {
                ...state,
                width: action.value,
                array: createTwoDimensionalArray(action.value, state.height)
            }
        case ActionType.UPDATE_HEIGHT:
            return {
                ...state,
                height:action.value,
                array: createTwoDimensionalArray(state.width, action.value)
            }
        case ActionType.UPDATE_ARRAY:
            let newArr = structuredClone(action.value)
            let stateArr = structuredClone(state.array)

            for(let i=0; i<state.width; i++)
                for(let j=0; j<state.height; j++)
                    if(newArr[j][i] !== 0 ) stateArr[j][i] = newArr[j][i]
                    else if(newArr[j][i] === -1 ) stateArr[j][i] = 0
                    
            return {
                ...state,
                array: stateArr
            }
        case ActionType.UPDATE_START_HEALTH:
            return{
                ...state,
                startHealth:action.value
            }
        case ActionType.UPDATE_START_SCORE:
            return {
                ...state,
                startScore:action.value
            }
        case ActionType.UPDATE_LEVEL_NUMBER:
            return{
                ...state,
                levelNumber:action.value
            }
        case ActionType.UPDATE_WALLS_COLOR:
            lol(action.value, state.wallsType)
            return {
                ...state,
                wallsColor: action.value
            }
        case ActionType.UPDATE_WALLS_TYPE:
            lol(state.wallsColor, action.value)
            return {
                ...state,
                wallsType:action.value
            }
        case ActionType.UPDATE_CHARACTER_COORDS:
            return {
                ...state,
                characterStartCoords: [...action.value]
            }
        case ActionType.UPDATE_WHOLE_STATE:
            return {
                ...action.value
            }
        case ActionType.UPDATE_PORTALS_COORDS:
            let newArr2 = structuredClone(action.value)
            let stateArr2 = structuredClone(state.portalsCoords)

            console.log("porta ",newArr2, stateArr2)

            if(stateArr2.length === 0){
                stateArr2 = newArr2
            }
            else{
                let found = false;
                for(let i=0; i< stateArr2.length; i++){
                    if(stateArr2[i][0] === action.value[0][0] && stateArr2[i][1] === action.value[0][1]){
                        found = true;
                        stateArr2[i][2] = action.value[0][2]
                        stateArr2[i][3] = action.value[0][3]
                    }
                }  
                if(!found) stateArr2.push(action.value[0])
            }
            
            return {
                ...state,
                portalsCoords: stateArr2
            }
        default:
            return state
    }
}


export default reducer

