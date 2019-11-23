import React from 'react';
import {ScrollView, FlatList, Platform} from 'react-native';
import AccountOptions from '../constants/Account';
import AccountList from '../components/UI/AccountList';

import {useSelector} from 'react-redux';

const AccountScreenContainer = props => {
  const user = useSelector(state => state.user.user);

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
    </ScrollView>
  );
};

AccountScreenContainer.navigationOptions = navData => {
  return {
    headerTitle: 'My Account',
  };
};

export default AccountScreenContainer;
