import { useState, useEffect } from "react";
import { CircleMarker, Popup } from "react-leaflet";
import PropTypes from "prop-types";
import "./FishMarker.css";
import QuestionBox from "./QuestionBox";
import axios from "axios";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import IconButton from "@mui/material/IconButton";

// Function that takes in a fish record's collected status and returns a color based on collected (true) or not collected false).
function determineColor(collection_status) {
  return collection_status ? "blue" : "red";
}

// Function that takes in a fish record's collected status and returns a more user-friendly, simple yes or no.
function determineCollectionStatus(collection_status) {
  return collection_status ? "Collected" : "Not Collected";
}

// Function that takes in long and lat values and stores them as a pair in an array called position
function convertToCoordinate(lat, long) {
  var position = [];
  position.push(lat);
  position.push(long);
  return position;
}

// Function that takes in a DateTime string, checks for timestamp, and reformats string into user-friendly format: MM/DD/YYYY hh:mm:ss a
function formatDateTime(dateTimeString, withTime = true) {
  const parsedDate = new Date(dateTimeString);
  // For data with timestamp e.g. date_time
  if (withTime) {
    return `${parsedDate.toLocaleDateString()} ${parsedDate.toLocaleTimeString()}`;

    // For data without timestamp e.g. release_date
  } else {
    return parsedDate.toLocaleDateString();
  }
}

function FishMarker(props) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [originalPosition, setOriginalPosition] = useState([
    parseFloat(props.lat),
    parseFloat(props.long),
  ]);
  const [position, setPosition] = useState(
    convertToCoordinate(props.lat, props.long)
  );

  const [animationInterval, setAnimationInterval] = useState(null);

  const resetMarker = () => {
    setPosition(originalPosition);
  };
  // Update the marker's position whenever new coordinates are available
  useEffect(() => {
    setPosition(convertToCoordinate(props.lat, props.long));
  }, [props.lat, props.long]);

  const animateMarker = () => {
    if (!isAnimating) {
      setIsAnimating(true);

      // Make the API call for FishPosition records based on AT_code
      axios
        .get(`http://127.0.0.1:8000/api/fishpositions/${props.AT_code}/`)
        .then((response) => {
          const data = response.data;

          // Take only X and Y values from each object in the response data
          const parsedCoordinates = data.map(({ X, Y }) => [
            parseFloat(X),
            parseFloat(Y),
          ]);
          setCoordinates(parsedCoordinates);
          let index = 0;

          const interval = setInterval(() => {
            // Move the marker position here based on the retrieved coordinates
            if (index < parsedCoordinates.length) {
              const [parsedX, parsedY] = parsedCoordinates[index];
              setPosition([parsedX, parsedY]); // Update marker position as an array of numbers
              index++;
            } else {
              // Stop the animation when all coordinates are covered
              clearInterval(interval);
              setIsAnimating(false);
            }
          }, 300);
          setAnimationInterval(interval);
        })
        .catch((error) => {
          console.error("Error fetching coordinates:", error);
          setIsAnimating(false);
        });
    } else {
      setIsAnimating(false);
      clearInterval(animationInterval);
    }
  };
  return (
    <CircleMarker
      center={position}
      fillColor={determineColor(props.collection_status)}
      radius={11}
      weight={0.5}
      color={"black"}
      fillOpacity={0.5}
    >
      <Popup>
        <div className="message">
          <div className="message-text">
            <div>
              <b>PIT Code:</b> {props.PIT_code}{" "}
              <QuestionBox
                text={"Passive integrated transponder (PIT) tag code"}
              />
            </div>
            <div>
              <b>AT Code:</b> {props.AT_code}
              <QuestionBox text={"Acoustic telemetry (AT) tag code"} />
            </div>
            <div>
              <b>Timestamp:</b> {formatDateTime(props.date_time)}
              <QuestionBox
                text={"The timestamp of the fish's first recorded position."}
              />
            </div>
            <div>
              <b>Species:</b> {props.species}
              <QuestionBox text={"The fish's species type."} />
            </div>
            <div>
              <b>Release Date:</b> {formatDateTime(props.release_date, false)}
              <QuestionBox text={"The date when the fish was released."} />
            </div>
            <div>
              <b>Status: </b>{" "}
              {determineCollectionStatus(props.collection_status)}
              <QuestionBox text={"Whether or not this fish was collected."} />
            </div>
            {props.collection_status && (
              <details>
                <summary>Show collection details</summary>
                <b>Detection time: </b> {formatDateTime(props.detection_time)}
                <br />
                <b>Antenna Group Name: </b> {props.antenna_group_name}
              </details>
            )}
            <br />
          </div>
          <div className="animation-buttons">
            <button className="animate" onClick={animateMarker}>
              {isAnimating
                ? "Stop Animation"
                : "Track where this fish has been"}
            </button>
            <IconButton className="reset" onClick={resetMarker}>
              <RestartAltIcon />
            </IconButton>
          </div>
        </div>
      </Popup>
    </CircleMarker>
  );
}

FishMarker.propTypes = {
  id: PropTypes.number,
  date_time: PropTypes.string,
  PIT_code: PropTypes.string.isRequired,
  AT_code: PropTypes.string,
  species: PropTypes.string,
  lat: PropTypes.string,
  long: PropTypes.string,
  collection_status: PropTypes.bool,
  release_date: PropTypes.string,
  detection_time: PropTypes.string,
  antenna_group_name: PropTypes.string,
};

export default FishMarker;
