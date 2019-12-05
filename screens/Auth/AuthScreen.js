import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/Auth';
import * as setUserActions from '../../store/actions/userset';

const FORM_INPUT_UPDATE = 'UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };

    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const address = useReducer(state => state.user.address);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
      name: '',
    },
    inputValidities: {
      email: false,
      password: false,
      name: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  const authHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      if (isSignup) {
        await dispatch(
          authActions.signup(
            formState.inputValues.email,
            formState.inputValues.password,
          ),
        );
        //Here save use name and data to Database after creation
        await dispatch(
          setUserActions.setuser(
            formState.inputValues.name,
            formState.inputValues.email,
          ),
        );
        props.navigation.navigate({
          routeName: 'AuthAddress',
          params: {prevScreen: 'Auth'},
        });
      } else {
        await dispatch(
          authActions.login(
            formState.inputValues.email,
            formState.inputValues.password,
          ),
        );
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
      }
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, [dispatch, formState, address]);

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior="padding"
      keyboardVerticalOffset={50}>
      <LinearGradient colors={['#233329', '#63D471']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please entere a valid Email Address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={6}
              autoCapitalize="none"
              errorText="Please entere a valid Password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            {isSignup && (
              <Input
                id="name"
                label="Name"
                keyboardType="default"
                required
                autoCapitalize="none"
                minLength={1}
                errorText="Please entere a valid Name."
                onInputChange={inputChangeHandler}
                initialValue=""
              />
            )}
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={isSignup ? 'Sign Up' : 'Login'}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignup(prevState => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Equipment Rental',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    padding: 10,
    width: '85%',
    maxWidth: 400,
    maxHeight: 400,
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
