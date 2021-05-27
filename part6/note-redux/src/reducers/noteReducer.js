import noteService from '../services/notes';

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_NOTES':
      return action.data;
    case 'NEW_NOTE':
      return [...state, action.data];
    case 'TOGGLE_IMPORTANCE': {
      const id = action.data.id;
      const noteToChange = state.find((note) => note.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((note) => (note.id !== id ? note : changedNote));
    }
    default:
      return state;
  }
};

export const initNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch({
      type: 'INIT_NOTES',
      data: notes,
    });
  };
};

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content);
    dispatch({
      type: 'NEW_NOTE',
      data: newNote,
    });
  };
};

export const toggleImportanceOf = (data) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data,
  };
};

export default noteReducer;
