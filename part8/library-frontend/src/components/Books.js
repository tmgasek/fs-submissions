import React, { useState } from 'react';

const Books = ({ show, result }) => {
  const [filter, setFilter] = useState('');
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

    // const filtered = allBooks.filter()
  };

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
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
