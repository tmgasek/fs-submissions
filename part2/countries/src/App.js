import React, { useEffect, useState } from 'react';
import axios from 'axios';
const api_key = process.env.REACT_APP_API_KEY;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setFilter] = useState('');
  const [weather, setWeather] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountries(response.data));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=Warsaw`
      )
      .then((response) => {
        console.log('promise fulfilled');
        setWeather(response.data);
      });
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
        {/* <img src={c.flag} /> */}
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

export default App;
