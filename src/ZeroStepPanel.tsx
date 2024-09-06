import { useRef, useState } from "react";
import { actionCreators } from "./state";
import { useAppDispatch } from "./state/hooks";
import { bindActionCreators } from "@reduxjs/toolkit";
import Alert from "@mui/material/Alert";

interface ZeroProps {

    getSteps: Function
  
}

const ZeroStepPanel = ({getSteps}: ZeroProps) => {
    const [showAlert, setShowAlert] = useState(false)

    const dispatch = useAppDispatch()
    const { updateWholeState } = bindActionCreators(actionCreators, dispatch)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImport = () => {
        if(fileInputRef.current === null) return
        if(fileInputRef.current.files === null) return

        const file = fileInputRef.current.files[0];
        
        if(file === undefined) return
        
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            if(e.target === null) return
            if(e.target.result === null) return

            try{
                let content = JSON.parse(fileReader.result as string);
                updateWholeState(content)
                getSteps(2)
            }
            catch{
                setShowAlert(true)
            }
        };
        fileReader.readAsText(file);
    }

    return(
        <>  
            {
                showAlert === true 
                &&
                <Alert onClose={() => {setShowAlert(false)}} severity="error">Corrupt or invalid map file!</Alert>
            }
            
            <input type="file" ref={fileInputRef} accept=".json"></input>
            <button onClick={handleImport}>Upload!</button>
        </>
    )
}

export default ZeroStepPanel