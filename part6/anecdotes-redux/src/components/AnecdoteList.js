import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteCreator } from '../reducers/anecdoteReducer';
import { notificationClear, notify } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (!anecdotes) {
      return anecdotes;
    }

    return anecdotes.filter((a) =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    );
  });
  const dispatch = useDispatch();

  const handleVote = (anecdote) => {
    dispatch(voteCreator(anecdote));

    const voted = anecdotes.find((a) => a.id === anecdote.id);
    dispatch(notify(`voted for "${voted.content}"`));
    setTimeout(() => {
      dispatch(notificationClear());
    }, 3000);
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
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
