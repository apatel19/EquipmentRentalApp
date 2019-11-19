import {SET_USER} from '../actions/userset';

const initialState = {
  email: '',
  name: '',
  ownerId: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        email: action.user.email,
        name: action.user.name,
        ownerId: action.user.ownerId,
      };
    default:
      return state;
  }
};
