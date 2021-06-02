import React from 'react';
import { connect } from 'react-redux';
import { voteIncrementCreator } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const handleVote = (anecdote) => {
    props.voteIncrementCreator(anecdote);

    const voted = props.anecdotes.find((a) => a.id === anecdote.id);
    // dispatch(notify(`voted for "${voted.content}"`));
    // setTimeout(() => {
    //   dispatch(notificationClear());
    // }, 3000);
    props.setNotification(`voted for ${voted.content}`, 2000);
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
      {sortAnecdotes(props.anecdotes).map((anecdote) => (
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(state.filter.toLowerCase())
    ),
  };
};

const mapDispatchToProps = {
  setNotification,
  voteIncrementCreator,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
