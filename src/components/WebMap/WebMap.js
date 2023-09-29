import React from "react";
import { MapContainer, TileLayer, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState} from 'react';
import FishMarker from "./FishMarker";

export default function WebMap() {
  const origin = [48.714167, -121.131111];

  const markers = [
    {
      position: [48.714308284759525,-121.13127436384724],
      tag_code: "1",
      species: "Steelhead",
      at_code: "n/a",
      release_date: "3/25/2019",
      collected_status: true
    },
    {
      position: [48.7134,-121.12127436384724],
      tag_code: "2",
      species: "Coho",
      at_code: "n/a",
      release_date: "3/25/2019",
      collected_status: false
    },
    {
      position: [48.713, -121.13],
      tag_code: "3",
      species: "Steelhead",
      at_code: "n/a",
      release_date: "3/25/2019",
      collected_status: true
    }
  ]

  return (
    <MapContainer
      center={origin}
      zoom={20}
      style={{ width: "100xw", height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map(marker => (
              <FishMarker position={marker.position} collected_status={marker.collected_status} at_code={marker.at_code}PIT_code={marker.tag_code} species = {marker.species} release_date={marker.release_date}/>
              
      ))}
    </MapContainer>
  );
}
