import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, AsyncStorage} from 'react-native';
import Color from '../constants/Colors';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/Auth';
import * as setUserActions from '../store/actions/userset';

const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.navigate('Auth');
        return;
      }
      const transformedData = JSON.parse(userData);
      const {token, userId, expiryDate} = transformedData;

      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate('Auth');
        return;
      }

      dispatch(authActions.authenticate(userId, token));

      await dispatch(setUserActions.getUser());
      const res = await dispatch(setUserActions.getUserAddress());
      if (res === 'AddressNotSaved') {
        props.navigation.navigate({
          routeName: 'AuthAddress',
          params: {prevScreen: 'Auth'},
        });
      } else {
        props.navigation.navigate('Search');
      }
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Color.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;
