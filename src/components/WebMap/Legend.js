import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import "./Legend.css";

function Legend() {
  const map = useMap();
  const legendRef = useRef(null);

  useEffect(() => {
    if (!legendRef.current) {
      const legendControl = L.control({ position: "topright" });

      legendControl.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        div.innerHTML = `
          <div class="legend">
          <h3> Legend </h3>
            <div class="legend-item">
            <button class="legend-marker" style="background-color: blue;"></button>
              Collected 
              <input class="check" type="checkbox" checked>
            </div>
            <div class="legend-item">
            <div class="legend-marker" style="background-color: red;"></div>
            Not Collected 
            <input class="check" type="checkbox" checked>
            </div>
          </div>
        `;
        return div;
      };

      legendControl.addTo(map);
      legendRef.current = legendControl;
    }
  }, [map]);

  return null;
}

export default Legend;
