import { useState, useEffect } from 'react'
import './App.css'
import MainStepper from './MainStepper'
import MapCanvas from './MapCanvas'
import FirstStepPanel from './FirstStepPanel'
import SecondStepPanel from './SecondStepPanel'
import Divider from '@mui/material/Divider'
import FifthStepPanel from './FifthStepPanel'
import SixthStepPanel from './SixthStepPanel'
import ZeroStepPanel from './ZeroStepPanel'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import FourthStepPanel from './FourthStepPanel'
import ThirdStepPanel from './ThirdStepPanel'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [activeStep, setActiveStep] = useState<number>(0)

  function getSteps(step : number){
    if (step === activeStep) return
    setActiveStep(step)
  }

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault();
        event.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        
      <MainStepper getSteps={getSteps} activeStepProp={activeStep}></MainStepper>
      <Divider></Divider>

      {/* import */}
      {activeStep == 0 && <ZeroStepPanel getSteps={getSteps}/>}
      
      {/* map dimensions */}
      {activeStep == 1 && <FirstStepPanel/>}

      {/* map */}
      {activeStep > 1 && activeStep < 5 && 

        <div id='mainContent'>
          <div id="leftPanel">
            {activeStep == 2 && <SecondStepPanel/>}
            {activeStep == 3 && <ThirdStepPanel/>}
            {activeStep == 4 && <FourthStepPanel/>}
          </div>
          <div id="mainPanel" >
            <MapCanvas/>
          </div>
        </div>
      }

      {/* properties */}
      {activeStep == 5 && <FifthStepPanel/>}

      {/* download */}
      {activeStep == 6 && <SixthStepPanel/>} 

      </ThemeProvider>
    </>
  )
}

export default App
