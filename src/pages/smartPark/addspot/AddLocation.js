import { Box } from "@mui/material";
import ReactMapGL, { GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import Geocoder from "../Geocoder";

const AddLocation = ({ lat, lng, handleChange }) => {
  const mapRef = useRef();
  useEffect(() => {
    if (!lng && !lat) {
      fetch("https://ipapi.co/json")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          handleChange(data.latitude, data.longitude);
        });
    }
  }, []);
  useEffect(() => {
    if ((lng || lat) && mapRef.current) {
      mapRef.current.flyTo({
        center: [lng, lat],
      });
    }
  }, [lng, lat]);
  return (
    <div className="w-full">
      <Box
        sx={{
          height: 400,
        }}
      >
        <ReactMapGL
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
          ref={mapRef}
          initialViewState={{
            latitude: 17.366,
            longitude: 78.476,
            zoom: 10,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <Marker
            latitude={lat}
            longitude={lng}
            draggable
            onDragEnd={(e) => {
              handleChange(e.lngLat.lat, e.lngLat.lng);
            }}
          />
          <GeolocateControl
            position="top-left"
            trackUserLocation
            onGeolocate={(e) => {
              handleChange(e.coords.latitude, e.coords.longitude);
            }}
          />
          <Geocoder handleChange={handleChange} />
        </ReactMapGL>
      </Box>
    </div>
  );
};

export default AddLocation;
