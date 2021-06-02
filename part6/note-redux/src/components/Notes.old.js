// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleImportanceOf } from '../reducers/noteReducer';
// // import noteService from '../services/notes';

// const Note = ({ note, handleClick }) => {
//   return (
//     <li onClick={handleClick}>
//       {note.content}
//       <strong> {note.important ? 'important' : ''}</strong>
//     </li>
//   );
// };

// const Notes = () => {
//   const dispatch = useDispatch();
//   const notes = useSelector(({ filter, notes }) => {
//     if (filter === 'ALL') {
//       return notes;
//     }
//     return filter === 'IMPORTANT'
//       ? notes.filter((note) => note.important)
//       : notes.filter((note) => !note.important);
//   });

//   const handleUpdate = (note) => {
//     dispatch(toggleImportanceOf(note));
//   };

//   return (
//     <ul>
//       {notes.map((note) => (
//         <Note
//           key={note.id}
//           note={note}
//           handleClick={() => handleUpdate(note)}
//         />
//       ))}
//     </ul>
//   );
// };

// export default Notes;

// //newnote.js
// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { createNote } from '../reducers/noteReducer';

// const NewNote = (props) => {
//   const dispatch = useDispatch();

//   const addNote = async (event) => {
//     event.preventDefault();
//     const content = event.target.note.value;
//     event.target.note.value = '';

//     dispatch(createNote(content));
//   };

//   return (
//     <form onSubmit={addNote}>
//       <input name="note" />
//       <button type="submit">add</button>
//     </form>
//   );
// };

// export default NewNote;
