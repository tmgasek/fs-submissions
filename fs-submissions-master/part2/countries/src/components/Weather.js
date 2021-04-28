import { React, useEffect } from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;

export const Weather = ({ capital, weatherDetails, setWeatherDetails }) => {
  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current', {
        params: {
          access_key: api_key,
          query: capital,
        },
      })
      .then((response) => {
        setWeatherDetails(response.data);
      });
  }, [capital]);
  console.log('weather', weatherDetails);

  return (
    <div>
      <h3>Weather in {capital} </h3>
      <p>
        {' '}
        temperature: {weatherDetails && weatherDetails.current.temperature}{' '}
        celcius
      </p>
      <img
        src={weatherDetails && weatherDetails.current.weather_icons[0]}
        alt=""
      />
      <p>
        wind: {weatherDetails && weatherDetails.current.wind_speed} mph
        direction {weatherDetails && weatherDetails.current.wind_dir}{' '}
      </p>
    </div>
  );
};
