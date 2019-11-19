import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AccountList = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchableContainer}
        onPress={props.onPress}>
        <View style={styles.mainContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>{props.title}</Text>
            {props.subtitle && (
              <Text style={styles.subtitleText}>{props.subtitleText}</Text>
            )}
          </View>
          <View style={styles.iconContainer}>
            <Icon
              name={
                Platform.OS === 'android'
                  ? 'md-' + props.iconName
                  : 'ios-' + props.iconName
              }
              size={23}
              color={'black'}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  touchableContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    width: '80%',
  },
  iconContainer: {
    width: '20%',
    alignItems: 'flex-end',
  },
  titleText: {
    fontSize: 20,
  },
  subtitleText: {
    fontSize: 16,
    paddingVertical: 10,
  },
});

export default AccountList;
