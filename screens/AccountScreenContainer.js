import React from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import { SafeAreaView } from 'react-navigation';

const AccountScreenContainer = props => {
  return (
    <SafeAreaView style={styles.screen}>
      <View>
        <Text>Here's where account details will show up!</Text>
      
        <View style={styles.fixToText}>
          <Button
              title="change password"
              onPress={() => Alert.alert('nice work')}
            />
          <Button
            title="preferences"
            onPress={() => Alert.alert('nice work')}
          />
        </View>
        <View style={styles.fixToText}>
          <Button
              title="List an item"
              onPress={() => Alert.alert('nice work')}
            />
          <Button
            title="My items"
            onPress={() => Alert.alert('nice work')}
          />
        </View>
        <View style={styles.fixToText}>
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
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 1,
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffff00',
  }
});

export default AccountScreenContainer;
