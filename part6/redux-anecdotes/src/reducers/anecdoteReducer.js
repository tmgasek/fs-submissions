import anecdoteService from '../services/anecdotes';

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data;
    case 'VOTE_INCREMENT':
      const id = action.data.id;
      const toChange = state.find((a) => a.id === id);
      const changed = {
        ...toChange,
        votes: toChange.votes + 1,
      };
      return state.map((a) => (a.id !== id ? a : changed));
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    default:
      return state;
  }
};

export const getId = () => (100000 * Math.random()).toFixed(0);

export const voteCreator = (id) => {
  return {
    type: 'VOTE_INCREMENT',
    data: { id },
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

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export default anecdoteReducer;
