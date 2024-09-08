import { State } from './state/reducers';
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { Button } from '@mui/material';
import { updatePassagesCoords } from './state/action-creators';
import Variables from './Variables';

export default function ThirdStepPanel(){

    const dispatch = useAppDispatch()
    const passagesCoords = useAppSelector((state:State)=>state.gameObject.passagesCoords)

    let setPassageBlocks = (passageCoords: number[], action: string) => {
        if(action === "set"){
            let arr:[number, number][] = [] 

            for (let j = 0; j < Variables.selectedFields.length; j++) {              // height
                for (let i = 0; i < Variables.selectedFields[j].length; i++) {
                    if(Variables.selectedFields[j][i] === 1){
                        arr.push([i,j])
                        Variables.selectedFields[j][i]=0;
                    }
                }   
            }
            dispatch(updatePassagesCoords([passageCoords[0], passageCoords[1], arr]))
        }
        else if(action === "delete") dispatch(updatePassagesCoords([passageCoords[0], passageCoords[1], []]))
    }

    return (
        <>
            {passagesCoords.map((passage, index) => {
                return(<div key={index}>
                    <div>{`${passage[0]},${passage[1]}`}</div>
                    <div>{JSON.stringify(passage[2])}</div>
                    {passage[2].length===0 ? <Button onClick={()=> setPassageBlocks([passage[0], passage[1]], "set")}>Set blocks</Button> : <Button onClick={()=> setPassageBlocks([passage[0], passage[1]], "delete")}>Erase blocks</Button>}
                
                <hr/></div>)
            })}
        </>
    );
}