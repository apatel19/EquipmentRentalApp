import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import OrderItem from '../components/UI/OrderItem';

const OrdersHistoryScreenContainer = props => {
  const orders = useSelector(state => state.orders.orders);
  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

OrdersHistoryScreenContainer.navigationOptions = navData => {
  return {
    headerTitle: 'Orders',
  };
};

const styles = StyleSheet.create({});

export default OrdersHistoryScreenContainer;
