import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initAnecdotesCreator } from './reducers/anecdoteReducer';

import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import VisibilityFilter from './components/VisibilityFilter';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAnecdotesCreator());
  }, [dispatch]);

  return (
    <div>
      <Notification />
      <VisibilityFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
