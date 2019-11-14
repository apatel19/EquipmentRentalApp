import React from 'react';
import {ScrollView, Text, Image, StyleSheet, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId),
  );

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
      <Button
        title="Add to cart"
        onPress={() => {
          dispatch(cartActions.addToCart(selectedProduct));
        }}
      />
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle'),
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default ProductDetailScreen;
