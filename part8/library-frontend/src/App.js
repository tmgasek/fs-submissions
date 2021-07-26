import React, { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';

import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries';
import Recommended from './components/Recommended';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);

  const allAuthorsResult = useQuery(ALL_AUTHORS);
  const allBooksResult = useQuery(ALL_BOOKS);

  const client = useApolloClient();

  useEffect(() => {
    const token = localStorage.getItem('library-user-token');
    setToken(token);
  }, []);

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      console.log(addedBook);
      updateCacheWith(addedBook);
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (allAuthorsResult.loading || allBooksResult.loading) {
    return <div>loading...</div>;
  }

  if (!token) {
    return (
      <div>
        <LoginForm setToken={setToken} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={logout}>logout</button>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors={allAuthorsResult.data.allAuthors}
      />

      <Books show={page === 'books'} result={allBooksResult} />

      <NewBook show={page === 'add'} />

      <Recommended show={page === 'recommended'} />
    </div>
  );
};

export default App;
