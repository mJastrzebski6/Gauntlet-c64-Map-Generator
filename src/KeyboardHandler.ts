class KeyboardHandler{
    controlClicked = false
    shiftClicked = false;

    constructor(){
        addEventListener("keydown", (event)=>{
            if(event.code === "ControlLeft") this.controlClicked = true;
            if(event.code === "ShiftLeft") this.controlClicked = true;
        })

        addEventListener("keyup", (event)=>{
            if(event.code === "ControlLeft") this.controlClicked = false; 
            if(event.code === "ShiftLeft") this.controlClicked = false; 
        })
    }
}

export default new KeyboardHandler()