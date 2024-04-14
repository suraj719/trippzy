import React, { useEffect, useState } from "react";
import { useValue } from "../../context/ContextProvider";
import { getRooms } from "../../actions/room";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Supercluster from "supercluster";
import "./cluster.css";
import { Avatar, Paper, Tooltip, Box } from "@mui/material";
import PopupRoom from "./PopupRoom";
import GeocoderInput from "./sidebar/GeocoderInput";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";

const supercluster = new Supercluster({
  radius: 75,
  maxZoom: 20,
});

const ClusterMap = () => {
  const {
    state: { filteredRooms },
    dispatch,
    containerRef,
    mapRef,
  } = useValue();
  const [points, setPoints] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [bounds, setBounds] = useState([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState(0);
  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    getRooms(dispatch);
  }, []);
  const [slots, setSlots] = useState([]);
  const fetchSlots = async () => {
    try {
      // dispatch(ShowLoading());
      const response = await axios.get(`http://localhost:5000/room`);
      // dispatch(HideLoading());
      if (response?.data?.success) {
        console.log(response);
        setSlots(response.data.result);
        // const filteredQuizzes = response.data.data.filter(
        //   (quiz) => quiz.createdBy._id === teacher._id
        // );
        // setData(filteredQuizzes);
      } else {
        // toast.error(response.data.message);
      }
    } catch (error) {
      // dispatch(HideLoading());
      // toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchSlots();
  }, []);
  const [initialViewState, setInitialViewState] = useState({
    latitude: "17.366",
    longitude: "78.476",
    zoom: 2,
    width: "100%",
    height: "100%",
  });
  useEffect(() => {
    const points = slots.map((room) => ({
      type: "Feature",
      properties: {
        cluster: false,
        roomId: room._id,
        price: room.price,
        title: room.title,
        description: room.description,
        lng: room.lng,
        lat: room.lat,
        images: room.images,
        uPhoto: room.uPhoto,
        uName: room.uName,
      },
      geometry: {
        type: "Point",
        coordinates: [parseFloat(room.lng), parseFloat(room.lat)],
      },
    }));
    setPoints(points);
  }, [slots]);
  useEffect(() => {
    supercluster.load(points);
    setClusters(supercluster.getClusters(bounds, zoom));
  }, [points, zoom, bounds]);

  useEffect(() => {
    if (mapRef?.current) {
      setBounds(mapRef?.current.getMap().getBounds().toArray().flat());
    }
  }, [mapRef?.current]);

  return (
    <div>
      <div className="float-right my-2">
        <button className="border rounded-lg p-2 px-4 hover:bg-gray-800">
          Add a slot
        </button>
      </div>
      <div className="h-[80vh] w-full">
        <div className="fixed top-36 z-10">
          <Box sx={{ width: 240, p: 3 }}>
            <Box ref={containerRef}></Box>
          </Box>
        </div>
        <ReactMapGL
          initialViewState={initialViewState}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          ref={mapRef}
          onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
        >
          {clusters.map((cluster) => {
            const { cluster: isCluster, point_count } = cluster.properties;
            const [longitude, latitude] = cluster.geometry.coordinates;
            if (isCluster) {
              return (
                <Marker
                  key={`cluster-${cluster.id}`}
                  longitude={longitude}
                  latitude={latitude}
                >
                  <div
                    className="cluster-marker"
                    style={{
                      width: `${10 + (point_count / points.length) * 20}px`,
                      height: `${10 + (point_count / points.length) * 20}px`,
                    }}
                    onClick={() => {
                      const zoom = Math.min(
                        supercluster.getClusterExpansionZoom(cluster.id),
                        20
                      );
                      mapRef.current.flyTo({
                        center: [longitude, latitude],
                        zoom,
                        speed: 1,
                      });
                    }}
                  >
                    {point_count}
                  </div>
                </Marker>
              );
            }
            return (
              <Marker
                key={`room-${cluster.properties.roomId}`}
                longitude={longitude}
                latitude={latitude}
              >
                <img
                  src="../location-pin.png"
                  onClick={() => setPopupInfo(cluster.properties)}
                />
              </Marker>
            );
          })}
          <GeocoderInput />
          {popupInfo && (
            <Popup
              longitude={popupInfo.lng}
              latitude={popupInfo.lat}
              maxWidth="auto"
              closeOnClick={false}
              focusAfterOpen={false}
              onClose={() => setPopupInfo(null)}
            >
              <PopupRoom {...{ popupInfo }} />
            </Popup>
          )}
        </ReactMapGL>
      </div>
    </div>
  );
};

export default ClusterMap;
