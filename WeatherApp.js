import React, { useState } from "react";
import axios from "axios";
import "./WeatherApp.css"; // simple CSS file

export default function WeatherApp() {
  const [city, setCity] = useState("London");
  const [temperature, setTemperature] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "4b3503b2f08a729413c4d33ef1186004";

  const search = () => {
    if (!city.trim()) return;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      .then((response) => {
        setTemperature(response.data.main.temp);
        setError(null);
      })
      .catch(() => {
        setError("City not found");
        setTemperature(null);
      });
  };

  return (
    <div className="weather-container">
      <h1>Weather Search Engine 🌦</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter a city"
      />
      <button onClick={search}>Search</button>

      {temperature !== null && (
        <p>
          The temperature in <strong>{city}</strong> is{" "}
          <strong>{temperature}°C</strong>
        </p>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
