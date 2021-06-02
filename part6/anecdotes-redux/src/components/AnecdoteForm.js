import React from 'react';
import { anecdoteCreator } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    props.anecdoteCreator(content);

    props.setNotification(`note: ${content} added!`, 2000);
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

export default connect(null, { anecdoteCreator, setNotification })(
  AnecdoteForm
);
