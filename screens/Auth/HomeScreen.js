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
    <View>
      <View style={styles.logoContainer}>
        <Text style={styles.appName}>Equipment Rental</Text>
        <Text style={styles.subText}>making renting equipments easy.</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Button style={styles.login} title="Login" onPress={goTologin} />
        </View>
        <View style={styles.button}>
          <Button title="Register" onPress={goToRegistration} />
        </View>
        <View>
          <Button title="by registering i accept the ToU." />
        </View>
      </View>
    </View>
  );
};

HomeScreen.navigationOptions = {
  title: 'Equipment Rental',
};

const styles = StyleSheet.create({
  logoContainer: {
    height: '70%',
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'green',
  },
  subText: {
    fontSize: 20,
    fontWeight: 'normal',
    color: 'gray',
  },
  buttonsContainer: {
    height: '30%',
    width: '100%',
    borderColor: 'red',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: '16%',
    width: '45%',
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
  },
});

export default HomeScreen;
