import { db } from "../firebase/firebase-config";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
} from "@firebase/firestore";
import { types } from "../types/types";
import loadNotes from "../helpers/loadNotes";
import Swal from "sweetalert2";
import fileUpload from "../helpers/fileUpload";

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
    dispatch(addNewNote(doc.id, newNote));
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: { id, ...note },
});

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note,
  },
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
    try {
      await updateDoc(noteRef, noteToSave);
      dispatch(refreshNote(note.id, noteToSave));
      Swal.fire("Saved", "Your note has been saved", "success");
    } catch (error) {
      Swal.fire("Error", "Your note has not been saved", "error");
    }
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdate,
  payload: { id, note: { id, ...note } },
});

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;

    Swal.fire({
      title: "Uploading...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const fileUrl = await fileUpload(file);
    dispatch(startSaveNote({ ...activeNote, url: fileUrl }));
    Swal.close();
  };
};

export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const _doc = doc(db, `${uid}/journal/notes/`, id);
    try {
      await deleteDoc(_doc);
      dispatch(deleteNote(id));
    } catch (error) {
      Swal.fire("Error", "Your note has not been deleted", "error");
    }
  };
};

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const noteLogout = () => ({
  type: types.notesLogoutCleaning,
});