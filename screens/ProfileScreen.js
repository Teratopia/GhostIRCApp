import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import constyles from '../constants/constyles';
import colors from '../constants/colors';
import moment from 'moment';
import TouchTile from '../components/touchTile';

const ProfileScreen = props => {

    return  <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>

              <Text style={constyles.genH2Text}>{props.user.username}</Text>

              <View style={{flexDirection : 'row', justifyContent : 'space-evenly', width : '100%', marginTop : 12}}>
                <View style={{justifyContent : 'center', alignItems : 'center', width : '30%'}}>
                  <Text style={{...constyles.genH5Text, color : colors.secondary}}>Total Ecto</Text>
                  <Text style={constyles.genH4Text}>7240</Text>
                </View>
                <View style={{justifyContent : 'center', alignItems : 'center', width : '30%'}}>
                  <Text style={{...constyles.genH5Text, color : colors.secondary}}>User Since</Text>
                  <Text style={constyles.genH4Text}>{moment(props.user.createDate).format("MMM Do YYYY")}</Text>
                </View>
                <View style={{justifyContent : 'center', alignItems : 'center', width : '30%'}}>
                  <Text style={{...constyles.genH5Text, color : colors.secondary}}>Unspent Ecto</Text>
                  <Text style={constyles.genH4Text}>548</Text>
                </View>
              </View>

              <View style={{flexDirection : 'row', justifyContent : 'space-evenly'}}>
                <TouchTile 
                  title="GHOSTS"
                  sizeChange={32}
                  fontSize={24}
                  onPress={() => {}}
                  />
                <TouchTile 
                  title="HISTORY"
                  sizeChange={32}
                  fontSize={24}
                  onPress={() => {}}
                  />
              </View>

              <View style={{flexDirection : 'row', justifyContent : 'space-evenly'}}>
                <TouchTile 
                  title="FEATS"
                  sizeChange={32}
                  fontSize={24}
                  onPress={() => {}}
                  />
                <TouchTile 
                  title="SETTINGS"
                  sizeChange={32}
                  fontSize={24}
                  onPress={() => {}}
                  />
              </View>

            </View>
    
}

const styles = StyleSheet.create({
    screen : {
      flex:1,
    },

});

export default ProfileScreen;