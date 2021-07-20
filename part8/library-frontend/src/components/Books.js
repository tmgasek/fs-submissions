import React, { useState } from 'react';

const Books = ({ show, result }) => {
  const [filter, setFilter] = useState('All genres');
  if (!show) {
    return null;
  }

  const allBooks = result.data.allBooks;

  let genres = ['All genres'];
  allBooks.forEach((element) => {
    element.genres.forEach((g) => {
      if (genres.indexOf(g) === -1) {
        genres.push(g);
      }
    });
  });

  const handleFilterClick = (genre) => {
    console.log(genre);
    setFilter(genre);
  };

  const filtered = () => {
    const filtered = allBooks.filter((book) => book.genres.includes(filter));
    console.log(filtered);
    return (
      <>
        {filtered.map((a) => (
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
            <td>{a.genres.join(', ')}</td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <div>
      <h2>books</h2>
      {filter === 'All genres' ? (
        <p>all genres: </p>
      ) : (
        <p>in genre "{filter}":</p>
      )}
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {filter === 'All genres'
            ? allBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                  <td>{a.genres.join(', ')}</td>
                </tr>
              ))
            : filtered()}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => handleFilterClick(g)}>
          {g}
        </button>
      ))}
    </div>
  );
};

export default Books;
