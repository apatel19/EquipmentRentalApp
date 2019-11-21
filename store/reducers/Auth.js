import {LOGIN, SIGNUP} from '../actions/Auth';

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId,
        email: action.email,
        name: action.name,
      };
    case SIGNUP:
      return {
        token: action.token,
        userId: action.userId,
        email: action.email,
        name: action.name,
      };
    default:
      return state;
  }
};
