import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchComponent({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Trim the search query and pass it to the parent component
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery !== "") {
      onSearch(trimmedQuery);
    } else {
      // If the search query is empty, pass an empty string to reset the search
      onSearch("");
    }
  };
  return (
    <Paper
      component="form"
      sx={{
        border: 1,
        borderRadius: 0,
        p: "5px",
        display: "flex",
        width: "100%",
      }}
    >
      <InputBase
        sx={{
          flex: 1,
          fontSize: 20,
          backgroundColor: "white",
        }}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by PIT Code"
        value={searchQuery}
      />
      <IconButton
        type="button"
        sx={{ backgroundColor: "white" }}
        aria-label="search"
        onClick={handleSearch}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
