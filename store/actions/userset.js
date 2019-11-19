export const SET_USER = 'SET_USER';

export const setuser = (name, email, token) => {
  return async dispatch => {
    //const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://equipmentrental-97ece.firebaseio.com/users/${userId}.json/?auth=${token}`,
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

    dispatch({
      type: SET_USER,
      user: {
        email: email,
        name: name,
        ownerId: userId,
      },
    });
  };
};
