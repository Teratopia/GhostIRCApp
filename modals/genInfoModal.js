import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import GenButton from '../components/genButton';
import colors from '../constants/colors';
import constyles from '../constants/constyles';


const GenInfoModal = props => {

    return <Modal transparent={true} style={{justifyContent : 'center', alignItems : 'center', flex : 1}}>
        <View style={styles.screen}>
        
        </View>
        <View style={{position : 'absolute', flex : 1, justifyContent : 'center', alignItems : 'center', width : '100%', height : '100%'}}>
        <View style={styles.parentContainer}>
            {
                props.headerText ?
                <Text style={{...constyles.genH2Text, ...props.headerTextStyle, textAlign : 'center'}}>{props.headerText}</Text>
                : null
            }
            {
                props.subheaderText ?
                <Text style={{...constyles.genH5Text, textAlign : 'center', color : colors.secondary}}>{props.subheaderText}</Text>
                : null
            }
            {
                (props.headerText || props.subheaderText) && props.bodyTextArray ?
                <View style={{flexDirection : 'row'}}>

                <View style={{
                    flex : 1,
                    height : 1, 
                    backgroundColor : colors.primary, 
                    marginTop : 8,
                    marginHorizontal : 12
                }}/>
                </View>
                : null
            }
            {
                props.bodyTextArray ?
                <View style={{width : '100%'}}>
                    {
                        props.bodyTextArray.map(string => {
                            return <Text style={styles.bodyText}>{string}</Text>
                        })
                    }
                    
                </View>
                :
                null
            }
            <View style={{flexDirection : 'row', marginTop : 8}}>
                <GenButton title={props.closeTitle || "Close"} onPress={props.onClose}/>
                {
                    props.secondButtonTitle && props.secondButtonOnPress ? 
                    props.activeSecondButton ?
                    <GenButton 
                        title={props.secondButtonTitle} 
                        onPress={props.secondButtonOnPress} 
                        style={constyles.activeButton}
                    />
                    :
                    <GenButton 
                        title={props.secondButtonTitle} 
                        onPress={props.secondButtonOnPress} 
                    />
                    :
                    null
                }
            </View>
        </View>
        </View>
    </Modal>
    
}

const styles = StyleSheet.create({
    screen : {
      //flex:1,
      height : '100%',
      width : '100%',
      justifyContent : 'center', 
      alignItems : 'center',
      backgroundColor : 'black',
      opacity : .5
    },
    parentContainer : {
        //flex : 1,
        //width : '100%',
        //position : 'absolute',
        margin : 32,
        justifyContent : 'center', 
        alignItems : 'center',
        borderWidth : 1,
        borderRadius : 24,
        borderColor : colors.primary,
        backgroundColor : 'white',
        padding : 12,
        opacity : 1
    },
    bodyText : {
        ...constyles.genH5Text, 
        textAlign : 'center', 
        paddingHorizontal : 12, 
        paddingTop : 8
    }

});

export default GenInfoModal;