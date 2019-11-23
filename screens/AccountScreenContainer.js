import React from 'react';
import {
  ScrollView,
  FlatList,
  Platform,
  Button,
  View,
  StyleSheet,
} from 'react-native';
import AccountOptions from '../constants/Account';
import AccountList from '../components/UI/AccountList';

import {useSelector, useDispatch} from 'react-redux';

import * as authActions from '../store/actions/Auth';

const AccountScreenContainer = props => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <FlatList
        data={AccountOptions}
        keyExtractor={option => option.id}
        renderItem={option => (
          <AccountList
            title={option.item.name}
            subtitle={option.item.id === 'accountDetails' ? true : false}
            subtitleText={option.item.id === 'accountDetails' ? user.email : ''}
            iconName={
              Platform.OS === 'android'
                ? `md-${option.item.icon}`
                : `ios-${option.item.icon}`
            }
            onPress={() => {
              props.navigation.navigate({
                routeName: option.item.screen,
                params: {prevScreen: 'AccountScreenContainer'},
              });
            }}
          />
        )}
      />
      <View style={styles.logoutButtonContainer}>
        <Button
          color="red"
          style={styles.logoutButton}
          title="Logout"
          onPress={() => {
            dispatch(authActions.logout());
          }}
        />
      </View>
    </ScrollView>
  );
};

AccountScreenContainer.navigationOptions = navData => {
  return {
    headerTitle: 'My Account',
  };
};

const styles = StyleSheet.create({
  logoutButtonContainer: {
    width: '70%',
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  logoutButton: {
    width: '100%',
    height: '100%',
  },
});

export default AccountScreenContainer;
