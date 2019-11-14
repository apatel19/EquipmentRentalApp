import React, {useEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import OrderItem from '../components/UI/OrderItem';
import * as ordersAction from '../store/actions/orders';

const OrdersHistoryScreenContainer = props => {
  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ordersAction.fetchOrders());
  }, [dispatch]);

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
