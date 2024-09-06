import * as React from 'react';
import Radio from '@mui/material/Radio';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { State } from './state/reducers';
import { actionCreators, store } from './state';

export default function ControlledRadioButtonsGroup() {
  
  const dispatch = useDispatch()
  const {updateWallsColor} = bindActionCreators(actionCreators, dispatch)
  const wallsColorState = useSelector((state:State)=>state.gameObject.wallsColor)
  const defaultWallsColor = store.getState().gameObject.wallsColor

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newColor = (event.target as HTMLInputElement).value
    updateWallsColor(newColor)
  }

  const controlProps = (item: string) => ({
    checked: wallsColorState === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
    defaultValue: defaultWallsColor
  });

  let colors = ["#b56148","#f7ff6c","#79d570","#99e6f9", "#6049ed","#c161c9"] //red, yellow, green, lightblue, blue, pink
  return (
    <div>
      <p>Colors</p>
        {colors.map((color,index)=>{
          return (<Radio
          key={index}
            {...controlProps(color)}
            sx={{
              color: color, 
              '&.Mui-checked': {
                color: color,
              },
            }}
        
          />)
        })}
    </div>
  );
}