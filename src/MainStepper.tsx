import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import MapIcon from '@mui/icons-material/Map';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import SettingsIcon from '@mui/icons-material/Settings';
import DownloadIcon from '@mui/icons-material/Download';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useAppSelector } from './state/hooks'
import { State } from './state/reducers';
import { blockCodes } from './Consts';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <FileUploadIcon/>,
    2: <CropSquareIcon />,
    3: <MapIcon />,
    4: <AutoAwesomeIcon/>,
    5: <TransferWithinAStationIcon />,
    6: <SettingsIcon />,
    7:<DownloadIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ["Import Map",'Set map size', 'Create a map', "Set secret passages" ,"Connect portals", "Set properties", "Download Map"];


interface StepperProps {

  getSteps: Function,
  activeStepProp: number

}

export default function CustomizedSteppers({getSteps, activeStepProp}: StepperProps) {
  const [activeStep, setActiveStep] = React.useState(0);
  const characterStartCoords = useAppSelector((state:State)=>state.gameObject.characterStartCoords)
  const passages = useAppSelector((state:State)=>state.gameObject.passagesCoords)
  const portals = useAppSelector((state:State)=>state.gameObject.portalsCoords)
  const arrayState = useAppSelector((state:State)=>state.gameObject.array)
  const mapWidthState = useAppSelector((state:State)=>state.gameObject.width)
  const mapHeightState = useAppSelector((state:State)=>state.gameObject.height)

  useEffect(()=>{
    setActiveStep(activeStepProp)
  },[activeStepProp])

  const handleNext = () => {
    if(activeStep === 2){
      if (characterStartCoords[0] == -1){
        window.alert("There is no player on the map")
        return
      }
  
      if (!checkIfExitExists()){
        window.alert("There is no exit on the map")
        return
      }

      if (passages.length === 0 && portals.length === 0 ){
        setActiveStep((prevActiveStep) => prevActiveStep + 3);
        return;
      }
      if ( passages.length === 0 ){
        setActiveStep((prevActiveStep) => prevActiveStep + 2);
        return
      }
    }
    if ( activeStep === 3 && portals.length === 0 ){
      setActiveStep((prevActiveStep) => prevActiveStep + 2);
      return
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if(activeStep === 2) return
    if ( activeStep === 5 && passages.length === 0 && portals.length === 0 ){
      setActiveStep((prevActiveStep) => prevActiveStep - 3);
      return;
    }

    if ( activeStep === 5 && portals.length === 0 ){
      setActiveStep((prevActiveStep) => prevActiveStep - 2);
      return;
    }

    if ( activeStep === 4 && passages.length === 0 ){
      setActiveStep((prevActiveStep) => prevActiveStep - 2);
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(()=>{
    getSteps(activeStep)
  }, [activeStep])

  const checkIfExitExists = () => {
    let exists = false;
    for(let i=0; i<mapWidthState; i++){
      for(let j=0; j<mapHeightState; j++){
          if(arrayState[j][i] === blockCodes.exit) exists = true
      } 
    }
    return exists
  }


  return (
    <Box sx={{ width: '100%' }}>
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
    {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>{steps[activeStep]}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0 || activeStep === 2}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
           
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
