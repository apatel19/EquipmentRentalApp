import React, {useState, useEffect, useCallback} from 'react';
import {ScrollView, TextInput, View, Text, StyleSheet} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../../components/UI/HeaderButton';
import {useSelector, useDispatch} from 'react-redux';
import * as productsActions from '../../../store/actions/products';

const AddItem = props => {
  const prodId = props.navigation.getParam('productId');

  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId),
  );
  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : '',
  );
  const [price, setPrice] = useState();
  const [time, setTime] = useState(editedProduct ? editedProduct.time : '');

  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      console.log('Dispatching UpdateProduct');
      dispatch(productsActions.updateProduct(prodId, title, imageUrl, time));
    } else {
      dispatch(productsActions.createProduct(title, imageUrl, +price, time));
    }
    props.navigation.goBack();
  }, [dispatch, prodId, time, imageUrl, title, price]);

  useEffect(() => {
    props.navigation.setParams({submit: submitHandler});
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}> Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}> Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
          />
        </View>

        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}> Price </Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}> Time </Text>
          <TextInput
            style={styles.input}
            value={time}
            onChangeText={text => setTime(text)}
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
