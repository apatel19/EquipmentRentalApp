import User from '../../models/user';

export const SET_USER = 'SET_USER';
export const GET_USER = 'GET_USER';

export const setuser = (name, email) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
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
        `https://equipmentrental-97ece.firebaseio.com/users/${userId}.json/`,
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
