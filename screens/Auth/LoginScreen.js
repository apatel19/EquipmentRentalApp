import React from 'react';
import {View, StyleSheet, Button, TextInput} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = props => {
  const goToSearch = () => {
    props.navigation.navigate('Search');
  };

  const goToRegistration = () => {
    props.navigation.navigate('Registration');
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      enableAutomaticScroll={Platform.OS === 'ios'}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.logInForm}>
        <View style={styles.inputContainer}>
          <TextInput
            keyboardType="email-address"
            title="name"
            placeholder="Email"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            secureTextEntry={true}
            title="name"
            placeholder="Password"
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.logIn}>
          <Button title="Login" onPress={goToSearch} />
        </View>
        <View style={styles.register}>
          <Button title="Register" onPress={goToRegistration} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

LoginScreen.navigationOptions = {
  title: 'Log In',
};

const styles = StyleSheet.create({
  logInForm: {
    height: '50%',
    margin: 20,
  },
  inputContainer: {
    height: '16%',
    borderBottomWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  logIn: {
    width: '35%',
    margin: 5,
  },
  register: {
    width: '25%',
    margin: 5,
  },
});

export default LoginScreen;
