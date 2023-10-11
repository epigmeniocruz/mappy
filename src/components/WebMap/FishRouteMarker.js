// import { useEffect, useState, PropTypes } from "react";
// import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
// import L from "leaflet";
// import { Popup } from "react-leaflet";
// import fishIcon from "./fish.svg";

// const icon = L.icon({
//   iconSize: [45, 45],
//   popupAnchor: [2, -20],
//   iconUrl: fishIcon,
// });

//  function FishRouteMarker({ props }) {
//   const { lat, lng } = [props.lat, props.long]
//   const [prevPos, setPrevPos] = useState([lat, lng]);

//   useEffect(() => {
//     if (prevPos[1] !== lng && prevPos[0] !== lat) setPrevPos([lat, lng]);
//   }, [lat, lng, prevPos]);

//   return (
//     <LeafletTrackingMarker
//       icon={icon}
//       position={[props.lat, props.long]}
//       previousPosition={prevPos}
//       duration={1000}
//     >
//       <Popup> Timestamp: {props.date_time} <br/>
//       PIT Code: {props.PIT_code} <br/>
//       Species: {props.species} <br/>
//       AT Code: {props.AT_code} <br/>
//       Release Date: {props.release_date}
//       </Popup>
//     </LeafletTrackingMarker>
//   );
// }
// FishRouteMarker.propTypes = {
//     id: PropTypes.number,
//     date_time: PropTypes.instanceOf(Date),
//     PIT_code: PropTypes.string.isRequired,
//     AT_code: PropTypes.string,
//     species: PropTypes.string,
//     long: PropTypes.string,
//     lat: PropTypes.string,
//     collection_status: PropTypes.bool,
//     release_data: PropTypes.string
// };

// export default FishRouteMarker
