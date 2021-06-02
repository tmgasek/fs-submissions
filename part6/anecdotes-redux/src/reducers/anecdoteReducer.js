import anecdoteService from '../services/anecdotes';

const anecdoteReducer = (state = [], action) => {
  // console.log('state now: ', state);
  // console.log('action', action);

  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data;
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    case 'VOTE_INCREMENT':
      return state.map((a) => (a.id !== action.data.id ? a : action.data));
    default:
      return state;
  }
};

export const initAnecdotesCreator = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export const voteIncrementCreator = (anecdote) => {
  return async (dispatch) => {
    const newObject = { ...anecdote, votes: anecdote.votes + 1 };
    const updatedAnecdote = await anecdoteService.updateVotes(
      anecdote.id,
      newObject
    );
    dispatch({
      type: 'VOTE_INCREMENT',
      data: updatedAnecdote,
    });
  };
};

export const anecdoteCreator = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    });
  };
};

export default anecdoteReducer;
