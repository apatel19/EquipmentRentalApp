import React from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Colors from '../constants/Colors.js'

const DummyScreenContainer = props => {
  return (
    <SafeAreaView style={styles.screen}>
      <View>
        <Text>Here's where account details will show up!</Text>
      </View>
    </SafeAreaView>
  );
};


DummyScreenContainer.navigationOptions = {
    title: 'Dummy',
  };
// DummyScreenContainer.navigationOptions = navData => {
//     const Title = navData.navigation.getParam(Title);
//   return {
//     headerTitle: Title,
//   };
// };

const styles = StyleSheet.create({
    screen: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    }
});

export default DummyScreenContainer;
