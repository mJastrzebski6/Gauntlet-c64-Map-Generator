import { State } from './state/reducers';
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { useEffect, useState } from 'react';
import "./FourthStepPanel.css"
import { updatePortalsCoords } from './state/action-creators';
import { blockCodes } from './Consts';

export default function FourthStepPanel(){
    
    const dispatch = useAppDispatch()
    const arrayState = useAppSelector((state:State)=>state.gameObject.array)
    const mapWidthState = useAppSelector((state:State)=>state.gameObject.width)
    const mapHeightState = useAppSelector((state:State)=>state.gameObject.height)
    const [arrayOfPortals, setArrayOfPortals] = useState<number[][]>([])

    useEffect(()=>{
        generatePortals()
    }, [arrayState])

    useEffect(()=>{
        generatePortals()
    }, [])


    const generatePortals = () => {
        let arr = []
        let stateArr = []
        for(let i=0; i<mapWidthState; i++){
            for(let j=0; j<mapHeightState; j++){
                if(blockCodes.portals.includes(arrayState[j][i])){
                    arr.push([j,i])
                    stateArr.push([j,i,j,i])
                }
            }
        }
        setArrayOfPortals(arr)
        dispatch(updatePortalsCoords(stateArr))
    }

    const updatePortals = (start_coords: number[], end_coords_string: string) => {
        let end_coords = end_coords_string.split(',').map(Number);
        dispatch(updatePortalsCoords([[start_coords[0], start_coords[1], end_coords[0], end_coords[1]]]))
    }
    
    return (
        <>
            {arrayOfPortals.map((portal, portalIndex) => {
                return (
                    <div key={portalIndex} className='portalRow'>
                        <div>{`${portal[0]},${portal[1]}`}</div> &nbsp;
                        <select onChange={(e) => updatePortals(portal, e.target.value)} defaultValue={`${portal[0]},${portal[1]}`}>
                            {arrayOfPortals.map((portal2, portal2Index) => {
                                return (
                                    <option key={portal2Index} value={`${portal2[0]},${portal2[1]}`} >
                                        {`${portal2[0]},${portal2[1]}`}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                );
            })}
        </>
    );
}