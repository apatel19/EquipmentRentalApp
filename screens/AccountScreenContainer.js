import React from 'react';
import {ScrollView, FlatList, StyleSheet, Button} from 'react-native';
import AccountOptions from '../constants/Account';
import AccountList from '../components/UI/AccountList';

const AccountScreenContainer = props => {
  console.log(props);
  return (
    <ScrollView>
      <FlatList
        data={AccountOptions}
        keyExtractor={option => option.id}
        renderItem={option => (
          <AccountList
            title={option.item.name}
            subtitle={option.item.id === 'accountDetails' ? true : false}
            subtitleText={
              option.item.id === 'accountDetails' ? 'test@gmail.com' : ''
            }
            iconName={option.item.icon}
            onPress={() => {
              props.navigation.navigate(option.item.screen);
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

const styles = StyleSheet.create({});

export default AccountScreenContainer;
