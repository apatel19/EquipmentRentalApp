import React, {useState, useEffect, useCallback, useReducer} from 'react';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
  Button,
  Text,
} from 'react-native';
import Input from '../../../components/UI/Input';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../../components/UI/HeaderButton';
import {useSelector, useDispatch} from 'react-redux';
import * as productsActions from '../../../store/actions/products';
import Colors from '../../../constants/Colors';
import ImagePicker from '../../../constants/ImagePicker';

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

const AddItem = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [image1, setImage1] = useState();

  const prodId = props.navigation.getParam('productId');

  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId),
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      //imageUrl: editedProduct ? editedProduct.imageUrl : '',
      price: '',
      time: editedProduct ? editedProduct.time : '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      //imageUrl: editedProduct ? true : false,
      price: editedProduct ? true : false,
      time: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured!', error, [{text: 'OK'}]);
    }
  }, [error]);

  const pickImageHandler = () => {
    ImagePicker.showImagePicker({title: 'Select Image', quality: 0.3}, res => {
      if (res.didCancel) {
        console.log('User Canceled!');
      } else if (res.error) {
        console.log('Handler Error!', res.error);
      } else {
        setImage1(`data:image/png;base64,${res.data}`);
      }
    });
  };

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong Input!', 'Please check the error in the form.', [
        {
          text: 'Ok',
        },
      ]);
      return;
    }

    console.log(image1);

    setError(null);
    setIsLoading(true);
    try {
      if (editedProduct) {
        await dispatch(
          productsActions.updateProduct(
            prodId,
            formState.inputValues.title,
            image1,
            //formState.inputValues.imageUrl,
            formState.inputValues.time,
          ),
        );
      } else {
        await dispatch(
          productsActions.createProduct(
            formState.inputValues.title,
            image1,
            +formState.inputValues.price,
            formState.inputValues.time,
          ),
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, prodId, formState, image1]);

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
            id="title"
            label="Title"
            errorText="Please enter a valid title."
            keyboardType="default"
            autoCapitalize="sentences"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price."
              keyboardType="decimal-pad"
              onInputChange={inputChangeHandler}
              returnKeyType="next"
              required
              min={0.1}
            />
          )}
          <Input
            id="time"
            label="Time"
            errorText="Please enter a valid time."
            keyboardType="default"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.time : ''}
            initiallyValid={!!editedProduct}
            required
          />
          <View style={styles.addImageContainer}>
            <Button title="Image 1" onPress={pickImageHandler} />
            {image1 ? (
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{
                    uri: image1,
                  }}
                />
              </View>
            ) : (
              <Text>Add Image</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

AddItem.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');

  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Item'
      : 'Add Item',
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
  imageContainer: {
    width: '100%',
    height: '60%',
    alignContent: 'flex-end',
  },
  addImageContainer: {
    flexDirection: 'row',
    paddingRight: 20,
    justifyContent: 'space-between',
    alignContent: 'center',
    marginVertical: 10,
  },
  image: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    borderColor: 'black',
    borderWidth: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddItem;
