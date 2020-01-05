import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import constyles from '../constants/constyles';
import colors from '../constants/colors';
import moment from 'moment';
import TouchTile from '../components/touchTile';

const UserGhostsScreen = props => {

    return  <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
              
              <TouchableOpacity 
                onPress={()=>{props.furtherScreenHistory("CREATE GHOST")}}
                style={{ flexDirection : 'row' }}>
                <View style={{
                    flex : 1,
                    marginHorizontal : 12,
                    height : 80,
                    borderWidth : 1,
                    borderColor : colors.primary,
                    borderRadius : 24,
                    marginVertical : 6,
                    justifyContent : 'center',
                    alignContent : 'center',
                    backgroundColor : colors.secondary
                }}>
                    <Text style={{...constyles.genH2Text, textAlign : 'center', color : 'white'}}>Make a Ghost!</Text>
                </View>
              </TouchableOpacity>
              
            </View>
    
}

const styles = StyleSheet.create({
    screen : {
      flex:1,
    },

});

export default UserGhostsScreen;