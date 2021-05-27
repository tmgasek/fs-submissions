import React from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import VisibilityFilter from './components/VisibilityFilter';

const App = () => {
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
