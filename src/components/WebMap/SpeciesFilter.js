import React, { useState } from "react";
import "./SpeciesFilter.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

function SpeciesFilter({ speciesOptions, onSelect }) {
  const [selectedSpecies, setSelectedSpecies] = useState([]); // Initialize selectedSpecies as a state variable

  const handleSelectChange = (event) => {
    setSelectedSpecies(event.target.value); // Update the selected species in the state
    onSelect(event.target.value); // Send the selected species (array) to the parent component
  };

  return (
    <div className="select">
      <FormControl
        className="form"
        sx={{
          m: 1,
          width: 200,
          display: "flex",
          borderRadius: 0,
        }}
      >
        <InputLabel
          className="form"
          id="demo-multiple-checkbox-label"
          sx={{ color: "black" }}
        >
          Filter by species
        </InputLabel>
        <Select
          multiple
          value={selectedSpecies}
          onChange={handleSelectChange}
          renderValue={(selected) => selected.join(", ")}
          sx={{ backgroundColor: "white" }}
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

    // <select onChange={handleSelectChange}>
    //   <option value="">Species Type</option>
    //   {speciesOptions.map((species) => (
    //     <option key={species} value={species}>
    //       {species}
    //     </option>
    //   ))}
    // </select>
  );
}

export default SpeciesFilter;
