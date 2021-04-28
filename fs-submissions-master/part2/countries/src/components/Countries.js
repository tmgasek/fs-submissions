import React from 'react';
import { Weather } from './Weather';

export const Countries = (props) => {
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
        <Weather
          capital={c.capital}
          weatherDetails={props.weatherDetails}
          setWeatherDetails={props.setWeatherDetails}
        />
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
