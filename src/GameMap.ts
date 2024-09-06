import "./Helpers"
import { createTwoDimensionalArray } from "./Helpers"

export default class GameMap{
    mapArray:number[][] = []

    constructor(width: number, height: number){
        let arr = createTwoDimensionalArray(width, height)
        this.mapArray = arr
    }
}