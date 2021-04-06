import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Countries } from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setFilter] = useState('');
  const [weatherDetails, setWeatherDetails] = useState(null);

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
        weatherDetails={weatherDetails}
        setWeatherDetails={setWeatherDetails}
      />
    </div>
  );
};

export default App;
