import React, { useState } from 'react';

const Button = ({ handleClick, text }) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};

const Statistics = (props) => {
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;
  const allClicks = props.allClicks;

  const calculateAll = () => good + neutral + bad;

  const average = () => {
    return (
      allClicks.reduce((a, b) => {
        return a + b;
      }, 0) / allClicks.length
    );
  };

  const calculatePositive = () => (good / calculateAll()) * 100;

  if (allClicks.length === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Statistics</h1>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={calculateAll()} />
      <Statistic text="average" value={average()} />
      <Statistic text="positive" value={calculatePositive() + '%'} />
    </div>
  );
};

const Statistic = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
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

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        allClicks={allClicks}
      />
    </div>
  );
};

export default App;
