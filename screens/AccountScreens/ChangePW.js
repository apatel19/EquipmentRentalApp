import React from 'react';
import {View, StyleSheet, Button, TextInput, Alert} from 'react-native';

const ChangePasswordContainer = props => {
    return (
        <View style={styles.inputContainer}>
          <TextInput
            keyboardType="default"
            title="old-pw"
            placeholder="Old Password"
            secureTextEntry="true"
            maxLength={500}
          />
          <TextInput
            keyboardType="default"
            title="new-pw"
            placeholder="New Password"
            secureTextEntry="true"
            maxLength={500}
          />
          <Button
            title="Submit"
            onPress={() => Alert.alert('thanks for the feedback')}
          />
        </View>
    );
};

ChangePasswordContainer.navigateOptions = {
    Title: 'ChangePassword',
};

ChangePasswordContainer.navigationOptions = navData => {
    return {
      headerTitle: 'New Password',
    };
  };

const styles = StyleSheet.create({
    inputContainer: {
        borderBottomWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
      },
});

export default ChangePasswordContainer;