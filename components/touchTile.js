import React, {useState} from 'react';
import { View, Text, TextInput, Button, ImageBackground, TouchableOpacity } from 'react-native';



const TouchTile = props => {
    let sizeChange = 0;
    if(props.sizeChange){
        sizeChange = props.sizeChange;
    }
    
    const styles = {
        parentContainer : {
            width : 148 + sizeChange,
            height : 148 + sizeChange,
            //backgroundColor : 'yellow'
        },
        innerSquare : {
            width : 116 + sizeChange,
            height : 116 + sizeChange,
            justifyContent : 'center',
            alignItems : 'center',
            //backgroundColor : 'rgba(0,128,0,.5)',
            margin : 16,
            //opacity: ,
            borderRadius : sizeChange > 0 ? 18 + sizeChange/2 : 18,
        },
        counterRowContainer : {
            position : 'absolute',
            flexDirection : 'row',
            justifyContent : 'flex-end',
            alignItems : 'center',
            height : 36 + sizeChange/2,
            width : '100%'
        },
        counterContainer : {
            minWidth : sizeChange > 0 ? 36 + sizeChange/2 : 36,
            minHeight : sizeChange > 0 ? 36 + sizeChange/2 : 36,
            padding : 4,
            borderRadius : sizeChange > 0 ? 18 + sizeChange/2 : 18,
            backgroundColor : 'red',
            justifyContent : 'center',
            alignItems : 'center',
        },
        counterText : {
            fontSize : sizeChange > 0 ? 16+sizeChange/2 : 16,
            color : 'white',
            fontWeight : '700'
        },
        innerTextStyle : {
            fontSize : 18,
            fontWeight : '600',
            color : 'white',
            opacity : 1,
            position : 'absolute'
        }
    }

    if(props.fontSize){
        styles.innerTextStyle.fontSize = props.fontSize;
    }

    return (
    <TouchableOpacity 
        style={{...styles.parentContainer}}
        onPress={props.onPress}
        >
       
        <ImageBackground 
            source={require('../images/testGhost.png')} 
            style={{...styles.innerSquare}}
            resizeMode='contain'
            >
            <View style={{backgroundColor : 'black', width : '100%', height : '100%', justifyContent : 'center', alignItems : 'center', opacity : .5}}/>
            <Text style={{...styles.innerTextStyle, textAlign : 'center'}}>{props.title}</Text>
        </ImageBackground>
        {
            props.cornerCount && props.cornerCount > 0 ?
            <View style={{...styles.counterRowContainer}}>
                <View style={{...styles.counterContainer}}>
                    <Text style={{...styles.counterText}}>{props.cornerCount}</Text>
                </View>
            </View>
            :
            null

            //{props.cornerCount}
        }
    </TouchableOpacity>
    )
    
}
/*
const styles = StyleSheet.create({
    parentContainer : {
        width : 148 + sizeChange,
        height : 148 + sizeChange,
        //backgroundColor : 'yellow'
    },
    innerSquare : {
        width : 116 + sizeChange,
        height : 116 + sizeChange,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : 'rgba(0,128,0,.5)',
        margin : 16,
        borderRadius : sizeChange > 0 ? 18 + sizeChange/2 : 18,
    },
    counterRowContainer : {
        position : 'absolute',
        flexDirection : 'row',
        justifyContent : 'flex-end',
        alignItems : 'center',
        height : 36 + sizeChange/2,
        width : '100%'
    },
    counterContainer : {
        minWidth : sizeChange > 0 ? 36 + sizeChange/2 : 36,
        minHeight : sizeChange > 0 ? 36 + sizeChange/2 : 36,
        padding : 4,
        borderRadius : sizeChange > 0 ? 18 + sizeChange/2 : 18,
        backgroundColor : 'red',
        justifyContent : 'center',
        alignItems : 'center',
    },
    counterText : {
        fontSize : sizeChange > 0 ? 16+sizeChange/2 : 16,
        color : 'white',
        fontWeight : '700'
    }

});
*/

export default TouchTile;