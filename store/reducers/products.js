import SEARCH_DATA from '../../data/dummy-data';
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from '../actions/products';
import Product from '../../models/product';

const initialState = {
  availableProducts: SEARCH_DATA,
  userProducts: SEARCH_DATA.filter(data => data.userId === 'u1'),
};

const trace = (label, value) => {
  console.log(label, value);
  return value;
};

export default (state = initialState, action) => {
  console.log('TYPE:', action.type);
  switch (action.type) {
    case CREATE_PRODUCT:
      const product = action.productData;
      const newProduct = new Product(
        new Date().toString(),
        'u1',
        product.title,
        product.imageUrl,
        'Apurva Patel',
        product.price,
        product.time,
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        prod => prod.id === action.pid,
      );
      trace('ProductIndex: ', productIndex);
      trace('ActualProduct: ', state.userProducts[productIndex]);
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].userId,
        action.productData.title,
        action.productData.imageUrl,
        state.userProducts[productIndex].ownerName,
        trace('Not Updating price: ', state.userProducts[productIndex].price),
        action.productData.time,
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;

      const availableProductIndex = state.availableProducts.findIndex(
        prod => prod.id === action.pid,
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          product => product.id !== action.pid,
        ),
        availableProducts: state.availableProducts.filter(
          product => product.id !== action.pid,
        ),
      };
  }
  return state;
};
