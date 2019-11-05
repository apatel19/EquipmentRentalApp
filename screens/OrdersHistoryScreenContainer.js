import React from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import Card from '../components/UI/Card';

const OrdersHistoryScreenContainer = props => {
  return (
    <View style={styles.screen}>
      <Card style={styles.card}>
        <Text>Order Number</Text>
        <Text>Name</Text>
        <Text>Price</Text>
        <Text>Returned Status</Text>
      </Card>

      <Button title="Reorder" onPress={() => Alert.alert('Reorder')} />
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
    margin: 20,
  },
  card: {
    height: 200,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OrdersHistoryScreenContainer;
