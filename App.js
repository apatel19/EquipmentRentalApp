import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import NavigationContainer from './navigation/NavigationContainer';

import productReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import orderReducers from './store/reducers/orders';
import authReducer from './store/reducers/Auth';
import userReducer from './store/reducers/userset';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducers,
  auth: authReducer,
  user: userReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(),
  applyMiddleware(ReduxThunk),
);

const App = () => {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
};

export default App;
