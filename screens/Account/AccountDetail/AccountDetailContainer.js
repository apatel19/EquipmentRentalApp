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

const AccountDetailContainer = props => {
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="padding"
      keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.formLabel}>Change Name</Text>
            <TextInput
              style={styles.input}
              title="Change Name"
              placeholder="(optional) new name"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.formLabel}>Change Email</Text>
            <TextInput
              style={styles.input}
              title="Change Email"
              placeholder="(optional) new email"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.formLabel}>Change Password</Text>
            <TextInput
              style={styles.input}
              title="Change Password"
              placeholder="(optional) new password"
            />
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

export default AccountDetailContainer;
