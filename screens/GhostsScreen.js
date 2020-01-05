import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import TouchTile from '../components/touchTile';


const GhostsScreen = props => {

    function selectGhostType(type){

    }

    return <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>

    <View style={{flexDirection : 'row', justifyContent : 'space-evenly'}}>
      <TouchTile 
        title="SPRITES" 
        sizeChange={32}
        fontSize={24}
        onPress={() => {selectGhostType('SPRITES')}}
      />
      <TouchTile 
        title="SHADOWS" 
        sizeChange={32} 
        cornerCount={0}
        fontSize={24}
        onPress={() => {selectGhostType('SHADOWS')}}
      />
    </View>

    <View style={{flexDirection : 'row', justifyContent : 'space-evenly'}}>
      <TouchTile 
        title="WISPS"
        sizeChange={32}
        fontSize={24}
        onPress={() => {selectGhostType('WISPS')}}
        />
      <TouchTile 
        title="CHANNELS"
        sizeChange={32}
        fontSize={24}
        onPress={() => {selectGhostType('CHANNELS')}}
        />
    </View>

    <View style={{flexDirection : 'row', justifyContent : 'space-evenly'}}>
    <TouchTile 
        title="ESSENCES" 
        sizeChange={32}
        cornerCount={0}
        fontSize={24}
        onPress={() => {selectGhostType('ESSENCES')}}
      />
      <TouchTile 
        title="EIDOLA" 
        sizeChange={32}
        fontSize={24}
        onPress={() => {selectGhostType('EIDOLA')}}
      />
      
    </View>
      

    </View>
    
}

const styles = StyleSheet.create({
    screen : {
      flex:1,
    },

});

export default GhostsScreen;