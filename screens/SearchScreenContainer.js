import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SearchScreenContainer = props => {
  return (
    <View style={styles.screen}>
      <Text>This is search screen!</Text>
    </View>
  );
};

SearchScreenContainer.navigationOptions = navData => {
  return {
    headerTitle: 'Search',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchScreenContainer;
