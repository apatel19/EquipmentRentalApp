import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const FavoriteScreenContainer = props => {
  return (
    <View style={styles.screen}>
      <Text> You don't have any favorites yet :( </Text>
    </View>
  );
};

FavoriteScreenContainer.navigationOptions = navData => {
  return {
    headerTitle: 'Favorite',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavoriteScreenContainer;
