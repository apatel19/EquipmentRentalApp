import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AccountScreenContainer = props => {
  return (
    <View style={styles.screen}>
      <Text>Here's where account details will show up!</Text>
    </View>
  );
};

AccountScreenContainer.navigationOptions = navData => {
  return {
    headerTitle: 'Account',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AccountScreenContainer;
