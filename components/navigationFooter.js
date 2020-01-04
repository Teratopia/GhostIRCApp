import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/colors';             //
import Icon from 'react-native-vector-icons/Entypo';  //

const NavigationFooter = props => {

      return (
        <View style={{width : '100%'}}>
          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={() => {props.furtherScreenHistory('STATUS')}} 
                              style={props.currentScreen === 'STATUS' ?
                              styles.activeButton :
                              styles.inactiveButton
                              }>
                  <Icon name="user" size={18} color="white" style={{marginTop : 4}}/>
                  <Text style={styles.textStyle}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {props.furtherScreenHistory('SEARCH')}} 
                              style={props.currentScreen === 'SEARCH' ?
                              styles.activeButton :
                              styles.inactiveButton
                              }>
                  <Icon name="compass" size={18} color="white" style={{marginTop : 4}}/>
                  <Text style={styles.textStyle}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {props.furtherScreenHistory('FRIENDS')}} 
                              style={props.currentScreen === 'FRIENDS' ?
                              styles.activeButton :
                              styles.inactiveButton
                              }>
                  <Icon name="users" size={18} color="white" style={{marginTop : 4}}/>
                  <Text style={styles.textStyle}>Friends</Text>
            </TouchableOpacity>
          </View>   
        </View>

      );
  }
  
  const styles = StyleSheet.create({
      rowContainer : {
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40,
      },
      activeButton : {
        flex : 1,
        backgroundColor : Colors.primary,
        borderWidth : 2,
        borderColor : Colors.secondary,
        padding : 4,
        justifyContent : 'center',
        alignItems : 'center'
      },
      inactiveButton : {
        flex : 1,
        backgroundColor : Colors.secondary,
        borderWidth : 2,
        borderColor : Colors.primary,
        padding : 4,
        justifyContent : 'center',
        alignItems : 'center'
      },
      textStyle : {
        fontSize : 10,
        color : 'white'
      }
    });

export default NavigationFooter;