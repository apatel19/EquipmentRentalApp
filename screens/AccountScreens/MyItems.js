import React from 'react';
import {FlatList, Button} from 'react-native';

import {USER_ITEMS_DATA} from '../../data/dummy-data';
import ProductItem from '../../components/UI/ProductItem';
import Colors from '../../constants/Colors';

const MyItemsContainer = props => {
    return (
        <FlatList
            data={USER_ITEMS_DATA}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                onViewDetail={() => {}}
                onRemove={() => {}}
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
                    color={Colors.warningRed}
                    title="Remove"
                    onPress={() => onRemove()}
                />
                </ProductItem>
            )}
        />
    );
};

MyItemsContainer.navigateOptions = {
    Title: 'MyItems',
};

MyItemsContainer.navigationOptions = navData => {
  return {
    headerTitle: 'My Items',
  };
};

// const styles = styles = StyleSheet.create({});

export default MyItemsContainer;
