import React from "react";
import { MapContainer, TileLayer, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState} from 'react';
import FishMarker from "./FishMarker";
// import dummydata from '/Users/nt/mappy/src/data/dummydata.json'
import fishPosData from '/Users/nt/mappy/src/data/sample_fishPos.json'

export default function WebMap() {
  const origin = [48.714167, -121.131111];
  const markers = fishPosData;
  return (
    <MapContainer
      center={origin}
      zoom={20}
      maxZoom={30}
      style={{ width: "100xw", height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map(marker => (
              <FishMarker 
              long={marker.X}
              lat={marker.Y}
              date_time={marker.Date_time}
              at_code={marker.at_code}
              PIT_code={marker.tag_code} 
              species={marker.species} 
              release_date={marker.release_date}
              />
      ))}
    </MapContainer>
  );
}
