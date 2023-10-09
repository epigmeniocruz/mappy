import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import axios from "axios";

import FishMarker from "./FishMarker";
import SpeciesFilter from "./SpeciesFilter";
import SearchComponent from "./SearchComponent";
import "./WebMap.css";

const origin = [48.714167, -121.131111];

export default function WebMap() {
  const [fishData, setFishData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");

  // Get ALL including filter ALL by selected species
  useEffect(() => {
    // Fetch fish data from API
    axios
      .get("http://127.0.0.1:8000/api/fish/")
      .then((response) => {
        let filteredData = response.data;

        // Filter by selected species
        if (selectedSpecies !== "") {
          filteredData = filteredData.filter(
            (fish) => fish.species === selectedSpecies
          );
        }
        setFishData(filteredData);
      })
      .catch((error) => {
        console.error("There was an error fetching the data", error);
      });
  }, [selectedSpecies]);

  // GET by PITCode
  useEffect(() => {
    // Reset error message before making a new API call
    setErrorMessage("");

    // Trigger the API call when searchQuery is not empty
    if (searchQuery.trim() !== "") {
      axios
        .get(`http://127.0.0.1:8000/api/fish/${searchQuery}/`)
        .then((response) => {
          // Transform single JSON object into an array to pass into FishMarker
          const data = Array.isArray(response.data)
            ? response.data
            : [response.data];
          setFishData(data);
        })
        .catch((error) => {
          // Return user friendly message if 404 response
          if (error.response && error.response.status === 404) {
            setErrorMessage(
              "No fish record found; please try another PIT code."
            );
          } else {
            console.error("Error fetching data:", error);
            setErrorMessage(
              "Error fetching fish data. Please try again later."
            );
          }
        });
    }
  }, [searchQuery]);

  return (
    <div>
      <div className="filter">
        <SpeciesFilter
          speciesOptions={["Steelhead", "Cutthroat Trout", "Chinook", "Coho"]}
          onSelect={setSelectedSpecies}
        />
        <SearchComponent onSearch={setSearchQuery} />
        {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
      </div>
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
            detection_time={marker.detection_time}
            antenna_group_name={marker.antenna_group_name}
          />
        ))}
      </MapContainer>
    </div>
  );
}
