import { combineReducers } from "@reduxjs/toolkit";
import gameObjectReducer from "./gameObjectReducer"


const reducers = combineReducers({
    gameObject: gameObjectReducer
})

export default reducers

export type State = ReturnType<typeof reducers>