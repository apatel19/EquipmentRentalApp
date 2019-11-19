export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password, name) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDQeyuI-UBA9Q7a4YgZWCT0k_Gfok0S460',
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

    // await fetch(
    //   `https://equipmentrental-97ece.firebaseio.com/users/${resData.localId}.json?auth=${resData.idToken}`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       email: email,
    //       name: name,
    //       userId: resData.localId,
    //     }),
    //   },
    // );

    dispatch({
      type: SIGNUP,
      token: resData.idToken,
      userId: resData.localId,
      // email: email,
      // name: name,
    });
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

    console.log(resData);

    // await fetch(
    //   `https://equipmentrental-97ece.firebaseio.com/users/${resData.localId}.json?auth=${resData.idToken}`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       email: email,
    //       name: name,
    //       userId: resData.localId,
    //     }),
    //   },
    // );

    dispatch({
      type: LOGIN,
      token: resData.idToken,
      userId: resData.localId,
      // email: email,
      // name: name,
    });
  };
};
