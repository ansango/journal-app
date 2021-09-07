import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  updateProfile,
} from "@firebase/auth";
import { googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";

const auth = getAuth();

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(login(123, "Pedro"));
    }, 3000);
  };
};

export const startRegisterWithEmail = (email, password, name) => {
  return (dispatch) => {
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
      console.log(user);
    });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    signInWithPopup(auth, googleAuthProvider).then(({ user }) => {
      dispatch(login(user.uid, user.displayName));
    });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: { uid, displayName },
});
