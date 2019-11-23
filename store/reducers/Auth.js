import {LOGIN, SIGNUP, AUTHENTICATE} from '../actions/Auth';

const initialState = {
  token: null,
  userId: null,
  email: null,
  name: null,
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
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };
    default:
      return state;
  }
};
