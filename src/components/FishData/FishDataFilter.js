import { useState, useEffect } from "react";
import "./FishDataFilter.css";
import axios from "axios";

export default function FishDataFilter(props) {
  const speciesTypes = ["Steelhead", "Cutthroat Trout", "Chinook", "Coho"];
  const [speciesType, setSpeciesType] = useState("");
  const [pitCode, setPitCode] = useState("");

  const handleChangeDropdown = (event) => {
    setSpeciesType(event.target.value);
  };

  const handleChangeTextArea = (event) => {
    const newValue = event.target.value;
    if (/^\d{0,5}$/.test(newValue)) {
      setPitCode(newValue);
    }
  };

  // const handleFilterButtonClick = () => {

  // }

  return (
    <form className="filter-form">
      <input
        type="text"
        className="general-input"
        placeholder="Search by PIT code"
        onChange={handleChangeTextArea}
        value={pitCode}
      />
      <select
        className="fish-input"
        value={speciesType}
        onChange={handleChangeDropdown}
      >
        <option selected>Choose a species</option>
        {speciesTypes.map((e) => (
          <option value={e}>{e}</option>
        ))}
      </select>
      <button className="submit">Filter Fish</button>
    </form>
  );
}
