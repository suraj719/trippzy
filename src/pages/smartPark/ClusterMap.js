import React, { useEffect, useRef, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Supercluster from "supercluster";
import "./cluster.css";
import PopupRoom from "./PopupRoom";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import Geocoder from "./Geocoder";
import { Link } from "react-router-dom";

const supercluster = new Supercluster({
  radius: 75,
  maxZoom: 20,
});

const ClusterMap = () => {
  const [points, setPoints] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [bounds, setBounds] = useState([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState(0);
  const [popupInfo, setPopupInfo] = useState(null);
  const mapRef = useRef();
  const [slots, setSlots] = useState([]);
  const fetchSlots = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/slot/get-slots`
      );
      if (response?.data?.success) {
        console.log(response);
        setSlots(response.data.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSlots();
  }, []);
  // const initialViewState = {
  //   // latitude: "17.366",
  //   // longitude: "78.476",
  //   zoom: 12,
  //   width: "100%",
  //   height: "100%",
  // };
  useEffect(() => {
    const points = slots.map((slot) => ({
      type: "Feature",
      properties: {
        cluster: false,
        slotId: slot._id,
        price: slot.price,
        description: slot.description,
        lng: slot.lng,
        lat: slot.lat,
        images: slot.images,
        uploadedBy: slot.uploadedBy,
      },
      geometry: {
        type: "Point",
        coordinates: [parseFloat(slot.lng), parseFloat(slot.lat)],
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
  const [lat, setLat] = useState(17.366);
  const [lng, setLng] = useState(78.476);
  // useEffect(() => {
  //   if ((lng || lat) && mapRef.current) {
  //     mapRef.current.flyTo({
  //       center: [lng, lat],
  //     });
  //   }
  // }, [lng, lat]);
  const handleChange = (newlat, newlng) => {
    setLat(newlat);
    setLng(newlng);
  };
  // useEffect(() => {
  //   fetch("https://ipapi.co/json")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // handleChange(data.latitude, data.longitude);
  //       mapRef.current.flyTo({
  //         center: [data.longitude, data.latitude],
  //       });
  //     });
  // }, []);
  return (
    <div>
      <div className="h-[80vh] w-full">
        <ReactMapGL
          // initialViewState={initialViewState}
          // initialViewState={{zoom:10}}
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
                key={`slot-${cluster.properties.slotId}`}
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

          <Geocoder handleChange={handleChange} />
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
