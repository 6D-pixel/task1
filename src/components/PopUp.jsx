import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PopUp.css";
const PopUp = ({ country, closeModal }) => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const lat = country.capitalInfo.latlng[0];
  const lng = country.capitalInfo.latlng[1];
  console.log(lat, lng);
  useEffect(() => {
    const fetchWeatherInfo = async () => {
      try {
        const response = await axios.get(
          `https://task1-express.onrender.com/weather`,
          {
            params: {
              q: `${lat},${lng}`,
            },
          }
        );
        setWeatherInfo(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching weather info:", error);
      }
    };
    fetchWeatherInfo();
  }, [country]);

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <h2>{country.name.common}</h2>
          <p>Population: {country.population}</p>
          <p>Continent: {country.region}</p>
          <p>Capital: {country.capital[0]}</p>
          {/* Display weather info fetched from AccuWeather API */}
          {weatherInfo && (
            <div>
              <p>Weather Information:</p>
              <p>Temperature: {weatherInfo[0].Temperature.Metric.Value}°C</p>
              <p>Weather Text: {weatherInfo[0].WeatherText}</p>
              <p>Weather Icon: {weatherInfo[0].WeatherIcon}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopUp;
