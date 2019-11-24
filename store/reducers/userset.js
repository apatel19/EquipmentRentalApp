import {SET_USER, SET_ADDRESS} from '../actions/userset';
import {SET_PAYMENT_CARD} from '../actions/paymentCard';

const initialState = {
  user: '',
  address: '',
  paymentCard: '',
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
    case SET_PAYMENT_CARD:
      return {
        ...state,
        paymentCard: action.paymentCard,
      };
    default:
      return state;
  }
};
