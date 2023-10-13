import React, { useState, useEffect } from "react";
import "./CollectionFilter.css";

export default function CollectionFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    collected: false,
    notCollected: false,
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  return (
    <div className="legend">
      <div className="legend-item">
        <div className="legend-marker-blue"></div>
        Collected
        <input
          className="check"
          type="checkbox"
          name="collected"
          checked={filters.collected}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="legend-item">
        <div className="legend-marker-red"></div>
        Not Collected
        <input
          className="check"
          type="checkbox"
          name="notCollected"
          checked={filters.notCollected}
          onChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
}
