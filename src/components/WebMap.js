import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

import "./WebMap.css";
import FishMarker from "./FishMarker";
import SpeciesFilter from "./SpeciesFilter";
import SearchComponent from "./SearchComponent";
import CollectionFilter from "./CollectionFilter";

const origin = [48.714167, -121.131111];

export default function WebMap() {
  const [originalFishData, setOriginalFishData] = useState([]); // Store original unfiltered data
  const [fishData, setFishData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState([]);
  const [collectionFilters, setCollectionFilters] = useState({
    collected: true,
    notCollected: true,
  });

  const handleFilterChange = (filters) => {
    setCollectionFilters(filters);
  };
  // GET all fish data from API and store it in originalFishData
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/fish/")
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          // Success status codes (2xx), set the data
          setOriginalFishData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setErrorMessage("Error fetching the data. Please try again later.");
      });
  }, []); //

  // GET fish data by PIT Code from API
  useEffect(() => {
    // Reset error message before making a new API call
    setErrorMessage("");

    // When searchQuery is not empty, trigger the API filter by PITcode call
    if (searchQuery.trim() !== "") {
      axios
        .get(`http://127.0.0.1:8000/api/fish/${searchQuery}/`)
        .then((response) => {
          setFishData(
            Array.isArray(response.data) ? response.data : [response.data]
          );
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setErrorMessage(
              "No fish record found; please try another PIT code."
            );
          } else {
            console.error("Error fetching data:", error);
            setErrorMessage("Error fetching the data. Please try again later.");
          }
        });
    } else {
      // Filter the original data by species and collection status
      const filteredData = originalFishData.filter((fish) => {
        const matchesSelectedSpecies =
          selectedSpecies.length === 0 ||
          selectedSpecies.includes(fish.species);
        const matchesCollectedStatus =
          (!collectionFilters.collected || fish.collection_status) &&
          (!collectionFilters.notCollected || !fish.collection_status);
        return matchesSelectedSpecies && matchesCollectedStatus;
      });

      setFishData(filteredData);
    }
  }, [searchQuery, originalFishData, selectedSpecies, collectionFilters]);

  return (
    <div>
      <div className="filter">
        <SearchComponent
          className="search-component"
          onSearch={setSearchQuery}
        />
        <SpeciesFilter
          id="species-filter"
          speciesOptions={["Steelhead", "Cutthroat Trout", "Chinook", "Coho"]}
          onSelect={setSelectedSpecies}
        />
        <CollectionFilter
          id="collection-filter"
          onFilterChange={handleFilterChange}
        />
      </div>
      <div className="error-message">
        {errorMessage ? <p>{errorMessage}</p> : null}
      </div>
      <div className="map-container">
        <MapContainer
          center={origin}
          zoom={17}
          maxZoom={22}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {fishData.map((marker) => (
            <FishMarker
              key={marker.PIT_code}
              lat={marker.X}
              long={marker.Y}
              date_time={marker.date_time}
              AT_code={marker.AT_code}
              PIT_code={marker.PIT_code}
              species={marker.species}
              release_date={marker.release_date}
              collection_status={marker.collection_status}
              detection_time={marker.detection_time}
              antenna_group_name={marker.antenna_group_name}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
