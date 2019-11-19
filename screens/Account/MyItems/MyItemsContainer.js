import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  FlatList,
  Button,
  Alert,
  ActivityIndicator,
  Text,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import ProductItem from '../../../components/UI/ProductItem';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../../components/UI/HeaderButton';

import Colors from '../../../constants/Colors';

import * as productActions from '../../../store/actions/products';

const MyItemsContainer = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const loadUserProducts = useCallback(async () => {
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
      loadUserProducts,
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadUserProducts]);

  useEffect(() => {
    loadUserProducts();
  }, [dispatch, loadUserProducts]);

  const goToEditProduct = productId => {
    props.navigation.navigate('AddItem', {
      productId: productId,
    });
  };

  const deleteHandler = itemId => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      {text: 'No', style: 'default'},
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productActions.deleteProduct(itemId));
        },
      },
    ]);
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noProductText}>An error fetching data!</Text>
        <Button
          title="Try Again!"
          onPress={loadUserProducts}
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

  if (!isLoading && userProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noProductText}>No Products Found!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          time={itemData.item.time}
          onSelect={() => {
            goToEditProduct(itemData.item.id);
          }}>
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              goToEditProduct(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              deleteHandler(itemData.item.id);
            }}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
  },
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

MyItemsContainer.navigationOptions = navData => {
  return {
    headerTitle: 'MyItems',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={
            Platform.OS === 'android' ? 'md-add-circle' : 'ios-add-circle'
          }
          onPress={() => {
            navData.navigation.navigate('AddItem');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default MyItemsContainer;
