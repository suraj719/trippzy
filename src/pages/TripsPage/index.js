import React from "react";

export default function TripsPage() {
  const fetchData = async () => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/access_token=pk.eyJ1IjoiZ2l0dHk2OTUiLCJhIjoiY2x1d2t1Z2U3MGdsejJwbnZxOTc0Zjh3cyJ9.lOxanEVvBYGteifrkAq_Hw&autocomplete=true`
    );
    const results = await response.json();
    console.log(results);
  };

  return (
    <>
      <div>
        <input type="text" onChange={fetchData} />
        <p>trips</p>
      </div>
    </>
  );
}
