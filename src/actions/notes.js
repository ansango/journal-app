import { db } from "../firebase/firebase-config";
import { doc, collection, addDoc, updateDoc } from "@firebase/firestore";
import { types } from "../types/types";
import loadNotes from "../helpers/loadNotes";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };
    const _doc = await addDoc(collection(db, `${uid}/journal/notes`), newNote);
    dispatch(activeNote(_doc.id, newNote));
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: { id, ...note },
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;

    const noteToSave = { ...note };
    if (!noteToSave.url) {
      delete noteToSave.url;
    }
    delete noteToSave.id;
    const noteRef = doc(db, `${uid}/journal/notes/`, note.id);
    await updateDoc(noteRef, noteToSave);
  };
};
