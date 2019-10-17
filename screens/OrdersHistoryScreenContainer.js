import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const OrdersHistoryScreenContainer = props => {
  return (
    <View style={styles.screen}>
      <Text>order history - screen</Text>
    </View>
  );
};

OrdersHistoryScreenContainer.navigationOptions = navData => {
  return {
    headerTitle: 'Search',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrdersHistoryScreenContainer;
