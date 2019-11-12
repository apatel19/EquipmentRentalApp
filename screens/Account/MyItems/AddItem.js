import React, {useEffect, useCallback, useReducer} from 'react';
import {
  ScrollView,
  TextInput,
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../../components/UI/HeaderButton';
import {useSelector, useDispatch} from 'react-redux';
import * as productsActions from '../../../store/actions/products';

const FORM_INPUT_UPDATE = 'UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
  }
};

const AddItem = props => {
  const prodId = props.navigation.getParam('productId');

  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId),
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title = editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      price: '',
      time: editedProduct ? editedProduct.time : ''
    },
    inputValidity: {
      title = editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      price: editedProduct? true : false,
      time: editedProduct ? true : false
    },
    formIsValid: editedProduct ? true : false,
  });

  const submitHandler = useCallback(() => {
    if (!titleIsValid) {
      Alert.alert('Wrong Input!', 'Please check the error in the form.', [
        {
          text: 'Ok',
        },
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(productsActions.updateProduct(prodId, title, imageUrl, time));
    } else {
      dispatch(productsActions.createProduct(title, imageUrl, +price, time));
    }
    props.navigation.goBack();
  }, [dispatch, prodId, time, imageUrl, title, price, titleIsValid]);

  useEffect(() => {
    props.navigation.setParams({submit: submitHandler});
  }, [submitHandler]);

  const textChangeHandler = text => {
    let isValid = false;
    if (text.trim().length === 0) {
      isValid = true;
    }
    dispatchFormState({type: FORM_INPUT_UPDATE, value: text, isValid: isValid, input: 'title'})
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}> Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={titleChangeHandler}
            keyboardType="default"
            autoCapitalize="sentences"
            returnKeyType="next"
            onEndEditing={() => {}}
            onSubmitEditing={() => {}}
          />
          {!titleIsValid && <Text>Please enter a valid title!</Text>}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}> Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
            keyboardType="url"
            autoCapitalize="none"
          />
        </View>

        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}> Price </Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text => setPrice(text)}
              keyboardType="decimal-pad"
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}> Time </Text>
          <TextInput
            style={styles.input}
            value={time}
            onChangeText={text => setTime(text)}
            keyboardType="number-pad"
          />
        </View>
      </View>
    </ScrollView>
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
  formControl: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default AddItem;
