import React, { useEffect, useState } from 'react';
import axios from 'axios';
const api_key = process.env.REACT_APP_API_KEY;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setFilter] = useState('');
  const [weather, setWeather] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountries(response.data));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=New York`
      )
      .then((response) => setWeather(response.data));
  }, []);
  console.log(weather);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSelectClick = (e) => {
    setFilter(e.target.previousSibling.textContent.toLowerCase());
  };

  const showCountries = () => {
    const filtered = countries.filter((c) =>
      c.name.toLowerCase().includes(newFilter.toLowerCase())
    );

    if (filtered.length > 10) {
      return <div> too many </div>;
    }
    if (filtered.length === 1) {
      const c = filtered[0];
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
        </div>
      );
    }
    return filtered.map((c) => {
      return (
        <div key={c.alpha3Code}>
          {c.name}
          <button onClick={handleSelectClick}>Select</button>
        </div>
      );
    });
  };

  return (
    <div>
      <input value={newFilter} onChange={handleFilterChange} />
      <div>{showCountries()}</div>
    </div>
  );
};

export default App;
