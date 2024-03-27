import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PopUp.css';
const PopUp = ({ country, closeModal }) => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const lat = country.capitalInfo.latlng[0];
  const lng = country.capitalInfo.latlng[1];

  useEffect(() => {
    const fetchWeatherInfo = async () => {
      try {
        const response_key = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search`, {
          params: {
            apikey:`${import.meta.env.VITE_API_KEY}`,//api key
            q:`${lat},${lng}`
          }
        });
        const weatherKey = response_key.data.Key;
        const response_weather = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${weatherKey}`,{
            params:{
                apikey:`${import.meta.env.VITE_API_KEY}`
            }
        })
        setWeatherInfo(response_weather.data);
        console.log(response_weather.data)
      } catch (error) {
        console.error('Error fetching weather info:', error);
      }
    };
    fetchWeatherInfo();
  }, [country]);

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
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
