import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

const AddressContainer = props => {
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="padding"
      keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>Your Address</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.formLabel}>Street</Text>
            <TextInput style={styles.input} title="Street 1" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.formLabel}>Apartment</Text>
            <TextInput style={styles.input} title="Street 2" />
          </View>
          <View style={styles.packedInput}>
            <Text style={styles.packedFormLabel}>City</Text>
            <TextInput style={styles.input} title="City" />
            <Text style={styles.packedFormLabel}>State</Text>
            <TextInput style={styles.input} title="State" />
            <Text style={styles.packedFormLabel}>Zip</Text>
            <TextInput style={styles.input} title="Zip Code" />
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={() => {}} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    margin: 20,
  },
  inputContainer: {},
  packedInput: {
    paddingHorizontal: 2,
    flex: 1,
  },
  packedFormLabel: {
    fontSize: 16,
    marginVertical: 8,
  },
  formLabel: {
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
  buttonContainer: {},
});

export default AddressContainer;
