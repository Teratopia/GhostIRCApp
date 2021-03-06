import {StyleSheet} from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    genTextInputRowContainer : {
        flexDirection : 'row',
        justifyContent : 'space-evenly',
        margin : 4
    },
    genTextInput : {
        flex : 1,
        margin : 4,
        padding : 8,
        borderWidth : 1,
        borderRadius : 8,
        borderColor : colors.secondary,
        textAlign : 'center',
        color : colors.dark
    },
    buttonRowContainer : {
        flexDirection : 'row',
        justifyContent : 'space-evenly',
        alignItems : 'center'
        //flex : 1
    },
    inactiveButton : {
        flex : 1,
        margin : 4,
        //padding : 4,
        borderWidth : 3,
        borderRadius : 8,
        borderColor : colors.primary,
        backgroundColor : colors.secondary
    },
    activeButton : {
        flex : 1,
        margin : 4,
        //padding : 4,
        borderWidth : 3,
        borderRadius : 8,
        borderColor : colors.secondary,
        backgroundColor : colors.primary
    },
    dangerButton : {
        flex : 1,
        margin : 4,
        //padding : 4,
        borderWidth : 3,
        borderRadius : 8,
        borderColor : colors.secondary,
        backgroundColor : colors.danger
    },
    genH1Text : {
        fontSize : 68,
        fontWeight : '700',
    },
    genH2Text : {
        fontSize : 48,
        fontWeight : '700',
    },
    genH3Text : {
        fontSize : 24,
        fontWeight : '500',
        //color : colors.secondary,
        //textAlign : 'center'
    },
    genH4Text : {
        fontSize : 18,
        fontWeight : '500',
        //color : colors.secondary,
        //textAlign : 'center'
    },
    genH5Text : {
        fontSize : 14,
        fontWeight : '500',
        //color : colors.secondary,
        //textAlign : 'center'
    },
    genH6Text : {
        fontSize : 10,
        fontWeight : '400',
        //color : colors.secondary,
        //textAlign : 'center'
    },

});

export default styles;