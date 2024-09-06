import GameMap from "./GameMap"
import { createTwoDimensionalArray } from "./Helpers"


class Variables{
    map:GameMap = new GameMap(33,33)
    selectedFields: number[][] = createTwoDimensionalArray(33, 33)
    wallsType: number = 0
    wallsColor:string = "#6049ed"
    highlighted = [-1,-1];
    animationInterval: number | null = null;
    animationFrameIndex = 0;
    animationIndex = 0

    constructor() {
        this.startInterval();
    }
    
    startInterval() {
        this.animationInterval = setInterval(() => {
            this.updateHighlighted();
        }, 200);
    }

    updateHighlighted() {
        if(this.animationIndex === 0) this.animationFrameIndex = 1
        else if(this.animationIndex === 1) this.animationFrameIndex = 2
        else if(this.animationIndex === 2) this.animationFrameIndex = 1
        else if(this.animationIndex === 3) this.animationFrameIndex = 0

        this.animationIndex++;
        if(this.animationIndex === 4) this.animationIndex = 0
    }
    stopInterval() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
    }
}

export default new Variables()