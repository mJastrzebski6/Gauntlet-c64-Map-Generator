import { useEffect, useRef} from "react";

import "./SmallCanvas.css"
import { colsAndRows } from "./Interfaces";
import Variables from "./Variables";
interface SmallCanvasInterface{
    photo: HTMLImageElement,
    sendBlockToParent: Function,
    blocks:number,
    animated: boolean,
    active: boolean
}

let photo2:any

export default function SmallCanvas({photo, sendBlockToParent,blocks, animated, active}:SmallCanvasInterface){
    let highlighted = [-1,-1];
    let multiplier = 5
    let bounds: DOMRect;
    let colsAndRows:colsAndRows

    const ref = useRef(null)

    useEffect(()=>{
        photo2=photo
    },[photo])

    useEffect(()=>{
        const canvas:HTMLCanvasElement = ref.current!

        if(canvas==null) return

        const context = canvas.getContext("2d")
        if(context==null) return

        bounds = canvas.getBoundingClientRect()
        calculateRowsAndCols(canvas, context)

        window.addEventListener("scroll", function () {
            bounds = canvas.getBoundingClientRect();
        });
        
        window.addEventListener("resize", function () {
            bounds = canvas.getBoundingClientRect();
            calculateRowsAndCols(canvas, context)
        });

        canvas.addEventListener("mouseout", () => {
          highlighted = [6, 6];
        });

        canvas.addEventListener("click", () => {
            if(!active) return
            if(highlighted[1] === -1 || highlighted[0] === -1) return
            let itemNum = colsAndRows.cols*highlighted[1]+highlighted[0]
            if(itemNum+1>blocks) return
            sendBlockToParent(itemNum)
        });
      
        canvas.addEventListener("mousemove", (event:any)=>moveMouse(event, canvas));
        

        let animationId:any;

        const renderer = () =>{
            draw(context, canvas)
            animationId = window.requestAnimationFrame(renderer)
        }
        renderer()

        return () => window.cancelAnimationFrame(animationId)

    },[active])

    function calculateRowsAndCols(canvas:HTMLCanvasElement, context: CanvasRenderingContext2D){
        const quotientCols = Math.floor(bounds.width/80);
        const quotientRows = Math.ceil(blocks/quotientCols);

        colsAndRows = {cols: quotientCols, rows: quotientRows}

        canvas.width = multiplier * (17*quotientCols-1)
        canvas.height = multiplier * (17*quotientRows-1)

        context.fillStyle = "#7a7a7a";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = false;
    }

    function moveMouse(event:any, canvas: HTMLCanvasElement){
        let coords = getXY(event, canvas)
        if(coords===undefined) return

        let found = false

        loop1: for (let i = 0; i < colsAndRows.rows; i++) {
          for (let j = 0; j < colsAndRows.cols; j++) {
            if (
              j * 85 < coords.x && coords.x < (j+1) * 80 + j*5 &&
              i * 85 < coords.y && coords.y < (i+1) * 80 + i*5 
            ){
              highlighted = [j, i];
              found=true
              canvas.style.cursor = "pointer"
              break loop1
            }
          }
        }
        if(!found){
            highlighted=[-1,-1]
            canvas.style.cursor = "default"
        }
    }

    function getXY(event: MouseEvent, canvas:HTMLCanvasElement) {
        bounds = canvas.getBoundingClientRect()
        if (bounds === undefined) return

        let x = event.pageX - bounds.left - scrollX;
        let y = event.pageY - bounds.top - scrollY;

        x /= bounds.width;
        y /= bounds.height;

        x *= canvas.width;
        y *= canvas.height;

        return { x: x, y: y };
    }

    function draw(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        
        if(photo==undefined) return

        context.fillStyle = "#7a7a7a";
        context.fillRect(0, 0, canvas.width, canvas.height);

        let item=0;
        for(let j=0; j<colsAndRows.rows; j++){
            for(let i=0; i<colsAndRows.cols; i++){
                if(item>blocks-1) return
                if (highlighted[0] == i && highlighted[1] == j && active) {
                    context.filter =  "brightness(0.5)";
                    context.drawImage(
                        photo2,
                        item*17,
                        0,
                        16,
                        16,
                        17*i*multiplier,
                        17*j*multiplier,
                        16*multiplier,
                        16*multiplier
                    )
                    context.filter =  "none"
                }
                else{
                    context.drawImage(
                        photo2,
                        item*17,
                        animated ? Variables.animationFrameIndex*17 : 0,
                        16,
                        16,
                        17*i*multiplier,
                        17*j*multiplier,
                        16*multiplier,
                        16*multiplier
                    )
                    
                }
                item++
            }
        }
    }

    return(
        <div>
            <canvas ref={ref} className="smallCanvas"></canvas>
        </div>
    )
}