import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

const HelpContainer = props => {
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="padding"
      keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>Leave us a message</Text>
          <TextInput
            keyboardType="default"
            title="customer-message"
            placeholder="What can we help you with?"
            multiline="true"
            maxLength={500}
            style={styles.input}
          />
        </View>
        <Button title="Submit" onPress={() => {}} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    margin: 20,
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
});
export default HelpContainer;
