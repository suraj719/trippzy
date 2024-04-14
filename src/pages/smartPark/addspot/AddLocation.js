import { Box } from "@mui/material";
import ReactMapGL, { GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import Geocoder from "./Geocoder";
import { useValue } from "../../../context/ContextProvider";

const AddLocation = () => {
  const {
    state: {
      location: { lng, lat },
      currentUser,
    },
    dispatch,
  } = useValue();
  const mapRef = useRef();

  useEffect(() => {
    // const storedLocation = JSON.parse(
    //   localStorage.getItem(currentUser.id)
    // )?.location;
    if (!lng && !lat) {
      fetch("https://ipapi.co/json")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          dispatch({
            type: "UPDATE_LOCATION",
            payload: { lng: data.longitude, lat: data.latitude },
          });
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
          ref={mapRef}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
          initialViewState={{
            longitude: lng,
            latitude: lat,
            zoom: 8,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <Marker
            latitude={lat}
            longitude={lng}
            draggable
            onDragEnd={(e) =>
              dispatch({
                type: "UPDATE_LOCATION",
                payload: { lng: e.lngLat.lng, lat: e.lngLat.lat },
              })
            }
          />
          <GeolocateControl
            position="top-left"
            trackUserLocation
            onGeolocate={(e) =>
              dispatch({
                type: "UPDATE_LOCATION",
                payload: { lng: e.coords.longitude, lat: e.coords.latitude },
              })
            }
          />
          <Geocoder />
        </ReactMapGL>
      </Box>
    </div>
  );
};

export default AddLocation;