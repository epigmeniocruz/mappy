import React from 'react'
import PropTypes from "prop-types"
import {MapContainer, CircleMarker } from "react-leaflet";

function Fish(props) {
      return (
        <MapContainer>
        <CircleMarker center = {props.position} fillColor="blue" />
        </MapContainer>
  )
};

Fish.propTypes = {
    id: PropTypes.number,
    tagCode: PropTypes.string.isRequired,
    position: PropTypes.array,
    ATcode: PropTypes.string,
    releaseDate: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired
};

export default Fish; 

