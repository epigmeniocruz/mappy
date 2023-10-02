import React from 'react'
import { CircleMarker, Popup } from "react-leaflet";
import PropTypes from "prop-types"


function determineColor(collected_status) {
    if (collected_status) {
        return 'blue';
    } else {
        return 'red';
    }
}

function convertToCoordinate(long, lat) {
  var position = []
  position.push(long)
  position.push(lat)
  return position
}

function FishMarker(props) {
  return (
    <CircleMarker center={convertToCoordinate(props.long, props.lat)} fillColor={determineColor(props.collected_status)} radius={3} weight = {0} fillOpacity={0.5}>
      <Popup> Timestamp: {props.date_time} <br/> 
      PIT Code: {props.PIT_code} <br/>
      Species: {props.species} <br/>
      AT Code: {props.AT_code} <br/> 
      Release Date: {props.release_date}
      </Popup>        
    </CircleMarker>
  )
    };

FishMarker.propTypes = {
        id: PropTypes.number,
        date_time: PropTypes.instanceOf(Date),
        PIT_code: PropTypes.string.isRequired,
        AT_code: PropTypes.string,
        species: PropTypes.string,
        long: PropTypes.string,
        lat: PropTypes.string,
        collected_status: PropTypes.bool,
        release_data: PropTypes.string
};

export default FishMarker