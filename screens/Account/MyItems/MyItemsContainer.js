import React from 'react';
import {StyleSheet, Platform, FlatList, Button, Alert} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import ProductItem from '../../../components/UI/ProductItem';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../../components/UI/HeaderButton';

import Colors from '../../../constants/Colors';

import * as productActions from '../../../store/actions/products';

const MyItemsContainer = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();

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
});

export default MyItemsContainer;

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
