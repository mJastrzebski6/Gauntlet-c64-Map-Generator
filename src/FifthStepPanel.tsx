import { Box } from "@mui/material"
import MyNumberInput from "./MyNumberInput"
import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators, store } from './state';

export default function FifthStepPanel(){

    const dispatch = useDispatch()
    const {updateStartHealth, updateStartScore, updateLevelNumber} = bindActionCreators(actionCreators, dispatch)
    const defaultStartHealthValue = store.getState().gameObject.startHealth
    const defaultStartScoreValue = store.getState().gameObject.startScore
    const defaultLevelNumberValue = store.getState().gameObject.levelNumber

    const handleClick = (what:string, value: number) => {
        if(what == "levelNumber") updateLevelNumber(value)
        else if (what == "startScore") updateStartScore(value)
        else if (what == "startHealth") updateStartHealth(value)
    }

    return(
        <Box sx={{ display:"flex",justifyContent: 'space-around', flexDirection:"column", alignItems:"center"}}>
            <Box sx={{width:"500px"}}><p>Level number</p><MyNumberInput sendToParent={handleClick} what="levelNumber" min={0} max={999} defaultValue={defaultLevelNumberValue}/></Box>
            <Box sx={{width:"500px"}}><p>Start Score</p><MyNumberInput sendToParent={handleClick} what="startScore" min={0} max={999999} defaultValue={defaultStartScoreValue}/></Box>
            <Box sx={{width:"500px"}}><p>Start Health</p><MyNumberInput sendToParent={handleClick} what="startHealth" min={0} max={9999} defaultValue={defaultStartHealthValue}/></Box>
        </Box>
    )
}