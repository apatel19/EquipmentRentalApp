import React from 'react';
import {ScrollView, FlatList, View, Text, StyleSheet, Button, Alert} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Colors from '../constants/Colors.js'
import DummyScreenContainer from '../screens/dummyScreen'
import AccountOptions from '../constants/Account';
import AccountList from '../components/UI/AccountList';

const AccountScreenContainer = props => {
  const goToNextScreen = (Title) => {
    props.navigation.setParams({title: Title});
    props.navigation.navigate(Title);
  };

  return (
    <ScrollView>
      <FlatList
        data={AccountOptions}
        keyExtractor={option => option.id}
        renderItem={option => (
          <AccountList
            title={option.item.name}
            subtitle={option.item.id === 'accountDetails' ? true : false}
            subtitleText={
              option.item.id === 'accountDetails' ? 'test@gmail.com' : ''
            }
            iconName={option.item.icon}
            onPress={() => {
              props.navigation.navigate(option.item.screen);
            }}
          />
        )}
      />
    </ScrollView>
  );
};

const IconButton = ({title, color, bgcolor, onPress, width, icon }) =>{
  return (
    <TouchableHighlight onPress = { onPress } style= { { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: bgcolor } }>
    <View style={ {width: width, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' } }>
      <Image style = { { height: 27, width:27, margin : 5 } } source = {  icon }></Image>
      <Text style = { {color: color }} > { title } </Text>      
    </View>
    </TouchableHighlight>
  );
}

AccountScreenContainer.navigationOptions = navData => {
  return {
    headerTitle: 'My Account',
  };
};

const styles = StyleSheet.create({});

export default AccountScreenContainer;
