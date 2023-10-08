import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import FishMarker from "./FishMarker";
// import dummydata from '/Users/nt/mappy/src/data/dummydata.json'
import axios from "axios";

const origin = [48.714167, -121.131111];

export default function WebMap() {
  const [fishData, setFishData] = useState([]);

  useEffect(() => {
    // Fetch fish data from API
    axios
      .get("http://127.0.0.1:8000/api/fish/")
      .then((response) => {
        setFishData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data", error);
      });
  }, []);

  return (
    <MapContainer
      center={origin}
      zoom={15}
      maxZoom={20}
      style={{ width: "100vw", height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {fishData.map((marker) => (
        <FishMarker
          long={marker.X}
          lat={marker.Y}
          date_time={marker.date_time}
          AT_code={marker.AT_code}
          PIT_code={marker.PIT_code}
          species={marker.species}
          release_date={marker.release_date}
          collected_status={marker.collection_status}
        />
      ))}
    </MapContainer>
  );
}
