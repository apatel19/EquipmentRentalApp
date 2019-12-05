import React, {useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  View,
  Button,
  Alert,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import ProductItem from '../components/UI/ProductItem';
import Colors from '../constants/Colors';
import HeaderButton from '../components/UI/HeaderButton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import * as cartActions from '../store/actions/cart';
import * as productActions from '../store/actions/products';

const SearchScreenContainer = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();
  const loadProducts = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadProducts,
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);

  const goToProductDetail = item => {
    props.navigation.navigate('ProductDetail', {
      productId: item.id,
      productTitle: item.title,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noProductText}>An error fetching data!</Text>
        <Button
          title="Try Again!"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noProductText}>No Products Found!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.imageUrl}
          time={itemData.item.time}
          onSelect={() => {
            goToProductDetail(itemData.item);
          }}>
          <Button
            color={Colors.primary}
            title="More Info."
            onPress={() => {
              goToProductDetail(itemData.item);
            }}
          />
          <Button
            color={Colors.primary}
            title="Add to Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
              Alert.alert('Added to cart');
            }}
          />
        </ProductItem>
      )}
    />
  );
};

SearchScreenContainer.navigationOptions = navData => {
  return {
    headerTitle: 'Search',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductText: {
    fontSize: 18,
    color: 'red',
  },
});

export default SearchScreenContainer;
