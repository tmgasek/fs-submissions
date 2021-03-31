import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setFilter] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
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
      console.log(c);
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
      return <div key={c.alpha3Code}>{c.name}</div>;
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
