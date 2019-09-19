import React from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

import SearchScreenContainer from '../screens/SearchScreenContainer';
import FavoriteScreenContainer from '../screens/FavoriteScreenContainer';

const defaultStackOption = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
};

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: SearchScreenContainer,
  },
});

const FavoriteStackNavigator = createStackNavigator({
  Favorite: FavoriteScreenContainer,
});

const EquipmentRentalNavigator = createBottomTabNavigator({
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
});

export default createAppContainer(EquipmentRentalNavigator);
