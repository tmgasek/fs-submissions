import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { ALL_BOOKS_BY_GENRE, ME } from '../queries';

const Recommended = ({ show }) => {
  const [favGenre, setFavGenre] = useState(null);
  const [books, setBooks] = useState(null);

  const currUserQuery = useQuery(ME);

  const [getGenreFilter, genreFilterQuery] = useLazyQuery(ALL_BOOKS_BY_GENRE);

  useEffect(() => {
    console.log('fired1');
    if (favGenre) {
      getGenreFilter({ variables: { genre: favGenre } });
    }
  }, [favGenre, getGenreFilter]);

  useEffect(() => {
    console.log('fired2');
    if (genreFilterQuery.data) {
      setBooks(genreFilterQuery.data.allBooks);
    }
  }, [genreFilterQuery]);

  if (!show) return null;
  if (currUserQuery.loading || genreFilterQuery.loading) return null;
  if (currUserQuery.error) return `ERROR ${currUserQuery.error}`;
  if (genreFilterQuery.error) return `ERROR ${genreFilterQuery.error}`;

  if (!favGenre) setFavGenre(currUserQuery.data.me.favoriteGenre);

  if (!books) return null;

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
