import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import constyles from '../constants/constyles';
import CheckBox from 'react-native-check-box';
import colors from '../constants/colors';
import AsyncStorage from '@react-native-community/async-storage';
import { getStatusBarHeight } from 'react-native-status-bar-height';    //


const SearchScreen = props => {

    return <View style={{flex : 1}}>

      <Text>hello world</Text>

    </View>
    
}

const styles = StyleSheet.create({
    screen : {
      flex:1,
      marginTop: getStatusBarHeight(),
    },

});

export default SearchScreen;