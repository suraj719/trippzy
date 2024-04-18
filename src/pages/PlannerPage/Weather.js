import React, { useState, useEffect, useRef } from "react";
import { fetchWeatherApi } from "openmeteo";

export default function Weather() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const inputRef = useRef();
  const currentDate = new Date();
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + 7);

  const formattedCurrentDate = currentDate.toISOString().split("T")[0];
  const formattedFutureDate = futureDate.toISOString().split("T")[0];
  const handleAddPlace = (place) => {
    setQuery("");
    // setSelectedPlaces([...selectedPlaces, place]);
    inputRef.current.value = place.place_name;
    const fomrattedData = {
      id: place.id,
      place_name: place.place_name,
      lng: place.geometry.coordinates[0],
      lat: place.geometry.coordinates[1],
    };
    setSelectedPlace(fomrattedData);
    setResults([]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.REACT_APP_MAPBOX_KEY}&autocomplete=true`
        )
          .then((res) => res.json())
          .then((data) => setResults(data.features))
          .catch((error) => console.error("Error fetching data:", error));
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const [weatherData, setWeatherData] = useState(null);
  const [floodData, setFloodData] = useState(null);
  const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedPlace) {
      const fetchWeatherData = async () => {
        try {
          const params = {
            latitude: selectedPlace?.lat,
            longitude: selectedPlace?.lng,
            current: ["temperature_2m", "rain"],
            start_date: formattedCurrentDate,
            end_date: formattedFutureDate,
            // start_date: "2024-04-18",
            // end_date: "2024-04-30",
            daily: ["temperature_2m_max", "temperature_2m_min"],
          };
          const url = "https://api.open-meteo.com/v1/forecast";
          const responses = await fetchWeatherApi(url, params);

          const response = responses[0];

          const utcOffsetSeconds = response.utcOffsetSeconds();
          const current = response.current();
          const daily = response.daily();

          const weatherData = {
            current: {
              time: new Date(
                (Number(current.time()) + utcOffsetSeconds) * 1000
              ),
              temperature2m: Number(current.variables(0).value()).toFixed(2), // Format to 2 decimal places
              rain: current.variables(1).value(),
            },
            daily: {
              time: range(
                Number(daily.time()),
                Number(daily.timeEnd()),
                daily.interval()
              ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
              temperature2mMax: daily
                .variables(0)
                .valuesArray()
                .map((value) => Number(value.toFixed(2))), // Format to 2 decimal places
              temperature2mMin: daily
                .variables(1)
                .valuesArray()
                .map((value) => Number(value.toFixed(2))), // Format to 2 decimal places
            },
          };

          setWeatherData(weatherData);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };
      const fetchFloodData = async () => {
        const params = {
          latitude: selectedPlace?.lat,
          longitude: selectedPlace?.lng,
          start_date: formattedCurrentDate,
          end_date: formattedFutureDate,
          // start_date: "2024-04-17",
          // end_date: "2024-04-20",
          daily: "river_discharge",
        };

        const url = "https://flood-api.open-meteo.com/v1/flood";

        try {
          const responses = await fetchWeatherApi(url, params);
          const response = responses[0];

          const utcOffsetSeconds = response.utcOffsetSeconds();
          const daily = response.daily();

          const time = range(
            Number(daily.time()),
            Number(daily.timeEnd()),
            daily.interval()
          ).map((t) => new Date((t + utcOffsetSeconds) * 1000));

          const riverDischarge = daily.variables(0).valuesArray();

          const formattedData = {
            time,
            riverDischarge,
          };

          setFloodData(formattedData);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchWeatherData();
      fetchFloodData();
    }
  }, [selectedPlace]);

  return (
    <>
      <div className="border rounded-lg p-5 my-2">
        {selectedPlace ? (
          <>
            <p className="text-center text-lg font-bold">
              Weather forecast of {selectedPlace.place_name}
            </p>
          </>
        ) : (
          <p className="text-center text-lg font-bold">Weather forecast</p>
        )}
        <div className="container mx-auto p-4">
          <input
            type="text"
            ref={inputRef}
            onChange={handleInputChange}
            placeholder="Search for a location..."
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mx-4">
          {results &&
            results?.length > 0 &&
            results?.map((result) => (
              <div
                key={result.id}
                className="mb-2 p-2 border rounded-md cursor-pointer"
                onClick={() => handleAddPlace(result)}
              >
                <h3 className="text-sm font-semibold break-all">
                  {result.place_name}
                </h3>
                <p className="text-gray-400 break-words">
                  {result.context?.map((context) => context.text).join(", ")}
                </p>
              </div>
            ))}
        </div>
        {selectedPlace && weatherData && floodData ? (
          <>
            <div className="my-2">
              <h2>Current Weather</h2>
              <p>
                Date: {weatherData.current.time.toLocaleDateString("en-GB")}
              </p>
              <p>Temperature: {weatherData.current.temperature2m}°C</p>
              {/* <p>Rain: {weatherData.current.rain}</p> */}
            </div>
            <div className="flex items-center landscape:justify-center overflow-x-auto">
              <table
                className="rounded-lg"
                style={{ borderCollapse: "collapse", width: "100%" }}
              >
                <thead className="bg-gray-600">
                  <tr>
                    <th style={tableHeaderStyle}>Date</th>
                    <th style={tableHeaderStyle}>Max Temperature (°C)</th>
                    <th style={tableHeaderStyle}>Min Temperature (°C)</th>
                    <th style={tableHeaderStyle}>River Discharge (m³/s)</th>
                    <th style={tableHeaderStyle}>Rain (mm)</th>
                  </tr>
                </thead>
                <tbody>
                  {weatherData.daily.time.map((time, index) => (
                    <tr
                      className="bg-gray-800 hover:bg-gray-900"
                      key={index}
                      style={tableRowStyle}
                    >
                      <td style={tableCellStyle}>
                        {time.toLocaleDateString("en-GB")}
                      </td>
                      <td style={tableCellStyle}>
                        {Number(
                          weatherData.daily.temperature2mMax[index]
                        ).toFixed(2)}
                      </td>
                      <td style={tableCellStyle}>
                        {Number(
                          weatherData.daily.temperature2mMin[index]
                        ).toFixed(2)}
                      </td>
                      <td style={tableCellStyle}>
                        {Number(floodData.riverDischarge[index]).toFixed(2)}
                      </td>
                      <td style={tableCellStyle}>{weatherData.current.rain}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
const tableHeaderStyle = {
  borderBottom: "1px solid #ddd",
  textAlign: "left",
  padding: "8px",
};

const tableRowStyle = {
  borderBottom: "1px solid #ddd",
};

const tableCellStyle = {
  textAlign: "left",
  padding: "8px",
};
