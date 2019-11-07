import React from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import EquipmentRentalNavigator from './navigation/EquipmentRentalNavigator';

import productReducer from './store/reducers/products';

const rootReducer = combineReducers({
  products: productReducer,
});

const store = createStore(rootReducer);

const App = () => {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <EquipmentRentalNavigator />
    </Provider>
  );
};

export default App;
