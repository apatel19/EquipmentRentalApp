import React from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Colors from '../constants/Colors.js'

const AccountScreenContainer = props => {
  return (
    <SafeAreaView style={styles.screen}>
      <View>
        <Text>Here's where account details will show up!</Text>
      
        <View style={styles.row}>
          <Button
              title="change password"
              onPress={() => Alert.alert('nice work')}
            />
          <Button
            title="preferences"
            onPress={() => Alert.alert('nice work')}
          />
        </View>
        <View style={styles.row}>
          <Button
              title="List an item"
              style={styles.col_lg}
              onPress={() => Alert.alert('nice work')}
            />
          <Button
            title="My items"
            style={styles.col_sm}
            onPress={() => Alert.alert('nice work')}
          />
        </View>
        <View style={styles.row}>
          <Button
              title="My orders"
              onPress={() => Alert.alert('nice work')}
            />
          <Button
            title="Contact support"
            onPress={() => Alert.alert('nice work')}
          />
        </View>
        <View style={styles.bottom}>
          <Button
            title="Logout"
            onPress={() =>Alert.alert('redirecting')}
            />
          <Text>App version 0.0.2</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

AccountScreenContainer.navigationOptions = navData => {
  return {
    headerTitle: 'My Account',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 1,
  },
  col_lg: {
    flex: 2,
    flexDirection: 'column',
    color: Colors.lightGray,
  },
  col_sm: {
    flex: 1,
    flexDirection: 'column',
    color: Colors.darkGray,
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.warningRed,
  }
});

export default AccountScreenContainer;
