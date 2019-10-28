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
import FavoriteScreenContainer from '../screens/FavoriteScreenContainer';
import AccountScreenContainer from '../screens/AccountScreenContainer';
import OrdersHistoryScreenContainer from '../screens/OrdersHistoryScreenContainer';

import DummyScreenContainer from '../screens/dummyScreen';
import SupportScreenContainer from '../screens/AccountScreens/SupportScreen'
import ChangePasswordContainer from '../screens/AccountScreens/ChangePW';

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
  Search: {
    screen: SearchScreenContainer,
  },
});
const OrdersStackNavigator = createStackNavigator({
  Orders: OrdersHistoryScreenContainer,
});

const FavoriteStackNavigator = createStackNavigator({
  Favorite: FavoriteScreenContainer,
});

const AccountStackNavigator = createStackNavigator({
  Account: AccountScreenContainer,
  Support: SupportScreenContainer,
  ChangePassword: ChangePasswordContainer,
  Dummy: DummyScreenContainer,
});

const EquipmentRentalNavigator = createBottomTabNavigator({
  Account: {
    screen: AccountStackNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return Platform.OS === 'android' ? (
          <Icon name="md-settings" size={25} color={tabInfo.tintColor} />
        ) : (
          <Icon name="ios-settings" size={25} color={tabInfo.tintColor} />
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
    Auth: AuthNavigator,
    Main: EquipmentRentalNavigator,
  },
  {
    initialRouteName: 'Auth',
  },
);

export default createAppContainer(mainNavigator);
