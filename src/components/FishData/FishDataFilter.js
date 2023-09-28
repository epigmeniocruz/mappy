import React from 'react';
import "./FishData.css";

export default function TreeData() {

    const speciesTypes = ["Steelhead", "Cutthroat Trout", "Chinook", "Coho"]

  return (
    <form className="filter-form">
      <input type="text" placeholder="Tagcode" className="general-input"/>
        <select value="Steelhead" className="fish-input">
            {speciesTypes.map(e => <option value={e}>{e}</option>)}
        </select>
        <button className="submit">Find Fish</button>
    </form>

  );
}
