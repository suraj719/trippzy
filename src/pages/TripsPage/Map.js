import { useState, useRef } from "react";
import ReactMapGl from "react-map-gl";
import Geocoder from "../smartPark/Geocoder";

export default function Mapss() {
  const mapRef = useRef();
  const [zoomedOut, setZoomedOut] = useState(false);
  const [viewstate, setViewState] = useState({
    latitude: "52.5200",
    longitude: "13.4050",
    zoom: 7,
    width: "100%",
    height: "100%",
  });
  const handleChange = () => {

  }
  return (
    <>
      <div className="h-[80vh] w-full">
        <ReactMapGl
          className="relative"
          id="map"
          ref={mapRef}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
          {...viewstate}
          initialViewState={viewstate}
          onMove={(e) => setViewState(e.viewState)}
        >
          <Geocoder handleChange={handleChange} />
        </ReactMapGl>
      </div>
    </>
  );
}
