import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import PropTypes from 'prop-types';

export default function RadioButtonsGroup({options, buttonGroupName, visableName}) {
  return (
    <FormControl>
      <FormLabel id={buttonGroupName}>Gender</FormLabel>
      <RadioGroup
        aria-labelledby={visableName}
        defaultValue=""
        name={buttonGroupName}
      >
        {options.map((option) => (
            
            <FormControlLabel 
                value={option} 
                control={<Radio/>} 
                label={option}
                key={option}
            />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

RadioButtonsGroup.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    buttonGroupName: PropTypes.string.isRequired,
    visableName: PropTypes.string.isRequired

}