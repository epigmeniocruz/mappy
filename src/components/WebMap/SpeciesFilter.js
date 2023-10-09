import React from "react";

function SpeciesFilter({ speciesOptions, onSelect }) {
  const handleSelectChange = (event) => {
    const selectedSpecies = event.target.value;
    onSelect(selectedSpecies); // Call onSelect function with the selected species
  };

  return (
    <select onChange={handleSelectChange}>
      <option value="">Select Species</option>
      {speciesOptions.map((species) => (
        <option key={species} value={species}>
          {species}
        </option>
      ))}
    </select>
  );
}

export default SpeciesFilter;
