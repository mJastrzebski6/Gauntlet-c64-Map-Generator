import { State } from './state/reducers';
import { useAppDispatch, useAppSelector } from "./state/hooks";
import "./FourthStepPanel.css"
import { updatePortalsCoords } from './state/action-creators';

export default function FourthStepPanel(){
    
    const dispatch = useAppDispatch()
    const portalsCoords = useAppSelector((state:State)=>state.gameObject.portalsCoords)

    const updatePortals = (start_coords: number[], end_coords_string: string) => {
        let end_coords = end_coords_string.split(',').map(Number);
        dispatch(updatePortalsCoords([[start_coords[0], start_coords[1], end_coords[0], end_coords[1]]]))
    }
    
    return (
        <>
            {portalsCoords.map((portal, portalIndex) => {
                return (
                    <div key={portalIndex} className='portalRow'>
                        <div>{`${portal[0]},${portal[1]}`}</div> &nbsp;
                        <select onChange={(e) => updatePortals(portal, e.target.value)} defaultValue={`${portal[2]},${portal[3]}`}>
                            {portalsCoords.map((portal2, portal2Index) => {
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