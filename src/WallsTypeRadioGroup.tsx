import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { State, actionCreators, store } from './state';


export default function WallsTypeRadioGroup() {

  const dispatch = useDispatch()
  const {updateWallsType} = bindActionCreators(actionCreators, dispatch)
  const wallsTypeState = useSelector((state:State)=>state.gameObject.wallsType)
  const defaultWallsType = store.getState().gameObject.wallsType
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = (event.target as HTMLInputElement).value
    updateWallsType(Number(newValue))
  };

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Wall type</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={wallsTypeState}
        onChange={handleChange}
        defaultValue={defaultWallsType}
      >
        <FormControlLabel value="0" control={<Radio />} label="Full" />
        <FormControlLabel value="1" control={<Radio />} label="Net" />
        <FormControlLabel value="2" control={<Radio />} label="Bricks" />
      </RadioGroup>
    </FormControl>
  );
}