import React, { useState, useEffect } from "react";
import "./SearchComponent.css";

export default function SearchComponent({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Make sure searchQuery is not empty before triggering search
    if (searchQuery.trim() !== "") {
      onSearch(searchQuery);
    }
  };

  return (
    <div>
      <div className="filter-form">
        <input
          className="general-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by PIT Code"
        />
        <button className="submit" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}
