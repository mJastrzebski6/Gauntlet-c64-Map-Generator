import { useCallback, useEffect, useRef } from "react";
import "./MapCanvas.css"
import { Coords, selectionCoords} from "./Interfaces";
import Images from "./Images";
import KeyboardHandler from "./KeyboardHandler";
import Variables from "./Variables";
import { useSelector } from 'react-redux';
import { State } from './state/reducers';
import { actionCreators } from "./state";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { blockCodes, blockGroups } from "./Consts";

const MapCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);

    let bigSelection:selectionCoords = {xStart:-1, yStart:-1,xEnd:-1, yEnd:-1}
    let bounds: DOMRect;
    let multiplier = 5
    let mouseLeftButtonPressed = false
    
    const dispatch = useAppDispatch()
    const { updateArray } = bindActionCreators(actionCreators, dispatch)
    const mapWidthState = useAppSelector((state:State)=>state.gameObject.width)
    const mapHeightState = useAppSelector((state:State)=>state.gameObject.height)
    const arrayState = useAppSelector((state:State)=>state.gameObject.array)
    const characterCoordsState = useSelector((state:State)=>state.gameObject.characterStartCoords)

    useEffect(()=>{
        const canvas:HTMLCanvasElement = canvasRef.current!
        if(canvas==null) return
        contextRef.current = canvas.getContext("2d")
        const context = contextRef.current;

        if(context==null) return

        canvas.width = mapWidthState*multiplier*16
        canvas.height = mapHeightState*multiplier*16

        context.fillStyle = "#7a7a7a";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = false;

        bounds = canvas.getBoundingClientRect()

        window.addEventListener("scroll", setBounds);
        window.addEventListener("resize", setBounds);
        window.addEventListener("keydown", handleDelete)

        return () => {
            window.removeEventListener("scroll", setBounds);
            window.removeEventListener("resize", setBounds);
            window.removeEventListener("keydown", handleDelete)
        }
    },[])

    const setBounds = () => {
        if(canvasRef.current === null) return
        bounds = canvasRef.current.getBoundingClientRect();
    }

    function handleClick(){
        if(bigSelection.xStart === bigSelection.xEnd && bigSelection.yStart === bigSelection.yEnd){
            if(Variables.selectedFields[Variables.highlighted[1]][Variables.highlighted[0]] === 1){
                if(!KeyboardHandler.controlClicked){
                    for(let i=0; i<mapWidthState; i++)
                        for(let j=0; j<mapHeightState; j++) Variables.selectedFields[j][i]=0    
                }
                else Variables.selectedFields[Variables.highlighted[1]][Variables.highlighted[0]] = 0
            }
            else{
                if(!KeyboardHandler.controlClicked){
                    for(let i=0; i<mapWidthState; i++)
                        for(let j=0; j<mapHeightState; j++) Variables.selectedFields[j][i]=0  
                    Variables.selectedFields[Variables.highlighted[1]][Variables.highlighted[0]] = 1
                }
                else{
                    Variables.selectedFields[Variables.highlighted[1]][Variables.highlighted[0]] = 1
                }
            }
        }
        else{
            if(!KeyboardHandler.controlClicked){
                for(let i=0; i<mapWidthState; i++)
                    for(let j=0; j<mapHeightState; j++) Variables.selectedFields[j][i]=0 
            }
            for(let i=0; i<mapWidthState; i++)
                for(let j=0; j<mapHeightState; j++)
                    if(
                        i>=Math.min(bigSelection.xStart, bigSelection.xEnd) && 
                        i<=Math.max(bigSelection.xStart, bigSelection.xEnd) &&
                        j>=Math.min(bigSelection.yStart, bigSelection.yEnd) && 
                        j<=Math.max(bigSelection.yStart, bigSelection.yEnd)
                    ){
                        Variables.selectedFields[j][i] = 1
                    }
        }
        bigSelection = {xStart:-1, yStart:-1,xEnd:-1, yEnd:-1}
    }

    function handleDelete(event: any){
        if(event.code !== "Delete") return

        let arrayCopy = structuredClone(arrayState)

        for (let i = 0; i < Variables.selectedFields.length; i++) {
            for (let j = 0; j < Variables.selectedFields[i].length; j++) {
                if (Variables.selectedFields[i][j] == 1) {
                    arrayCopy[i][j] = -1
                    Variables.selectedFields[i][j] = 0;
                }
            }
        }

        updateArray(arrayCopy)
    }

    function getFieldBasedOnCoords(coords : Coords){
        let fieldCoords: Coords = {x:-1, y:-1}

        loop1: for (let i = 0; i < mapWidthState; i++) {
            for (let j = 0; j < mapHeightState; j++) {
                if (
                    i * 80 < coords.x && coords.x < 80 * (i+1) &&
                    j * 80 < coords.y && coords.y < 80 * (j+1) 
                ){
                    fieldCoords = {x:i, y:j}
                    break loop1
                }
            }
        } 
        return fieldCoords
    }

    function getXY(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {

        if(canvasRef.current === null) return { x: -1, y: -1 }
        
        bounds = canvasRef.current.getBoundingClientRect()
        if (bounds === undefined) return { x: -1, y: -1 }

        let x = event.pageX - bounds.left - scrollX;
        let y = event.pageY - bounds.top - scrollY;

        x /= bounds.width;
        y /= bounds.height;

        x *= canvasRef.current.width;
        y *= canvasRef.current.height;

        return { x: x, y: y };
    }

    const draw = useCallback((context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {

        if(Images.wallsPhoto==undefined || Images.itemsPhoto==undefined) return

        context.fillStyle = "#7a7a7a";
        context.fillRect(0, 0, canvas.width, canvas.height);

        for(let i=0; i<mapWidthState; i++){
            for(let j=0; j<mapHeightState; j++){
                //walls
                if(blockGroups.walls.includes(arrayState[j][i])){
                    context.drawImage(
                        Images.wallsPhoto,
                        (arrayState[j][i]-1)*17,
                        0,
                        16,
                        16,
                        16*multiplier*i,
                        16*multiplier*j,
                        16*multiplier,
                        16*multiplier
                    )
                }
                //spawners
                else if(blockCodes.spawners.includes(arrayState[j][i])){
                    let id= (arrayState[j][i]-1)%3+3

                    context.drawImage(
                        Images.itemsPhoto,
                        (id)*17,
                        0,
                        16,
                        16,
                        16*multiplier*i,
                        16*multiplier*j,
                        16*multiplier,
                        16*multiplier
                    )
                }
                // items
                else if(arrayState[j][i]>=20 && arrayState[j][i]<= 38){
                    context.drawImage(
                        Images.itemsPhoto,
                        (arrayState[j][i]-20)*17,
                        0,
                        16,
                        16,
                        16*multiplier*i,
                        16*multiplier*j,
                        16*multiplier,
                        16*multiplier
                    )
                }
                //special items
                else if(arrayState[j][i]>=39){
                    context.drawImage(
                        Images.specialItemsPhoto,
                        ((arrayState[j][i]-39)/3)*17,
                        Variables.animationFrameIndex*17,
                        16,
                        16,
                        16*multiplier*i,
                        16*multiplier*j,
                        16*multiplier,
                        16*multiplier
                    )
                }
                // monsters
                else if(arrayState[j][i]>=-85 && arrayState[j][i]<=-80){
                    context.drawImage(
                        Images.charactersPhoto,
                        (-arrayState[j][i]-79)*17,
                        0,
                        16,
                        16,
                        16*multiplier*i,
                        16*multiplier*j,
                        16*multiplier,
                        16*multiplier
                    )
                }
                //portal and wall coords
                if(blockCodes.portals.includes(arrayState[j][i]) || blockGroups.walls.includes(arrayState[j][i])){
                    context.font = "18px Arial"
                    context.fillStyle = "purple"
                    context.fillText(`${j},${i}`, 16*multiplier*i+18, 16*multiplier*j+18)
                }
                //character
                if(characterCoordsState[0]===j && characterCoordsState[1]===i){
                    context.drawImage(
                        Images.charactersPhoto,
                        0,
                        0,
                        16,
                        16,
                        16*multiplier*i,
                        16*multiplier*j,
                        16*multiplier,
                        16*multiplier
                    )
                }
                


                if (Variables.highlighted[0] == i && Variables.highlighted[1] == j) {
                    context.fillStyle = "rgba(0, 0, 0, 0.5)";
                    context.fillRect(80 * i, 80 * j, 80, 80);
                }
                if(Variables.selectedFields[j][i] == 1 ){
                    context.fillStyle = "rgba(0, 0, 0, 0.5)";
                    context.fillRect(80 * i, 80 * j, 80, 80);
                }

                if(bigSelection.xEnd == -1) continue

                if(
                    i>=Math.min(bigSelection.xStart, bigSelection.xEnd) && 
                    i<=Math.max(bigSelection.xStart, bigSelection.xEnd) &&
                    j>=Math.min(bigSelection.yStart, bigSelection.yEnd) && 
                    j<=Math.max(bigSelection.yStart, bigSelection.yEnd)
                ){
                    context.fillStyle = "rgba(0, 0, 0, 0.5)";
                    context.fillRect(80 * i, 80 * j, 80, 80);
                } 
            }
        }
    }, [arrayState,characterCoordsState]);

    useEffect(()=>{
        let animationId:any;

        const renderer = () =>{
            if(contextRef.current === null) return
            if(canvasRef.current === null) return

            draw(contextRef.current, canvasRef.current)
            animationId = window.requestAnimationFrame(renderer)
        }
        renderer()

        return () => window.cancelAnimationFrame(animationId)
    },[draw])

    function moveMouse(event:React.MouseEvent<HTMLCanvasElement, MouseEvent>){
        
        if(canvasRef.current === null) return

        let coords = getXY(event)

        if(coords===undefined) return 

        let res = getFieldBasedOnCoords(coords)

        Variables.highlighted = [res.x, res.y]; 

        if(bigSelection.xStart == -1 || mouseLeftButtonPressed == false) return

        bigSelection.xEnd = res.x
        bigSelection.yEnd = res.y
    }

    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        let coords = getXY(event)
        let res = getFieldBasedOnCoords(coords)
        bigSelection.xStart = res.x 
        bigSelection.yStart = res.y 
        mouseLeftButtonPressed = true;
    }

    const handleMouseOut = () => {
        Variables.highlighted = [-1, -1];
    }  

    const handleMouseUp = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        let coords = getXY(event)
        let res = getFieldBasedOnCoords(coords)
  
        mouseLeftButtonPressed = false
        bigSelection.xEnd = res.x
        bigSelection.yEnd = res.y
    }

    return(
        <>
            <canvas 
                ref={canvasRef} 
                className="mapCanvas" 
                onClick={()=>handleClick()}
                onMouseDown={(event) => handleMouseDown(event)}
                onMouseMove={(event) => moveMouse(event)}
                onMouseUp={(event) => handleMouseUp(event)}
                onMouseOut={() => handleMouseOut()}
            ></canvas>
        </>
    )

}

export default MapCanvas
