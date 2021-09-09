import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";
import { googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";

const auth = getAuth();

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(finishLoading());
      });
  };
};

export const startRegisterWithEmailPassword = (email, password, name) => {
  return (dispatch) => {
    dispatch(startLoading());
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(user, {
          displayName: name,
        });
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((error) => {
        console.log(error);
        dispatch(finishLoading());
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    dispatch(startLoading());
    signInWithPopup(auth, googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((error) => {
        console.log(error);
        dispatch(finishLoading());
      });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: { uid, displayName },
});

export const startLogout = () => {
  return async (dispatch) => {
    auth.signOut();
    dispatch(logout());
  };
};

export const logout = () => ({ type: types.logout });

export const startLoading = () => ({
  type: types.uiStartLoading,
});

export const finishLoading = () => ({
  type: types.uiFinishLoading,
});
