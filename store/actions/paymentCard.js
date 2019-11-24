import PaymentCard from '../../models/paymentCard';

export const SET_PAYMENT_CARD = 'SET_PAYMENT_CARD';
export const UPDATE_PAYMENT_CARD = 'UPDATE_PAYMENT_CARD';

export const setPaymentCard = (
  cardnumber,
  expiration,
  securityCode,
  zipcode,
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(
      `https://equipmentrental-97ece.firebaseio.com/users/${userId}/paymentCard.json/?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cardnumber,
          expiration,
          securityCode,
          zipcode,
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Something went wront in seting payment card!');
    }

    dispatch(getPaymentCard());
  };
};

export const getPaymentCard = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    try {
      const response = await fetch(
        `https://equipmentrental-97ece.firebaseio.com/users/${userId}/paymentCard.json/`,
      );

      if (!response.ok) {
        throw new Error('Something went wring in getting payment card.');
      }

      const resData = await response.json();

      if (!resData) {
        return 'PaymentCardNotSaved';
      }

      let paymentCard;
      for (const key in resData) {
        paymentCard = new PaymentCard(
          key,
          resData[key].cardnumber,
          resData[key].expiration,
          resData[key].securityCode,
          resData[key].zipcode,
        );
      }

      dispatch({
        type: SET_PAYMENT_CARD,
        paymentCard: paymentCard,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const updatePaymentCard = (
  key,
  cardnumber,
  expiration,
  securityCode,
  zipcode,
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://equipmentrental-97ece.firebaseio.com/users/${userId}/paymentCard/${key}.json/?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cardnumber,
          expiration,
          securityCode,
          zipcode,
        }),
      },
    );
    if (!response.ok) {
      throw new Error('Something went wrong while updating paymentCard!');
    }

    dispatch(getPaymentCard());
  };
};
