import React, {useReducer, useState, useCallback, useEffect} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Input from '../../../components/UI/Input';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../../components/UI/HeaderButton';
import Colors from '../../../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import * as paymentCardActions from '../../../store/actions/paymentCard';

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

const PaymentContainer = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  let paymentCard = useSelector(state => state.user.paymentCard);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      cardNumber: paymentCard ? paymentCard.cardNumber : '',
      expiration: paymentCard ? paymentCard.expiration : '',
      securityCode: paymentCard ? paymentCard.securityCode : '',
      zipcode: paymentCard ? paymentCard.zipcode : '',
    },
    inputValidities: {
      cardNumber: paymentCard ? true : false,
      expiration: paymentCard ? true : false,
      securityCode: paymentCard ? true : false,
      zipcode: paymentCard ? true : false,
    },
    formIsValid: paymentCard ? true : false,
  });

  const loadPaymentCard = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await dispatch(paymentCardActions.getPaymentCard());
      if (res === 'PaymentCardNotSaved') {
        paymentCard = false;
      } else {
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadPaymentCard,
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadPaymentCard]);

  useEffect(() => {
    loadPaymentCard();
  }, [dispatch, loadPaymentCard]);

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
      if (paymentCard) {
        dispatch(
          paymentCardActions.updatePaymentCard(
            paymentCard.id,
            formState.inputValues.cardNumber,
            formState.inputValues.expiration,
            formState.inputValues.securityCode,
            formState.inputValues.zipcode,
          ),
        );
      } else {
        dispatch(
          paymentCardActions.setPaymentCard(
            formState.inputValues.cardNumber,
            formState.inputValues.expiration,
            formState.inputValues.securityCode,
            formState.inputValues.zipcode,
          ),
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [formState]);

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
            id="cardNumber"
            label="Card Number"
            errorText="Please enter a valid Card Number."
            keyboardType="number-pad"
            autoCapitalize="none"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={paymentCard ? paymentCard.cardnumber : ''}
            initiallyValid={true}
            required
          />
          <Input
            id="expiration"
            label="Expiration"
            errorText="Please enter a valid Expiration."
            keyboardType="number-pad"
            autoCapitalize="none"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={paymentCard ? paymentCard.expiration : ''}
            initiallyValid={true}
          />
          <Input
            id="securityCode"
            label="Security Code"
            errorText="Please enter a valid Security Code."
            keyboardType="number-pad"
            autoCapitalize="none"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={paymentCard ? paymentCard.securityCode : ''}
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
            initialValue={paymentCard ? paymentCard.zipcode : ''}
            initiallyValid={true}
            required
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

PaymentContainer.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');

  return {
    headerTitle: 'Add Card',
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

export default PaymentContainer;
