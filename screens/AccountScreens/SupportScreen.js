import React from 'react';
import {View, StyleSheet, Button, TextInput, Alert} from 'react-native';

const SupportScreenContainer = props => {
    return (
        // <KeyboardAwareScrollView
        // enableOnAndroid={true}
        // enableAutomaticScroll={Platform.OS === 'ios'}
        // contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.inputContainer}>
          <TextInput
            keyboardType="default"
            title="customer-states"
            placeholder="What can we help you with?"
            multiline="true"
            maxLength={500}
          />
          <Button
            title="Submit"
            onPress={() => Alert.alert('thanks for the feedback')}
          />
        </View>
    );
};

SupportScreenContainer.navigateOptions = {
    Title: 'Support',
};

SupportScreenContainer.navigationOptions = navData => {
  return {
    headerTitle: 'Contact support',
  };
};

const styles = StyleSheet.create({
    formContainer: {
        height: '50%',
        margin: 20,
      },
      inputContainer: {
        height: '16%',
        borderBottomWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
      },
      input: {
        height: '100%',
        width: '100%',
      },
      buttonContainer: {
        alignItems: 'center',
      },
});

export default SupportScreenContainer;