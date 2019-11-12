import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

import LoginScreen from '../screens/Auth/LoginScreen';
import RegistrationScreen from '../screens/Auth/RegistrationScreen';
import HomeScreen from '../screens/Auth/HomeScreen';

import SearchScreenContainer from '../screens/SearchScreenContainer';
import ProductDetailScreen from '../screens/Shop/ProductDetailScreen';
import CartScreen from '../screens/Shop/CartScreen';
import FavoriteScreenContainer from '../screens/FavoriteScreenContainer';
import AccountScreenContainer from '../screens/AccountScreenContainer';
import OrdersHistoryScreenContainer from '../screens/OrdersHistoryScreenContainer';

//Account Option Screens
import AccountDetailContainer from '../screens/Account/AccountDetail/AccountDetailContainer';
import AddressContainer from '../screens/Account/Address/AddressContainer';
import HelpContainer from '../screens/Account/Help/HelpContainer';
import MyItemsContainer from '../screens/Account/MyItems/MyItemsContainer';
import PaymentContainer from '../screens/Account/Payments/PaymentContainer';
import AddItem from '../screens/Account/MyItems/AddItem';

const defaultStackOption = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
};

const AuthNavigator = createStackNavigator({
  Home: HomeScreen,
  Login: LoginScreen,
  Registration: RegistrationScreen,
});

const SearchStackNavigator = createStackNavigator({
  Search: SearchScreenContainer,
  ProductDetail: ProductDetailScreen,
  Cart: CartScreen,
});
const OrdersStackNavigator = createStackNavigator({
  Orders: OrdersHistoryScreenContainer,
});

const FavoriteStackNavigator = createStackNavigator({
  Favorite: FavoriteScreenContainer,
});

const AccountStackNavigator = createStackNavigator({
  Account: AccountScreenContainer,
  AccountDetail: AccountDetailContainer,
  Address: AddressContainer,
  Payment: PaymentContainer,
  MyItems: MyItemsContainer,
  AddItem: AddItem,
  Help: HelpContainer,
});

const EquipmentRentalNavigator = createBottomTabNavigator({
  Account: {
    screen: AccountStackNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return Platform.OS === 'android' ? (
          <Icon name="md-person" size={27} color={tabInfo.tintColor} />
        ) : (
          <Icon name="ios-person" size={27} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
    },
  },
  Search: {
    screen: SearchStackNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return Platform.OS === 'android' ? (
          <Icon name="md-search" size={25} color={tabInfo.tintColor} />
        ) : (
          <Icon name="ios-search" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
    },
  },
  Favorite: {
    screen: FavoriteStackNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return Platform.OS === 'android' ? (
          <Icon name="md-heart" size={25} color={tabInfo.tintColor} />
        ) : (
          <Icon name="ios-heart" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
    },
  },
  Orders: {
    screen: OrdersStackNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return Platform.OS === 'android' ? (
          <Icon name="md-reorder" size={25} color={tabInfo.tintColor} />
        ) : (
          <Icon name="ios-reorder" size={25} color={tabInfo.tintColor} />
        );
      },
    },
  },
});

const mainNavigator = createSwitchNavigator(
  {
    //Auth: AuthNavigator,
    Main: EquipmentRentalNavigator,
  },
  {
    //initialRouteName: 'Auth',
  },
);

export default createAppContainer(mainNavigator);
