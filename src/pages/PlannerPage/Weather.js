import React, { useEffect, useState } from "react";
import { fetchWeatherApi } from 'openmeteo';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          "latitude": 17.4065,
          "longitude": 78.4772,
          "current": ["temperature_2m", "rain"],
          "hourly": "temperature_2m",
          "daily": ["temperature_2m_max", "temperature_2m_min"]
        };
        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);

        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];

        // Attributes for timezone and location
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const timezone = response.timezone();
        const timezoneAbbreviation = response.timezoneAbbreviation();
        const latitude = response.latitude();
        const longitude = response.longitude();

        const current = response.current();
        const hourly = response.hourly();
        const daily = response.daily();

        // Helper function to form time ranges
        const range = (start, stop, step) =>
          Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData = {
          current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature2m: current.variables(0).value(),
            rain: current.variables(1).value(),
          },
          hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
              (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            temperature2m: hourly.variables(0).valuesArray(),
          },
          daily: {
            time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
              (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            temperature2mMax: daily.variables(0).valuesArray(),
            temperature2mMin: daily.variables(1).valuesArray(),
          },
        };

        setWeatherData(weatherData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Weather Forecast</h1>
      <div>
        <h2>Current Weather</h2>
        <p>Time: {weatherData.current.time.toISOString()}</p>
        <p>Temperature: {weatherData.current.temperature2m}°C</p>
        <p>Rain: {weatherData.current.rain}</p>
      </div>
      <div>
        <h2>Hourly Forecast</h2>
        <ul>
          {weatherData.hourly.time.map((time, index) => (
            <li key={index}>
              {time.toISOString()} - {weatherData.hourly.temperature2m[index]}°C
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Daily Forecast</h2>
        <ul>
          {weatherData.daily.time.map((time, index) => (
            <li key={index}>
              {time.toISOString()} - Max: {weatherData.daily.temperature2mMax[index]}°C, Min:{" "}
              {weatherData.daily.temperature2mMin[index]}°C
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Weather;