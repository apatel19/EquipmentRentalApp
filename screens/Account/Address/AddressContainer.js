import React, {useReducer, useState, useCallback, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Input from '../../../components/UI/Input';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../../components/UI/HeaderButton';
import Colors from '../../../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import * as usersetActions from '../../../store/actions/userset';

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

const AddressContainer = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const prevScreen = props.navigation.state.params.prevScreen;
  const isAuthFlow = prevScreen === 'Auth' ? true : false;

  const address = useSelector(state => state.user.address);

  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      street: isAuthFlow ? '' : address.street,
      apartment: isAuthFlow ? '' : address.apartment,
      city: isAuthFlow ? '' : address.city,
      state: isAuthFlow ? '' : address.state,
      zipcode: isAuthFlow ? '' : address.zipcode,
    },
    inputValidities: {
      street: isAuthFlow ? false : true,
      apartment: isAuthFlow ? false : true,
      city: isAuthFlow ? false : true,
      state: isAuthFlow ? false : true,
      zipcode: isAuthFlow ? false : true,
    },
    formIsValid: isAuthFlow ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured!', error, [{text: 'OK'}]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong Input!', 'Please check the error in the form.', [
        {
          text: 'Ok',
        },
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (isAuthFlow) {
        await dispatch(
          usersetActions.setUserAddress(
            formState.inputValues.street,
            formState.inputValues.apartment,
            formState.inputValues.city,
            formState.inputValues.state,
            formState.inputValues.zipcode,
          ),
        );
        props.navigation.navigate('Search');
      } else {
        await dispatch(
          usersetActions.updateAddress(
            address.id,
            formState.inputValues.street,
            formState.inputValues.apartment,
            formState.inputValues.city,
            formState.inputValues.state,
            formState.inputValues.zipcode,
          ),
        );
        props.navigation.goBack();
      }
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, formState]);

  useEffect(() => {
    props.navigation.setParams({submit: submitHandler});
  }, [submitHandler]);

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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="padding"
      keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="street"
            label="Street"
            errorText="Please enter a valid street."
            keyboardType="default"
            autoCapitalize="words"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={isAuthFlow ? '' : address.street}
            initiallyValid={true}
            required
          />
          <Input
            id="apartment"
            label="Apartments"
            errorText="Please enter a valid apartment."
            keyboardType="default"
            placeholder="optional"
            autoCapitalize="none"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={isAuthFlow ? '' : address.apartment}
            initiallyValid={true}
          />
          <Input
            id="city"
            label="City"
            errorText="Please enter a valid city."
            keyboardType="default"
            autoCapitalize="none"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={isAuthFlow ? '' : address.city}
            initiallyValid={true}
            required
          />
          <Input
            id="state"
            label="State"
            errorText="Please enter a valid state."
            keyboardType="default"
            autoCapitalize="none"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={isAuthFlow ? '' : address.state}
            initiallyValid={true}
            required
          />
          <Input
            id="zipcode"
            label="Zipcode"
            errorText="Please enter a valid zipcode."
            keyboardType="number-pad"
            autoCapitalize="none"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={isAuthFlow ? '' : address.zipcode}
            initiallyValid={true}
            required
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

AddressContainer.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');

  return {
    headerTitle: 'Add Address',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === 'android'
              ? 'md-checkmark-circle'
              : 'ios-checkmark-circle'
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});

export default AddressContainer;
