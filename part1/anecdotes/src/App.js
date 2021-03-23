import React, { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(
    Array.apply(null, new Array(anecdotes.length)).map(
      Number.prototype.valueOf,
      0
    )
  );

  const getRandomNumber = () => {
    while (true) {
<<<<<<< HEAD
      let randomNum = Math.floor(Math.random() * anecdotes.length);
      if (selected !== randomNum) return randomNum;
    }
  };

  const handleClickNext = () => {
=======
      let rand = Math.floor(Math.random() * anecdotes.length);
      if (rand !== selected) return rand;
    }
  };

  const handleRandomClick = () => {
>>>>>>> 62aea5a06fed6e5048ba0cc754d64eb89b0a3a91
    setSelected(getRandomNumber());
  };

  const vote = () => {
    const copy = [...points];
    copy[selected]++;
    setPoints(copy);
  };

  const getTopAnecdote = () => {
    const topNum = Math.max(...points);
    return points.indexOf(topNum);
  };

  return (
    <div>
      {anecdotes[selected]}
      <br />
      has {points[selected]} points
      <br />
      <button onClick={vote}>vote</button>
<<<<<<< HEAD
      <button onClick={handleClickNext}>next</button>
=======
      <button onClick={handleRandomClick}>random</button>
>>>>>>> 62aea5a06fed6e5048ba0cc754d64eb89b0a3a91
      <h1>Top anecdote</h1>
      {anecdotes[getTopAnecdote()]}
    </div>
  );
};

export default App;
