import React, {useState} from 'react';
import constyles from '../constants/constyles';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';


const GenButton = props => {

    return <TouchableOpacity 
        onPress={props.onPress}
        disabled={props.disabled}
        style={{...constyles.inactiveButton, ...props.style}}>
            <Text style={{...styles.defaultText, ...props.textStyle}}>{props.title}</Text>
        </TouchableOpacity>
}

const styles = StyleSheet.create({
    defaultText : {
        color : 'white',
        fontSize : 16,
        fontWeight : '700',
        textAlign : 'center',
        padding : 4
    }
})

export default GenButton;