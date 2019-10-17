import React from 'react';
import {View, StyleSheet, Button, TextInput} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const RegistrationScreen = props => {
  const goTologin = () => {
    props.navigation.navigate('Login');
  };

  const goToHome = () => {
    props.navigation.navigate('Search');
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      enableAutomaticScroll={Platform.OS === 'ios'}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput keyboardType="default" title="name" placeholder="Name" />
        </View>
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
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            title="name"
            placeholder="Confirm Password"
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.register}>
          <Button title="Register" onPress={goToHome} />
        </View>
        <View style={styles.back}>
          <Button title="back" onPress={goTologin} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

RegistrationScreen.navigationOptions = {
  title: 'Register',
};

const styles = StyleSheet.create({
  formContainer: {
    height: '50%',
    margin: 20,
  },
  inputContainer: {
    height: '16%',
    borderBottomWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
  },
  input: {
    height: '100%',
    width: '100%',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  register: {
    width: '35%',
    margin: 5,
  },
  back: {
    width: '25%',
    margin: 5,
  },
});

export default RegistrationScreen;
