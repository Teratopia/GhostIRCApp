import React, {useState} from 'react';
import { View, Text } from 'react-native';
import constyles from '../constants/constyles';
import CheckBox from 'react-native-check-box';
import AsyncStorage from '@react-native-community/async-storage';
import colors from '../constants/colors';

//import io from 'socket.io-client/dist/socket.io';

const AutoSignIn = props => {

    const [isInit, setIsInit] = useState(false);

    async function doInit(){
        var autoLogin = await AsyncStorage.getItem('@autoLogin');
        var saveInfo = await AsyncStorage.getItem('@saveInfo');
        var email = await AsyncStorage.getItem('@email');
        var password = await AsyncStorage.getItem('@password');
        console.log('AUTOSIGNIN: autoLogin = '+autoLogin+', saveInfo = '+saveInfo+', email = '+email+', password = '+password);
        if(saveInfo === 'TRUE'){
            props.setEmail(email);
            props.setPassword(password);
            props.setSaveInfo(true);
        }
        if(autoLogin === 'TRUE'){
            props.setAutoLogin(true);
            props.logInUser(email, password, props.pnToken);
        }
    }

    function saveInfoHandler(){
        console.log('foo');
        if(props.saveInfo){
            AsyncStorage.setItem('@saveInfo', 'FALSE');
            props.setSaveInfo(false);
        } else {
            AsyncStorage.setItem('@saveInfo', 'TRUE');
            props.setSaveInfo(true);
        }
    }

    function autoLoginHandler(){
        if(props.autoLogin){
            AsyncStorage.setItem('@autoLogin', 'FALSE');
            props.setAutoLogin(false);
        } else {
            AsyncStorage.setItem('@autoLogin', 'TRUE');
            props.setAutoLogin(true);
        }
    }

    if(!props.signInInit){
        doInit();
        props.setSignInInit(true);
    }

    return  <View>
                <View style={{...constyles.buttonRowContainer, height : 38}}>
                <Text style={constyles.genH5Text}>Save Log In Information</Text>
                <View style={{ width: 4 }} />
                    <CheckBox
                    //leftText={"Save Log In Info"}
                    onClick={saveInfoHandler}
                    isChecked={props.saveInfo}
                    checkBoxColor={colors.primary}
                    />
                </View>
                <View style={{...constyles.buttonRowContainer, height : 38}}>
                <Text style={constyles.genH5Text}>Automatically Log In</Text>
                <View style={{ width: 4 }} />
                    <CheckBox
                    //leftText={"Auto Log In"}
                    onClick={autoLoginHandler}
                    isChecked={props.autoLogin}
                    checkBoxColor={colors.primary}
                    />
                </View>
            </View>

    
}

export default AutoSignIn;