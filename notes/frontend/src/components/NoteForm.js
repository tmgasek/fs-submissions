import React from 'react';

const NoteForm = ({ onSubmit, newNote, handleNoteChange }) => {
  return (
    <div>
      <h2>create new note</h2>

      <form onSubmit={onSubmit}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NoteForm;
