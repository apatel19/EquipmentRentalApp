import React from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import EquipmentRentalNavigator from './navigation/EquipmentRentalNavigator';

import productReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import orderReducers from './store/reducers/orders';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducers,
});

const store = createStore(rootReducer, composeWithDevTools());

const App = () => {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <EquipmentRentalNavigator />
    </Provider>
  );
};

export default App;
