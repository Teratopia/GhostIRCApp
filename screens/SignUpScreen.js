import React, {useState} from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import constyles from '../constants/constyles';
import CheckBox from 'react-native-check-box';
import colors from '../constants/colors';
//import AsyncStorage from '@react-native-community/async-storage';



//import io from 'socket.io-client/dist/socket.io';

const SignUpScreen = props => {

    const [username, setUsername] = useState();
    const [codeInput, setCodeInput] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    async function completeSignUpHandler(){
      if(confirmPassword !== props.password){
        //TODO-handle
        return;
      }
      if(!username){
        //TODO-handle
        return;
      }
      if(codeInput !== props.code){
        //TODO-handle
        return;
      }
        props.socket.emit('completeUserSignUp', { 
          email : props.email,
          password : props.password,
          pnToken : props.pnToken,
          username : username
        });
    }

    async function resendCodeHandler(){
      props.socket.emit('requestEmailVerification', { email : props.email });
    }

    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>

      <Text style={constyles.genH1Text}>GhostIRC</Text>
      <View style={{height : 4}}/>

            <Text style={constyles.genH4Text}>Username</Text>
            <View style={{ ...constyles.genTextInputRowContainer, marginTop: 0 }}>
              <TextInput style={constyles.genTextInput}
                //placeholder='email'
                onSubmitEditing={(e) => {setUsername(e.nativeEvent.text)}}
                //returnKeyLabel="done"
              />
            </View>

            <Text style={constyles.genH4Text}>Verification Code</Text>
            <View style={{ ...constyles.genTextInputRowContainer, marginTop: 0 }}>
              <TextInput style={constyles.genTextInput}
                //placeholder='password'
                onSubmitEditing={(e) => {setCodeInput(e.nativeEvent.text)}}
                //returnKeyLabel="done"
                //secureTextEntry={true}
              />
            </View>

            <Text style={constyles.genH4Text}>Confirm Password</Text>
            <View style={{ ...constyles.genTextInputRowContainer, marginTop: 0 }}>
              <TextInput style={constyles.genTextInput}
                //placeholder='password'
                onSubmitEditing={(e) => {setConfirmPassword(e.nativeEvent.text)}}
                //returnKeyLabel="done"
                //secureTextEntry={true}
              />
            </View>
            <View style={{height : 4}}/>

      <View style={constyles.buttonRowContainer}>
        <View style={constyles.activeButton}>
          <Button
            title="Complete"
            onPress={completeSignUpHandler}
            color="white"
          />
        </View>
      </View>
      <View style={constyles.buttonRowContainer}>
        <View style={constyles.inactiveButton}>
          <Button
            title="Resend Code"
            onPress={resendCodeHandler}
            color="white"
          />
        </View>
      </View>
    </View>
}

export default SignUpScreen;