import { types } from "../types/types";

const initialState = {
  notes: [],
  active: null,
};

const notesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.notesActive:
      return {
        ...state,
        active: { ...payload },
      };

    case types.notesLoad:
      return {
        ...state,
        notes: [...payload],
      };

    case types.notesUpdated:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === payload.id ? payload.note : note
        ),
      };

    default:
      return state;
  }
};

export default notesReducer;
