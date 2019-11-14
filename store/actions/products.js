import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async dispatch => {
    //any async code we want!
    try {
      const response = await fetch(
        'https://equipmentrental-97ece.firebaseio.com/products.json',
      );

      if (!response.ok) {
        throw new Error('Someting went wrong in fetchProduct');
      }

      const resData = await response.json();
      //console.log(resData);
      const loadedProduct = [];

      for (const key in resData) {
        loadedProduct.push(
          new Product(
            key,
            'u1',
            resData[key].title,
            resData[key].imageUrl,
            'Apurva Patel',
            resData[key].price,
            resData[key].time,
          ),
        );
      }

      dispatch({type: SET_PRODUCTS, products: loadedProduct});
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = productId => {
  return async dispatch => {
    const response = await fetch(
      `https://equipmentrental-97ece.firebaseio.com/products/${productId}.json`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error('Something went wrong inside deleteOrder!');
    }

    dispatch({
      type: DELETE_PRODUCT,
      pid: productId,
    });
  };
};

export const createProduct = (title, imageUrl, price, time) => {
  return async dispatch => {
    //any async code we want!
    const response = await fetch(
      'https://equipmentrental-97ece.firebaseio.com/products.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          imageUrl,
          price,
          time,
        }),
      },
    );

    const resData = await response.json();

    // console.log(resData);

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        imageUrl,
        price,
        time,
      },
    });
  };
};

export const updateProduct = (id, title, imageUrl, time) => {
  return async dispatch => {
    const response = await fetch(
      `https://equipmentrental-97ece.firebaseio.com/products/${id}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          imageUrl,
          time,
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Something went wrong inside updateOrder!');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        imageUrl,
        time,
      },
    });
  };
};
