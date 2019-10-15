import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

const LoginScreen = props => {
  const goToHome = () => {
    props.navigation.navigate('Search');
  };

  return (
    <View style={styles.screen}>
      <Text>This is loginScreen</Text>
      <Button title="Home" onPress={goToHome} />
    </View>
  );
};

LoginScreen.navigationOptions = {
  title: 'Log In',
};

const styles = StyleSheet.create({
  screen: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default LoginScreen;
