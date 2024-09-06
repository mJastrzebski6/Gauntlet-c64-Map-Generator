import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ColorsRadioGroup from './ColorsRadioGroup';
import WallsTypeRadioGroup from './WallsTypeRadioGroup';
import SmallCanvas from './SmallCanvas';
import "./SecondStepPanel.css"
import {createTwoDimensionalArray} from "./Helpers"
import { useEffect } from 'react';
import Images from './Images';
import { State } from './state/reducers';
import Variables from './Variables';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import ScienceIcon from '@mui/icons-material/Science';
import { updateArray, updateCharacterCoords } from './state/action-creators';
import { useAppSelector, useAppDispatch } from './state/hooks'
import SpawnerDialog from './SpawnerDialog';
import { SpawnerMonsters } from './Interfaces';
import GradeIcon from '@mui/icons-material/Grade';

export default function SecondStepPanel() {
  const [tabValue, setTabValue] = React.useState('1')
  const [wallsPhoto, setWallsPhoto] = React.useState<HTMLImageElement>(new Image())
  const [open, setOpen] = React.useState(false);

  const dispatch = useAppDispatch()
  const wallsColorState = useAppSelector((state:State)=>state.gameObject.wallsColor)
  const wallsTypeState = useAppSelector((state:State)=>state.gameObject.wallsType)
  const characterStartCoords = useAppSelector((state:State)=>state.gameObject.characterStartCoords)
  const widthState = useAppSelector((state:State)=>state.gameObject.width)
  const heightState = useAppSelector((state:State)=>state.gameObject.height)
  const [spawnerData, setSpawnerData] = React.useState(Number)
  const [selectedFieldsCopy, setSelectedFieldsCopy] = React.useState<number[][]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  function sendBlockToParent(photo: string, numOfBlock: number){
    if(photo === "items"){
      if(numOfBlock>=3 && numOfBlock<=5){ // quadra spawners
        setSpawnerData( numOfBlock-3) 
        setSelectedFieldsCopy(Variables.selectedFields)
        handleClickOpen();
        return
      }
    }

    let arrayCopy = createTwoDimensionalArray(widthState,heightState)
    let exitLoop = false;
    for(let i=0; i<widthState; i++){
      for(let j=0; j<heightState; j++){

        if(exitLoop){
          Variables.selectedFields[j][i]=0
          continue
        } 

        if(Variables.selectedFields[j][i] === 1){ // block selected
          if(j == characterStartCoords[0] && i == characterStartCoords[1]){
            Variables.selectedFields[j][i]=0
            continue;
          }

          if(photo === "walls") arrayCopy[j][i] = numOfBlock+1
          else if(photo === "items"){
            if(numOfBlock<=2 || numOfBlock>=6){ // other spawner and other items
              arrayCopy[j][i] = numOfBlock+20
            }
          }
          else if(photo === "special"){ // animated items
            if(numOfBlock === 0) arrayCopy[j][i] = 39
            else if(numOfBlock === 1) arrayCopy[j][i] = 42
            else if(numOfBlock === 2) arrayCopy[j][i] = 45
          }
          else if(photo === "creatures"){                
            if(numOfBlock === 0){ //player
              dispatch(updateCharacterCoords([j,i]));
              Variables.selectedFields[j][i]=0
              arrayCopy[j][i] = -1 //cleaning place?
              exitLoop = true
            }
            
            else if (numOfBlock === 1) arrayCopy[j][i] = -80
            else if (numOfBlock === 2) arrayCopy[j][i] = -81
            else if (numOfBlock === 3) arrayCopy[j][i] = -82
            else if (numOfBlock === 4) arrayCopy[j][i] = -83
            else if (numOfBlock === 5) arrayCopy[j][i] = -84
            else if (numOfBlock === 6) arrayCopy[j][i] = -85
          }
          Variables.selectedFields[j][i]=0
        }
      }
    }
    dispatch(updateArray(arrayCopy))
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    if (spawnerData === -1) return

    let val=0;

    switch (value){
      case SpawnerMonsters.grunt:
        val = 70+spawnerData
        break
      case SpawnerMonsters.demon:
        val = 73+spawnerData
        break
      case SpawnerMonsters.sorcerer:
        val = 76+spawnerData
        break
      case SpawnerMonsters.lobber:
        val = 79+spawnerData
        break
    }

    let arrayCopy = createTwoDimensionalArray(widthState, heightState)

    for(let i=0; i<widthState; i++){
      for(let j=0; j<heightState; j++){
        if(selectedFieldsCopy[j][i] === 1){
          arrayCopy[j][i] = val
          Variables.selectedFields[j][i]=0
        }
      }
    }
    
    dispatch(updateArray(arrayCopy))
  
    setSpawnerData(-1)
    setSelectedFieldsCopy([])
  };

  useEffect(()=>{     
      setWallsPhoto(Images.wallsPhoto)
  },[wallsTypeState,wallsColorState])

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tabValue} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
            <Tab label="Walls" value="1" icon={<ViewCarouselIcon/>}/>
            <Tab label="Items" value="2" icon={<ScienceIcon/>}/>
            <Tab label="Special" value="3" icon={<GradeIcon/>} />
            <Tab label="Creatures" value="4" icon={<SportsMartialArtsIcon/>} />
          </TabList>
        </Box>
          <TabPanel value="1">
            <div id="radioGroups">
              <ColorsRadioGroup/>
              <WallsTypeRadioGroup/>
            </div>
            <SmallCanvas photo={wallsPhoto} blocks={19} sendBlockToParent={(num:number)=>sendBlockToParent("walls", num )} animated={false}/>
          </TabPanel>
          <TabPanel value="2">
            <SmallCanvas photo={Images.itemsPhoto} blocks={19} sendBlockToParent={(num:number)=>sendBlockToParent("items", num )} animated={false}/>
            <SpawnerDialog
              open={open}
              onClose={handleClose}
            />
          </TabPanel>
          <TabPanel value="3">
            <SmallCanvas photo={Images.specialItemsPhoto} blocks={3} sendBlockToParent={(num:number)=>sendBlockToParent("special", num )} animated={true}/>
          </TabPanel>
          <TabPanel value="4">
            <SmallCanvas photo={Images.charactersPhoto} blocks={7} sendBlockToParent={(num:number)=>sendBlockToParent("creatures", num )} animated={false}/>
          </TabPanel>
      </TabContext>
    </Box>
  );
}