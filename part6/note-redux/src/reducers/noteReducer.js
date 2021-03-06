import noteService from '../services/notes';

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_NOTES':
      return action.data;
    case 'NEW_NOTE':
      return [...state, action.data];
    case 'TOGGLE_IMPORTANCE': {
      return state.map((note) =>
        note.id !== action.data.id ? note : action.data
      );
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

export const toggleImportanceOf = (note) => {
  return async (dispatch) => {
    const updatedNote = { ...note, important: !note.important };
    noteService.changeImportance(updatedNote.id, updatedNote);
    dispatch({
      type: 'TOGGLE_IMPORTANCE',
      data: updatedNote,
    });
  };
};

/*
LOOK UP SOLUTION 
*/

export default noteReducer;
