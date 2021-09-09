const initialState = {
  notes: [],
  active: null,
};

const notesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_NOTE":
      return {
        ...state,
        notes: [...state.notes, payload],
      };
    case "EDIT_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === payload.id) {
            return payload;
          }
          return note;
        }),
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== payload),
      };
    case "SET_ACTIVE_NOTE":
      return {
        ...state,
        active: payload,
      };
    default:
      return state;
  }
};

export default notesReducer;
