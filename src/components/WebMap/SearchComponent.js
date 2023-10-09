import React, { useState, useEffect } from "react";
import "./SearchComponent.css";

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
