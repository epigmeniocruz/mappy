import React from 'react'
import { CircleMarker, Popup } from "react-leaflet";
import PropTypes from "prop-types"


function determineColor(collected_status) {
    if (collected_status ) {
        return 'blue';
    } else {
        return 'red';
    }
}

function FishMarker(props) {
  return (
    <CircleMarker center={props.position} fillColor={determineColor(props.collected_status)} radius={5} weight = {0} fillOpacity={0.5}>
      <Popup>PIT Code: {props.PIT_code} <br/>Species: {props.species} <br/>AT Code: {props.AT_code} <br/> Release Date: {props.release_date}</Popup>        
    </CircleMarker>
  )
    };

FishMarker.propTypes = {
        id: PropTypes.number,
        PIT_code: PropTypes.string.isRequired,
        AT_code: PropTypes.string,
        species: PropTypes.string,
        position: PropTypes.array,
        collected_status: PropTypes.bool,
        release_data: PropTypes.string
};

export default FishMarker