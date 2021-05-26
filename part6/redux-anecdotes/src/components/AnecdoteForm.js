import React from 'react';
import { useDispatch } from 'react-redux';
import { anecdoteCreator } from '../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    dispatch(anecdoteCreator(content));
  };

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <h3>new anecdote </h3>
        <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
