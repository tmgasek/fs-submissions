const Note = require('../models/note');

const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false,
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true,
  },
];

//  used for creating a db object id that does not belong to any note object in db.
const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoonISH', date: new Date() });
  await note.save();
  await note.remove();

  return note._id.toString();
};

//  checks notes stored in db
const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
};
