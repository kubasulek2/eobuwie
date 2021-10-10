import React, {VFC} from 'react';
import Input from "../../atoms/input/Input";
import {DatePickerProps} from "./types";

const DatePicker: VFC<DatePickerProps> = ({}) => {
  return (
    <>
      <Input 
        placeholder="Check In" 
        value="" 
        type="date" 
        onChange={() => {}} 
        classes={['visually-hidden']}
        aria-label="Check In Date" 
        />
      <Input 
        placeholder="Check Out" 
        value="" 
        type="date" 
        onChange={() => {}} 
        classes={['visually-hidden']} 
        aria-label="Check Out Date" 
      />
      
    </>
  );
}

export default DatePicker;
