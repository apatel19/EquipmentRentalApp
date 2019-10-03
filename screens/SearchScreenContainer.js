import React from 'react';
import {View, Text, StyleSheet, FlatList, ImageBackground} from 'react-native';
import {SEARCH_DATA} from '../data/dummy-data';

const SearchScreenContainer = props => {
  return (
    <View>
      <FlatList
        data={SEARCH_DATA}
        keyExtractor={(item, index) => item.id}
        renderItem={itemData => (
          <View style={styles.card}>
            <View>
              <Text>{itemData.item.itemName}</Text>
            </View>
            <View style={styles.imageContainer}>
              <ImageBackground
                style={styles.image}
                source={{uri: itemData.item.imageUrl}}
              />
            </View>
            <View style={styles.discription}>
              <Text>{itemData.item.price}</Text>
              <Text>{itemData.item.time}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

SearchScreenContainer.navigationOptions = navData => {
  return {
    headerTitle: 'Search',
  };
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    height: 100,
    width: '100%',
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  imageContainer: {},
  image: {
    width: 100,
    height: 100,
  },
  discription: {},
});

export default SearchScreenContainer;
