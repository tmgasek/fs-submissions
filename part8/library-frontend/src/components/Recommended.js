import { useQuery } from '@apollo/client';
import React from 'react';
import { ME } from '../queries';

const Recommended = ({ show, result }) => {
  const currUser = useQuery(ME);

  if (!show) {
    return null;
  }

  if (currUser.loading) {
    return <div>loading...</div>;
  }
  const allBooks = result.data.allBooks;

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
          {allBooks
            .filter((book) =>
              book.genres.includes(currUser.data.me.favoriteGenre)
            )
            .map((a) => (
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
