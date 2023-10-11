import React from "react";
import "./CollectionFilter.css";

export default function CollectionFilter() {
  return (
    <div class="legend">
      <div class="legend-item">
        <div class="legend-marker-blue"></div>
        Collected
        <input class="check" type="checkbox" />
      </div>
      <div class="legend-item">
        <div class="legend-marker-red"></div>
        Not Collected
        <input class="check" type="checkbox" />
      </div>
    </div>
  );
}

{
  /* <select value="collection_status">
      <option value="">Collection Status</option>
      <option value="true">Collected</option>
      <option value="false">Not collected</option>
    </select> */
}
