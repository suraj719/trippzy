import React, { useState, useEffect, useRef } from "react";
import { fetchWeatherApi } from "openmeteo";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alerts";

export default function TripWeather() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const lat = queryParams.get("lat");
  const lng = queryParams.get("lng");
  const fromDate = queryParams.get("from");
  const toDate = queryParams.get("to");
  const place_name = queryParams.get("place_name");
  const currentDate = new Date(fromDate || new Date());
  const futureDate = new Date(toDate || currentDate);
  if (!toDate) {
    futureDate.setDate(currentDate.getDate() + 7);
  }
  const formattedCurrentDate = currentDate.toISOString().split("T")[0];
  const formattedFutureDate = futureDate.toISOString().split("T")[0];

  const [weatherData, setWeatherData] = useState(null);
  const [floodData, setFloodData] = useState(null);
  const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  const [error, setError] = useState(null);
  useEffect(() => {
    dispatch(ShowLoading());
    if (lat && lng && formattedCurrentDate && formattedFutureDate) {
      const fetchWeatherData = async () => {
        try {
          const params = {
            latitude: lat,
            longitude: lng,
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
          latitude: lat,
          longitude: lng,
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
    dispatch(HideLoading());
  }, []);

  return (
    <>
      <div className="rounded-lg p-5 my-2">
        {place_name ? (
          <>
            <p className="text-center text-lg font-bold">
              Weather forecast of {place_name}
            </p>
          </>
        ) : (
          <p className="text-center text-lg font-bold">Weather forecast</p>
        )}
        {lat && lng && weatherData && floodData ? (
          <>
            <div className="my-2">
              <h2>Current Weather</h2>
              <p>
                Date: {weatherData.current.time.toLocaleDateString("en-GB")}
              </p>
              <p>Temperature: {weatherData.current.temperature2m}°C</p>
            </div>
            <div className="flex items-center justify-center">
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
