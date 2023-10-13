import React, { useState } from "react";
import "./SpeciesFilter.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

function SpeciesFilter({ speciesOptions, onSelect }) {
  const [selectedSpecies, setSelectedSpecies] = useState([]);

  const handleSelectChange = (event) => {
    setSelectedSpecies(event.target.value);
    onSelect(event.target.value);
  };

  return (
    <div className="select">
      <FormControl
        className="form"
        sx={{
          margin: 0,
          minWidth: 200,
        }}
      >
        <InputLabel
          className="form"
          id="demo-multiple-checkbox-label"
          sx={{ color: "black", fontSize: 18 }}
        >
          Filter by species
        </InputLabel>
        <Select
          multiple
          value={selectedSpecies}
          onChange={handleSelectChange}
          renderValue={(selected) => selected.join(", ")}
          sx={{
            backgroundColor: "white",
            borderRadius: 0,
            borderColor: "black",
            height: 50,
          }}
        >
          {speciesOptions.map((species) => (
            <MenuItem key={species} value={species}>
              <Checkbox checked={selectedSpecies.indexOf(species) > -1} />
              <ListItemText primary={species} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default SpeciesFilter;
