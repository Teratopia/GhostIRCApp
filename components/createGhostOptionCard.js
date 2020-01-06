import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import constyles from '../constants/constyles';
import colors from '../constants/colors';

const CreateGhostOptionCard = props => {

    return  <TouchableOpacity 
                onPress={()=>{props.handleSelection(props.name)}}
                style={{ flexDirection : 'row' }}>
                <View style={styles.ghostTypeContainer}>
                    <Text style={styles.ghostTypeHeader}>{props.name}</Text>
                    <Text style={styles.ghostTypeSubHeader}>{props.cost}</Text>
                    <View style={{width : '80%', height : 1, backgroundColor : 'white'}}/>
                    <Text style={styles.ghostTypeText}>{props.bodyText}</Text>
                </View>
            </TouchableOpacity>
}

const styles = StyleSheet.create({
    screen : {
      flex:1,
    },
    ghostTypeContainer : {
        flex : 1,
        marginHorizontal : 12,
        borderWidth : 1,
        borderColor : colors.primary,
        borderRadius : 24,
        marginVertical : 6,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : colors.secondary,
        padding : 8
    },
    ghostTypeHeader : {
        ...constyles.genH3Text, 
        color : 'white', 
        textAlign : 'center'
    },
    ghostTypeSubHeader : {
        ...constyles.genH5Text, 
        color : 'white', 
        textAlign : 'center'
    },
    ghostTypeText : {
        ...constyles.genH4Text, 
        color : 'white', 
        textAlign : 'center', 
        paddingHorizontal : 12, 
        paddingTop : 8
    }

});

export default CreateGhostOptionCard;