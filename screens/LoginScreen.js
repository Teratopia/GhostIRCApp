import React, {useState} from 'react';
import { View, Text, TextInput, Button, Keyboard, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import constyles from '../constants/constyles';
import CheckBox from 'react-native-check-box';
import colors from '../constants/colors';
import SignUpScreen from './SignUpScreen';
import GenButton from '../components/genButton';
import AutoSignIn from '../components/autoSignIn';
import AsyncStorage from '@react-native-community/async-storage';

//import io from 'socket.io-client/dist/socket.io';

const LoginScreen = props => {

    const [isInit, setIsInit] = useState(false);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [autoLogin, setAutoLogin] = useState(false);
    const [saveInfo, setSaveInfo] = useState(false);
    const [signInInit, setSignInInit] = useState(false);
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
      console.log('logInButtonHandler 2: autoLogin = '+autoLogin+', saveInfo = '+saveInfo+', email = '+email+', password = '+password);
      if(email && password && props.pnToken){
        if(saveInfo){
          AsyncStorage.setItem('@email', email);
          AsyncStorage.setItem('@password', password);
        }
        logInUser(email, password, props.pnToken);
      }
    }

    function signUpButtonHandler(){
      if(email && password){
        props.socket.emit('requestEmailVerification', { email : email });
      }
    }

    async function attachSocketListeners(){
      console.log('attachSocketListeners 1');
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

    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <KeyboardAvoidingView 
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 48 }}>

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
          defaultValue={email}
        />
      </View>
      <Text style={{...constyles.genH5Text, color : colors.secondary}}>Password</Text>
      <View style={{ ...constyles.genTextInputRowContainer, marginTop: 0 }}>
        <TextInput style={constyles.genTextInput}
          //placeholder='password'
          onSubmitEditing={(e) => {setPassword(e.nativeEvent.text)}}
          //returnKeyLabel="done"
          secureTextEntry={true}
          defaultValue={password}
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
        <AutoSignIn
          setEmail={setEmail}
          setPassword={setPassword}
          setSaveInfo={setSaveInfo}
          setAutoLogin={setAutoLogin}
          saveInfo={saveInfo}
          autoLogin={autoLogin}
          signInInit={signInInit}
          setSignInInit={setSignInInit}
          logInUser={logInUser}
          pnToken={props.pnToken}
        />      
      </View>
      
    }
    </KeyboardAvoidingView>
    </View>
    
}

export default LoginScreen;