import React from "react";
import { MapContainer, TileLayer, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function WebMap() {
  const center = [48.69, -122.56];

  // const uncollected_Icon = new L.Icon({
  //   iconUrl: require("./uncollected_fish.png"),
  //   iconSize: [35, 45]
  // })

  // var circle = L.circle([51.508, -0.11], {
  //   color: 'red',
  //   fillColor: '#f03',
  //   fillOpacity: 0.5,
  //   radius: 500
  //   })

  const markers = [
    {
      position: [48.7, -122.56],
      tag_code: "3DD.003BC95F8A",
      species: "Steelhead",
      at_code: "n/a",
      release_date: "3/25/2019"
    },
    {
      position: [48.68, -122.55],
      tag_code: "3DD.003BC95F8A",
      species: "Steelhead",
      at_code: "n/a",
      release_date: "3/25/2019"
    },
    {
      position: [48.65, -122.56],
      tag_code: "3DD.003BC95F8A",
      species: "Steelhead",
      at_code: "n/a",
      release_date: "3/25/2019"
    }
  ]


  
  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ width: "100xw", height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map(marker => (
        <CircleMarker center={marker.position} fillColor="blue">
          <Popup>PIT Tag Code: {marker.tag_code} <br/>Species: {marker.species} <br/>AT Code: {marker.at_code} <br/> Release Date: {marker.release_date}</Popup>        
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
