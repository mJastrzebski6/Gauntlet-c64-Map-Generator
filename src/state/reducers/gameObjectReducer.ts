import { MapObjectInterface } from "../../Interfaces";
import { ActionType } from "../action-types/actionTypes";
import { Action } from "../actions/actions";
import {createTwoDimensionalArray, lol} from "../../Helpers"
import { blockCodes } from "../../Consts";

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
    portalsCoords: [],
    passagesCoords: []
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
                    if(newArr[j][i] === -1 ) stateArr[j][i] = 0
                    else if(newArr[j][i] !== 0 ) stateArr[j][i] = newArr[j][i]
                    

            
            let updatedPortalsCoords = updatePortals(state.portalsCoords, stateArr);
            let updatedPassagesCoords = updatePassages(state.passagesCoords, stateArr);

            return {
                ...state,
                array: stateArr,
                portalsCoords: updatedPortalsCoords,
                passagesCoords: updatedPassagesCoords
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
            case ActionType.UPDATE_PASSAGE_COORDS:
                let updatedPassageArr = structuredClone(state.passagesCoords);
    
                // Find the passage and update the coordinates if it exists
                for (let i = 0; i < updatedPassageArr.length; i++) {
                    if (updatedPassageArr[i][0] === action.value[0] && updatedPassageArr[i][1] === action.value[1]) {
                        updatedPassageArr[i][2] = action.value[2];  // Replace the third element with the new array of coords
                        return {
                            ...state,
                            passagesCoords: updatedPassageArr
                        };
                    }
                }
                return state;
        default:
            return state
    }
};

const updatePortals = (currentPortals: number[][], array: number[][]) => {
    let updatedPortals = structuredClone(currentPortals);
  
    // Find new portals and update them
    for (let j = 0; j < array.length; j++) {              // height
      for (let i = 0; i < array[j].length; i++) {          //width

        if (! blockCodes.portals.includes(array[j][i])) continue

        // Check if the portal already exists in portalsCoords
        const portalExists = updatedPortals.some((portal) => portal[0] === i && portal[1] === j);

        // Add new portal if it doesn't exist
        if (!portalExists) {
            updatedPortals.push([i, j, i, j]); // [x, y, x, y]
        }
        
      }
    }
  
    // Remove portals that no longer exist in the array
    updatedPortals = updatedPortals.filter((portal) => {
        
      const [x, y] = portal;
      return array[y][x] === 42; // Keep only portals that still exist in the array
    });
  
    return updatedPortals;
};


const updatePassages = (currentPassages: [number, number, [number, number][]][], array: number[][]) => {
    let updatedPassages = structuredClone(currentPassages);
  
    for (let j = 0; j < array.length; j++) {              // height
      for (let i = 0; i < array[j].length; i++) {          //width

        if (! blockCodes.passages.includes(array[j][i])) continue

        const portalExists = currentPassages.some((passage) => passage[0] === i && passage[1] === j);

        if (!portalExists) {
            updatedPassages.push([i, j, []]);
        }
        
      }
    }
  
    updatedPassages = updatedPassages.filter((passage) => {
      const [x, y] = passage;
      return array[y][x] === 45;
    });
  
    return updatedPassages;
};

export default reducer

