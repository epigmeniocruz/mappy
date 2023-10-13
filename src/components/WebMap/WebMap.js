import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import axios from "axios";

import FishMarker from "./FishMarker";
import SpeciesFilter from "./SpeciesFilter";
import SearchComponent from "./SearchComponent";
import "./WebMap.css";
import CollectionFilter from "./CollectionFilter";

const origin = [48.714167, -121.131111];

export default function WebMap() {
  const [originalFishData, setOriginalFishData] = useState([]); // Store original unfiltered data
  const [fishData, setFishData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState([]);
  const [markerPosition, setMarkerPosition] = useState([]);
  const [collectionFilters, setCollectionFilters] = useState({
    collected: true,
    notCollected: true,
  });

  const handleFilterChange = (filters) => {
    setCollectionFilters(filters);
  };
  const moveMarker = (newPosition) => {
    setMarkerPosition(newPosition);
  };

  useEffect(() => {
    // Fetch fish data from API and store it in both originalFishData and fishData
    axios
      .get("http://127.0.0.1:8000/api/fish/")
      .then((response) => {
        const data = response.data;
        setOriginalFishData(data);
        setFishData(data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  // GET by PITCode or GET all and filter by species
  useEffect(() => {
    // Reset error message before making a new API call
    setErrorMessage("");

    // When searchQuery is empty, selectedSpecies is empty, and both collection filters are unchecked, reset fishData to originalFishData
    if (
      searchQuery.trim() === "" &&
      selectedSpecies.length === 0 &&
      !collectionFilters.collected &&
      !collectionFilters.notCollected
    ) {
      setFishData(originalFishData);
      return; // Exit the useEffect early to avoid unnecessary API calls
    }

    // Filter the original data by species, search query, and collection status
    const filteredData = originalFishData.filter((fish) => {
      const matchesSearchQuery =
        searchQuery.trim() === "" || fish.PIT_code.includes(searchQuery.trim());
      const matchesSelectedSpecies =
        selectedSpecies.length === 0 || selectedSpecies.includes(fish.species);
      const matchesCollectedStatus =
        (!collectionFilters.collected || fish.collection_status) &&
        (!collectionFilters.notCollected || !fish.collection_status);
      return (
        matchesSearchQuery && matchesSelectedSpecies && matchesCollectedStatus
      );
    });

    setFishData(filteredData);
  }, [originalFishData, searchQuery, selectedSpecies, collectionFilters]);

  return (
    <div className="parent-filter">
      <div className="filter">
        <SearchComponent onSearch={setSearchQuery} />
        <SpeciesFilter
          speciesOptions={["Steelhead", "Cutthroat Trout", "Chinook", "Coho"]}
          onSelect={setSelectedSpecies}
        />
        <CollectionFilter onFilterChange={handleFilterChange} />
      </div>
      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
      <MapContainer
        center={origin}
        zoom={17}
        maxZoom={22}
        style={{ width: "100%", height: "85vh" }}
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
            moveMarker={moveMarker}
          />
        ))}
      </MapContainer>
    </div>
  );
}
