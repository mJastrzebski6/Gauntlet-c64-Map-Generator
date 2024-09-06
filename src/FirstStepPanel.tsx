import { Box } from "@mui/material"
import MyNumberInput from "./MyNumberInput"
import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators, store } from './state';

export default function FirstStepPanel(){

    const dispatch = useDispatch()
    const {updateWidth, updateHeight} = bindActionCreators(actionCreators, dispatch)
    const defaultHeightValue = store.getState().gameObject.height
    const defaultWidthValue = store.getState().gameObject.width

    const handleClick = (what:string, value: number) => {
        if(what == "height") updateHeight(value)
        else if (what == "width") updateWidth(value)
    }

    return(
        <Box sx={{ display:"flex",justifyContent: 'space-around', flexDirection:"column", alignItems:"center"}}>
            <Box sx={{width:"500px"}}><p>Height</p> <MyNumberInput sendToParent={handleClick} what="height" min={5} max={40} defaultValue={defaultHeightValue}/></Box>
            <Box sx={{width:"500px"}}><p>Width</p>  <MyNumberInput sendToParent={handleClick} what="width" min={5} max={40} defaultValue={defaultWidthValue}/></Box>
        </Box>
    )
}