import { types } from "../types/types";

const initialState = {
    uid: null,
    name: null
};
const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.login:
      return {
        uid: payload.uid,
        name: payload.displayName,
      };
    case types.logout:
      return {};
    default:
      return state;
  }
};

export default authReducer;