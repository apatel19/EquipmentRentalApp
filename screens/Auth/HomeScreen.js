import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

const HomeScreen = props => {
  const goTologin = () => {
    props.navigation.navigate('Login');
  };

  const goToRegistration = () => {
    props.navigation.navigate('Registration');
  };

  return (
    <View style={styles.screen}>
      <Text>This is Landing Page</Text>
      <Button title="Login" onPress={goTologin} />
      <Button title="Register" onPress={goToRegistration} />
    </View>
  );
};

HomeScreen.navigationOptions = {
  title: 'Equipment Rental',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
