import React from 'react';
import "./FishDataFilter.css";

export default function FishDataFilter() {

    const speciesTypes = ["Steelhead", "Cutthroat Trout", "Chinook", "Coho"]

  return (
    <form className="filter-form">
      <input type="text" placeholder="Search by PIT code" className="general-input"/>
      <select className="fish-input">
          <option selected>Choose a species</option>
          {speciesTypes.map(e => <option value={e}>{e}</option>)}
      </select>
        <button className="submit">Filter Fish</button>
    </form>

  );
}
