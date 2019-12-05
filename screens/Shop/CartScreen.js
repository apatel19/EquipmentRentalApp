import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import CartItem from '../../components/UI/CartItem';

import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';
import * as paymentCardActions from '../../store/actions/paymentCard';
import Colors from '../../constants/Colors';

const CartScreen = props => {
  const [isLoading, setIsLoading] = useState(false);

  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const dispatch = useDispatch();

  let paymentCard = useSelector(state => state.user.paymentCard);

  const loadPaymentCard = useCallback(async () => {
    try {
      const res = await dispatch(paymentCardActions.getPaymentCard());
      if (res === 'PaymentCardNotSaved') {
        paymentCard = false;
      } else {
      }
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadPaymentCard,
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadPaymentCard]);

  useEffect(() => {
    loadPaymentCard();
  }, [dispatch, loadPaymentCard]);

  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems;
  });

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  const trace = (label, value) => {
    console.log(label, value);
    return value;
  };

  return (
    <View>
      <View>
        <Text>
          Total: <Text>${cartTotalAmount}</Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
            title="Order Now"
            disabled={cartItems.length === 0 && paymentCard === false}
            onPress={sendOrderHandler}
          />
        )}
      </View>
      <View>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.productId}
          renderItem={itemData => (
            <CartItem
              quantity={itemData.item.quantity}
              title={itemData.item.productTitle}
              amount={itemData.item.sum}
              deletable
              onRemove={() => {
                dispatch(cartActions.removeFromCart(itemData.item.productId));
              }}
            />
          )}
        />
        {cartItems.length !== 0 &&
          (paymentCard ? (
            <View style={styles.paymentCardContainer}>
              <Text>Payment Card</Text>
              <View style={styles.paymentCardDetailContainer}>
                <Text>Cardnumber</Text>
                <Text>{paymentCard.cardnumber}</Text>
                <Text>Expiration</Text>
                <Text>{paymentCard.expiration}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.paymentCardContainer}>
              <Text> No Payment card found!</Text>
              <Text> Go to account screen to add paymentcard!</Text>
            </View>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paymentCardContainer: {
    margin: 10,
    alignContent: 'flex-start',
  },
  paymentCardDetailContainer: {
    margin: 5,
  },
});

export default CartScreen;
