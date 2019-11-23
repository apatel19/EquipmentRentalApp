import {SET_USER, SET_ADDRESS} from '../actions/userset';

const initialState = {
  user: '',
  address: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case SET_ADDRESS:
      return {
        ...state,
        address: action.address,
      };
    default:
      return state;
  }
};
