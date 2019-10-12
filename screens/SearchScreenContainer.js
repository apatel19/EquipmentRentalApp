import React from 'react';
import {FlatList, Button} from 'react-native';
import {SEARCH_DATA} from '../data/dummy-data';
import ProductItem from '../components/UI/ProductItem';
import Colors from '../constants/Colors';

const SearchScreenContainer = props => {
  return (
    <FlatList
      data={SEARCH_DATA}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          onViewDetail={() => {}}
          onAddToCart={() => {}}
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.imageUrl}
          onSelect={() => {}}>
          <Button
            color={Colors.primary}
            title="More Info."
            onPress={() => {}}
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
  };
};

export default SearchScreenContainer;
