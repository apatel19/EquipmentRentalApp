import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

const RegistrationScreen = props => {
  const goTologin = () => {
    props.navigation.navigate('Login');
  };

  return (
    <View style={styles.screen}>
      <Text>This is RegistrationScreen</Text>
      <Button title="Login" onPress={goTologin} />
    </View>
  );
};

RegistrationScreen.navigationOptions = {
  title: 'Register',
};

const styles = StyleSheet.create({
  screen: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default RegistrationScreen;
