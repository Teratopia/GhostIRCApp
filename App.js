/*
  To run:

  yarn react-native run-android
  yarn react-native run-ios
*/

import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import constyles from './constants/constyles';
import CheckBox from 'react-native-check-box';
import colors from './constants/colors';
//import AsyncStorage from '@react-native-community/async-storage';
import LoginScreen from './screens/LoginScreen';
import networkSettings from './constants/networkSettings';
import ScreenNavigation from './screens/ScreenNavigation';

//import io from 'socket.io-client/dist/socket.io';

import io from 'socket.io-client';

class App extends React.Component {
  /*
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };  
    //this.socket = io(networkSettings.serverURI, {jsonp : false});
    this.socket = io('http://127.0.0.1:3000/', {
      jsonp : false,
      path : '/./node_modules/socket.io-client',
      //transports: ['websocket']
    });
    this.socket.on('connect', () => {
      console.log('connect one');
    });
  }
  */

 constructor(props) {
  super(props);
  this.socket = io('http://10.0.2.2:3000', {jsonp : false});
  this.socket.on('connect', () => {
    console.log('CONNECTION SUCCESSFUL');
  });
 }

 /*
  componentDidMount() {
    
    //const socket = io('http://127.0.0.1:3000', {
    const socket = io('http://10.0.2.2:3000', {
      //jsonp : false,
      //path : '/./node_modules/socket.io-client',
      //transports: ['websocket']
    });
    console.log('socket = ', socket);
  }
  */
  
  render() {
    //return null;
    return <ScreenNavigation socket={this.socket}/>

  }
}

export default App;