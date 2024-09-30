import Button from "@mui/material/Button";
import DownloadIcon from '@mui/icons-material/Download';
import FileHandler from "./FileHandler";
import { useSelector } from "react-redux";
import { State } from "./state";

export default function SixthStepPanel(){

    const gameObjectState = useSelector((state:State)=>state.gameObject)
    
    function createFile(){
        FileHandler.saveToFile(gameObjectState)
    }
    return(
        <Button sx={{mt:2}} variant="contained" color="success" startIcon={<DownloadIcon/>} onClick={() =>{createFile()}}>Download</Button>
    )
}