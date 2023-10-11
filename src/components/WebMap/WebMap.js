import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import axios from "axios";

import FishMarker from "./FishMarker";
import SpeciesFilter from "./SpeciesFilter";
import SearchComponent from "./SearchComponent";
import "./WebMap.css";
import Legend from "./Legend";
import CollectionFilter from "./CollectionFilter";

const origin = [48.714167, -121.131111];

export default function WebMap() {
  const [originalFishData, setOriginalFishData] = useState([]); // Store original unfiltered data
  const [fishData, setFishData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");

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

    // When searchQuery is not empty, trigger the API filter by PITcode call
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

      // When searchQuery is empty, trigger the API get ALL fish call so that searchButton acts like a reset button
    } else if (searchQuery.trim() === "" && selectedSpecies === "") {
      setFishData(originalFishData);
    }
    // When selectedSpecies is not empty, filter the original data by species
    else if (selectedSpecies !== "") {
      const filteredData = originalFishData.filter(
        (fish) => fish.species === selectedSpecies
      );
      setFishData(filteredData);
    }
  }, [originalFishData, searchQuery, selectedSpecies]);

  return (
    <div className="parent-filter">
      <div className="filter">
        <SearchComponent onSearch={setSearchQuery} />
        <SpeciesFilter
          speciesOptions={["Steelhead", "Cutthroat Trout", "Chinook", "Coho"]}
          onSelect={setSelectedSpecies}
        />
        <CollectionFilter />
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
          // url=  "https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg"
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
  );
}
