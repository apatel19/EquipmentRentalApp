import React from 'react';
import {FlatList, Button, Platform} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import ProductItem from '../components/UI/ProductItem';
import Colors from '../constants/Colors';
import HeaderButton from '../components/UI/HeaderButton';
import * as cartActions from '../store/actions/cart';

const SearchScreenContainer = props => {
  const products = useSelector(state => state.products.availableProducts);
  const disptach = useDispatch();
  const goToProductDetail = item => {
    props.navigation.navigate('ProductDetail', {
      productId: item.id,
      productTitle: item.title,
    });
  };

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
              disptach(cartActions.addToCart(itemData.item));
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

export default SearchScreenContainer;
