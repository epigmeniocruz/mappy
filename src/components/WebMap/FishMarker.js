import React from "react";
import { CircleMarker, Popup } from "react-leaflet";
import PropTypes from "prop-types";

// Function that takes in a fish record's collected status and returns a color based on collected (true) or not collected false).
function determineColor(collected_status) {
  return collected_status ? "blue" : "red";
}

// Function that takes in a fish record's collected status and returns a more user-friendly, simple yes or no.
function determineCollectionStatus(collected_status) {
  return collected_status ? "Yes" : "No";
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

function FishMarker(props) {
  return (
    <CircleMarker
      center={convertToCoordinate(props.long, props.lat)}
      fillColor={determineColor(props.collected_status)}
      radius={6}
      weight={0.5}
      color={"black"}
      fillOpacity={0.5}
    >
      <Popup className="message">
        {" "}
        <b>First Timestamp:</b> {formatDateTime(props.date_time)} <br />
        <b>AT Code:</b> {props.AT_code} <br />
        <b>PIT Code:</b> {props.PIT_code} <br />
        <b>Species:</b> {props.species} <br />
        <b>Release Date:</b> {formatDateTime(props.release_date, false)} <br />
        <b>Collected: </b>
        {determineCollectionStatus(props.collected_status)}
        {props.collected_status && (
          <>
            <br />
            <b>Detection time: </b> {formatDateTime(props.detection_time)}
            <br />
            <b>Antenna Group Name: </b> {props.antenna_group_name}
          </>
        )}
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
