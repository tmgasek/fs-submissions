import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteCreator } from '../reducers/anecdoteReducer';

const AnecdoteList = (props) => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteCreator(id));
    console.log('vote', id);
  };

  const sortAnecdotes = (anecdotes) => {
    return anecdotes.sort((a, b) => {
      const aVotes = a.votes;
      const bVotes = b.votes;

      return bVotes - aVotes;
    });
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortAnecdotes(anecdotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
