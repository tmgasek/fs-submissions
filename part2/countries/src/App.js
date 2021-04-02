import React, { useEffect, useState } from 'react';
import axios from 'axios';
const api_key = process.env.REACT_APP_API_KEY;

const Weather = ({ capital }) => {
  const [weatherDetails, setWeatherDetails] = useState(null);

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

const Countries = (props) => {
  const countriesFiltered = props.countries.filter((c) =>
    c.name.toLowerCase().includes(props.newFilter.toLowerCase())
  );

  if (countriesFiltered.length > 10) {
    return <div> too many </div>;
  }
  if (countriesFiltered.length === 1) {
    const c = countriesFiltered[0];

    return (
      <div>
        <h1>{c.name}</h1>
        <p>capital {c.capital}</p>
        <p>population {c.population}</p>
        <h1>languages</h1>
        <ul>
          {c.languages.map((l) => {
            return <li key={l.name}>{l.name}</li>;
          })}
        </ul>
        <img src={c.flag} className="flag" alt="" />
        <Weather capital={c.capital} />
      </div>
    );
  }
  return countriesFiltered.map((c) => {
    return (
      <div key={c.alpha3Code}>
        {c.name}
        <button onClick={props.handleSelectClick}>Select</button>
      </div>
    );
  });
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountries(response.data));
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSelectClick = (e) => {
    setFilter(e.target.previousSibling.textContent.toLowerCase());
  };

  return (
    <div>
      <input value={newFilter} onChange={handleFilterChange} />
      <Countries
        countries={countries}
        handleSelectClick={handleSelectClick}
        newFilter={newFilter}
      />
    </div>
  );
};

export default App;
