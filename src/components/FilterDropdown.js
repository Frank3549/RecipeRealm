import React, { useState } from "react";
import PropTypes from "prop-types";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

export default function FilterDropdown({ title, options, onSelect }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    // Close the dropdown only if anchorEl is not null
    if (anchorEl) {
      setAnchorEl(null);
    }
  };

  const handleOptionSelect = (option) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    setSelectedOptions(updatedOptions);
    onSelect(updatedOptions); // Pass the updated array of selected options to the parent
  };

  return (
    <div>
      <Typography
        variant="subtitle1"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        {title}
        {anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </Typography>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleOptionSelect(option)}>
            <Checkbox checked={selectedOptions.includes(option)} />
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

FilterDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};
