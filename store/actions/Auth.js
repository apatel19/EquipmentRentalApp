import {REACT_NATIVE_APP_GOOGLE_API_KEY} from 'react-native-dotenv';

import {AsyncStorage} from 'react-native';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';

export const authenticate = (userId, token) => {
  return {type: AUTHENTICATE, userId: userId, token: token};
};

export const signup = (email, password, name) => {
  return async dispatch => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${REACT_NATIVE_APP_GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      },
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong while signing in.';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already.';
      }
      throw new Error(message);
    }

    const resData = await response.json();

    dispatch({
      type: SIGNUP,
      token: resData.idToken,
      userId: resData.localId,
    });
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000,
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDQeyuI-UBA9Q7a4YgZWCT0k_Gfok0S460',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      },
    );
    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong while signing in.';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found.';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This passcode is not valid.';
      }
      throw new Error(message);
    }

    const resData = await response.json();

    dispatch({
      type: LOGIN,
      token: resData.idToken,
      userId: resData.localId,
    });
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000,
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    }),
  );
};
