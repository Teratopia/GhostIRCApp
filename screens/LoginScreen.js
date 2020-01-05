import React, {useState} from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import constyles from '../constants/constyles';
import CheckBox from 'react-native-check-box';
import colors from '../constants/colors';
//import AsyncStorage from '@react-native-community/async-storage';
import SignUpScreen from './SignUpScreen';
import GenButton from '../components/genButton';

//import io from 'socket.io-client/dist/socket.io';

const LoginScreen = props => {

    const [isInit, setIsInit] = useState(false);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [code, setCode] = useState(null);

    function logInUser(email, password, pnToken){
      props.socket.emit('loginUser', {
          email : email,
          password : password,
          pnToken : pnToken
      });
    }

    function logInButtonHandler(){
      console.log('logInButtonHandler 1');
      if(email && password && props.pnToken){
        logInUser(email, password, props.pnToken)
      }
    }

    function signUpButtonHandler(){
      if(email && password){
        props.socket.emit('requestEmailVerification', { email : email });
      }
    }

    async function attachSocketListeners(){
      props.socket.on('loginUser', res => {
        if(res.success){
          console.log('login success, res = ', res);
          props.setUser(res.user);
          props.furtherScreenHistory('SEARCH');
        } else {
          console.log(res.message);
        }
      });
      props.socket.on('requestEmailVerification', res => {
        if(res.success){
          console.log('res.code = ', res.code);
          setCode(res.code);
        } else {
          console.log(res.message);
        }
      });
    }

    if(!isInit){
      try{
        attachSocketListeners();
      } catch(e){
        console.log('login init error = ', e);
      }
      setIsInit(true);
    }

    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 48 }}>
      {
        code ? 
        <SignUpScreen
          socket={props.socket}
          email={email}
          password={password}
          pnToken={props.pnToken}
          code={code}
        />
        :
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={constyles.genH1Text}>GhostIRC</Text>
      <View style={{height : 4}}/>

      <Text style={{...constyles.genH5Text, color : colors.secondary}}>Email</Text>
      <View style={{ ...constyles.genTextInputRowContainer, marginTop: 0 }}>
        <TextInput style={constyles.genTextInput}
          //placeholder='email'
          onSubmitEditing={(e) => {setEmail(e.nativeEvent.text)}}
          //returnKeyLabel="done"
        />
      </View>
      <Text style={{...constyles.genH5Text, color : colors.secondary}}>Password</Text>
      <View style={{ ...constyles.genTextInputRowContainer, marginTop: 0 }}>
        <TextInput style={constyles.genTextInput}
          //placeholder='password'
          onSubmitEditing={(e) => {setPassword(e.nativeEvent.text)}}
          //returnKeyLabel="done"
          //secureTextEntry={true}
        />
      </View>
      <View style={{height : 4}}/>

      <View style={constyles.buttonRowContainer}>
          <GenButton
            title="Log In"
            onPress={logInButtonHandler}
            //color="white"
          />
          <GenButton
            title="Sign Up"
            onPress={signUpButtonHandler}
            //color="white"
          />
      </View>

      {

      /*
      <View style={{height : 4}}/>
      <View style={constyles.buttonRowContainer}>
        <Text style={constyles.genH4Text}>Save Log In Information</Text>
        <View style={{ width: 4 }} />
        <CheckBox
          leftText={"Save Log In Information"}
          onClick={saveLoginInfoHandler}
          isChecked={saveLoginInfo}
          checkBoxColor={colors.primary}
        />
      </View>
      <View style={{height : 4}}/>
      <View style={constyles.buttonRowContainer}>
        <Text style={constyles.genH4Text}>Automatically Log In</Text>
        <View style={{ width: 4 }} />
        <CheckBox
          leftText={"Auto Log In"}
          onClick={autoLoginHandler}
          isChecked={autoLogin}
          checkBoxColor={colors.primary}
        />
      </View>
*/
      }
      
      </View>
      
    }
    </View>
}

export default LoginScreen;