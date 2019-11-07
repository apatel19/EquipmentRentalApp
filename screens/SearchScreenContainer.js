import React from 'react';
import {FlatList, Button} from 'react-native';

import {useSelector} from 'react-redux';

import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {HeaderButton} from 'react-navigation-header-buttons';

import ProductItem from '../components/UI/ProductItem';
import Colors from '../constants/Colors';

const SearchScreenContainer = props => {
  const products = useSelector(state => state.products.availableProducts);

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
          onViewDetail={() => {}}
          onAddToCart={() => {}}
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.imageUrl}
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
            onPress={() => {}}
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
        <Item title="Cart" onPress={() => {}} />
      </HeaderButtons>
    ),
  };
};

export default SearchScreenContainer;
