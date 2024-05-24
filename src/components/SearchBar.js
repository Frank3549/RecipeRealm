import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import PropTypes from "prop-types";

export default function SearchBar({ searchKeywords }) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    searchKeywords(searchText.trim()); // Trim whitespace and pass the search text to the parent component
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value); // Update the search text state as the user types
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      // made with help from GPT Co-Pilot
      // Check if Enter key is pressed
      // Perform the action you want to do when Enter is pressed
      handleSearch();
    }
  };

  return (
    <Container maxWidth="md" sx={{ paddingTop: 5 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          placeholder="Search for Recipe"
          value={searchText}
          onChange={handleInputChange}
          fullWidth
          onKeyDown={handleKeyDown}
        />
        <IconButton onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </div>
    </Container>
  );
}

SearchBar.propTypes = {
  searchKeywords: PropTypes.func.isRequired,
};
