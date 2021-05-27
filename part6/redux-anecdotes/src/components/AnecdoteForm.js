import React from 'react';
import { useDispatch } from 'react-redux';
import { anecdoteCreator } from '../reducers/anecdoteReducer';
import { notificationClear, notify } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    dispatch(anecdoteCreator(content));

    dispatch(notify(`note: ${content} added!`));
    setTimeout(() => {
      dispatch(notificationClear());
    }, 2000);
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
