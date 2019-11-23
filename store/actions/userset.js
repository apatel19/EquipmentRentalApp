import User from '../../models/user';
import Address from '../../models/address';

export const SET_USER = 'SET_USER';
export const SET_ADDRESS = 'SET_ADDRESS';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';

export const setuser = (name, email) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://equipmentrental-97ece.firebaseio.com/users/${userId}/user.json/?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          ownerId: userId,
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Something went wrong setting up user object.');
    }

    const user = new User(userId, name, email);

    dispatch({
      type: SET_USER,
      user: user,
    });
  };
};

export const getUser = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://equipmentrental-97ece.firebaseio.com/users/${userId}/user.json/`,
      );

      if (!response.ok) {
        throw new Error('Something went wrong fetching user object.');
      }

      const resData = await response.json();
      let user;
      for (const key in resData) {
        user = new User(
          resData[key].ownerId,
          resData[key].name,
          resData[key].email,
        );
      }
      dispatch({
        type: SET_USER,
        user: user,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const setUserAddress = (street, apartment, city, state, zipcode) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(
      `https://equipmentrental-97ece.firebaseio.com/users/${userId}/address.json/?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          street,
          apartment,
          city,
          state,
          zipcode,
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Something went wront in seting user address!');
    }

    dispatch(getUserAddress());
  };
};

export const getUserAddress = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    try {
      const response = await fetch(
        `https://equipmentrental-97ece.firebaseio.com/users/${userId}/address.json/`,
      );

      if (!response.ok) {
        throw new Error('Something went wring in getting user address.');
      }

      const resData = await response.json();

      if (!resData) {
        return 'AddressNotSaved';
      }

      let address;
      for (const key in resData) {
        address = new Address(
          key,
          resData[key].street,
          resData[key].apartment,
          resData[key].city,
          resData[key].state,
          resData[key].zipcode,
        );
      }

      dispatch({
        type: SET_ADDRESS,
        address: address,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const updateAddress = (key, street, apartment, city, state, zipcode) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://equipmentrental-97ece.firebaseio.com/users/${userId}/address/${key}.json/?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          street,
          apartment,
          city,
          state,
          zipcode,
        }),
      },
    );
    if (!response.ok) {
      throw new Error('Something went wrong while updating address!');
    }

    dispatch(getUserAddress());
  };
};
