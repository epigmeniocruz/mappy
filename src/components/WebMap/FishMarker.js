import { useState } from "react";
import { CircleMarker, Popup } from "react-leaflet";
import PropTypes from "prop-types";
import "./FishMarker.css";

// Function that takes in a fish record's collected status and returns a color based on collected (true) or not collected false).
function determineColor(collected_status) {
  return collected_status ? "blue" : "red";
}

// Function that takes in a fish record's collected status and returns a more user-friendly, simple yes or no.
function determineCollectionStatus(collected_status) {
  return collected_status ? "Collected" : "Not collected";
}

// Function that takes in long and lat values and stores them as a pair in an array called position
function convertToCoordinate(long, lat) {
  var position = [];
  position.push(long);
  position.push(lat);
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

function setShow(collected_status) {
  if (collected_status) {
    return false;
  }
}

function FishMarker(props) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const routeCoordinates = [];

  const animateMarker = () => {
    setIsAnimating(true);

    const interval = setInterval(() => {
      // move the marker position here
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setIsAnimating(false);
    }, 5000);
  };

  return (
    <CircleMarker
      center={convertToCoordinate(props.long, props.lat)}
      fillColor={determineColor(props.collected_status)}
      radius={8}
      weight={0.5}
      color={"black"}
      fillOpacity={0.5}
    >
      <Popup>
        <div className="message">
          <h3>PIT Code: {props.PIT_code}</h3>
          <p>
            <b>Timestamp:</b> {formatDateTime(props.date_time)}{" "}
            <button className="question-mark"></button>
            <br />
            <b>AT Code:</b> {props.AT_code} <br />
            <b>PIT Code:</b> {props.PIT_code} <br />
            <b>Species:</b> {props.species} <br />
            <b>Release Date:</b> {formatDateTime(props.release_date, false)}
            <br />
            <b>Status: </b> {determineCollectionStatus(props.collected_status)}
          </p>
          {props.collected_status && (
            <div>
              <details>
                <summary>Show collection details</summary>
                <b>Detection time: </b> {formatDateTime(props.detection_time)}
                <br />
                <b>Antenna Group Name: </b> {props.antenna_group_name}
              </details>
            </div>
          )}
          <br />
          <button
            className="animate"
            onClick={animateMarker}
            disabled={isAnimating}
          >
            {isAnimating ? "Animating..." : "Animate"}
          </button>
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
  long: PropTypes.string,
  lat: PropTypes.string,
  collected_status: PropTypes.bool,
  release_date: PropTypes.string,
  detection_time: PropTypes.string,
  antenna_group_name: PropTypes.string,
};

export default FishMarker;
