import React from "react";
import { CircleMarker, Popup } from "react-leaflet";
import PropTypes from "prop-types";
import "./FishMarker.css";

function determineColor(collected_status) {
  if (collected_status) {
    return "blue";
  } else {
    return "red";
  }
}

function determineCollectionStatus(collected_status) {
  if (collected_status) {
    return "YES";
  } else {
    return "NO";
  }
}

function convertToCoordinate(long, lat) {
  var position = [];
  position.push(long);
  position.push(lat);
  return position;
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
        <b>Timestamp:</b> {props.date_time} <br />
        <b>AT Code:</b> {props.AT_code} <br />
        <b>PIT Code:</b> {props.PIT_code} <br />
        <b>Species:</b> {props.species} <br />
        <b>Release Date:</b> {props.release_date} <br />
        <b>Collected: </b>
        {determineCollectionStatus(props.collected_status)}
        {props.collected_status && (
          <>
            <br />
            <b>Detection time: </b> {props.detection_time}
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
  date_time: PropTypes.instanceOf(Date),
  PIT_code: PropTypes.string.isRequired,
  AT_code: PropTypes.string,
  species: PropTypes.string,
  long: PropTypes.string,
  lat: PropTypes.string,
  collected_status: PropTypes.bool,
  release_data: PropTypes.string,
  detection_time: PropTypes.string,
  antenna_group_name: PropTypes.string,
};

export default FishMarker;
