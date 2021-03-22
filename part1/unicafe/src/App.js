import React, { useState } from 'react';

const Button = ({ handleClick, text }) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleGoodClick = () => {
    setAll(allClicks.concat(1));
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setAll(allClicks.concat(0));
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setAll(allClicks.concat(-1));
    setBad(bad + 1);
  };

  const calculateAll = () => good + neutral + bad;

  const average = () => {
    return (
      allClicks.reduce((a, b) => {
        return a + b;
      }, 0) / allClicks.length
    );
  };

  const calculatePositive = () => {
    return (good / calculateAll()) * 100;
  };

  return (
    <div>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>Statistics</h1>
      <p>
        good {good}
        <br />
        neutral {neutral}
        <br />
        bad {bad}
        <br />
        all {calculateAll()}
        <br />
        average {average()}
        <br />
        pos {calculatePositive()}%
      </p>
    </div>
  );
};

export default App;
