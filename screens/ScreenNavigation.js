import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import constyles from '../constants/constyles';
import CheckBox from 'react-native-check-box';
import colors from '../constants/colors';
//import AsyncStorage from '@react-native-community/async-storage';
import { getStatusBarHeight } from 'react-native-status-bar-height';    //

import NavigationFooter from '../components/navigationFooter';
import LoginScreen from './LoginScreen';
import SearchScreen from './SearchScreen';


const ScreenNavigation = props => {

    const [screenHistory, setScreenHistory] = useState(['LOGIN']);
    const [user, setUser] = useState();

    const furtherScreenHistory = (screenName) => {
        if(screenName !== screenHistory[screenHistory.length -1]){
            let updatedHistory = [...screenHistory];
            updatedHistory.push(screenName);
            setScreenHistory(updatedHistory);
        }
    }

    function goBackInHistory(){
        if(screenHistory[screenHistory.length -1] !== 'LOGIN'){
            let updatedHistory = [...screenHistory];
            updatedHistory.splice(updatedHistory.length -1, 1);
            setScreenHistory(updatedHistory);
        }
    }

    console.log('screenHistory = ', screenHistory);
    console.log('screenHistory[screenHistory.length -1] = ', screenHistory[screenHistory.length - 1].trim());

    let mainView = null;
    switch(screenHistory[screenHistory.length - 1].trim()) {
        case 'LOGIN':
            console.log('1');
          mainView = <LoginScreen
            socket={props.socket}
            setUser={setUser}
            furtherScreenHistory={furtherScreenHistory}
            pnToken="test"
          />
          break;
        case 'SEARCH':
            console.log('2');
            mainView = <SearchScreen
            socket={props.socket}
            user={user}
            />
            break;
        default:
            console.log('3');
          mainView = <LoginScreen
            socket={props.socket}
            setUser={setUser}
            furtherScreenHistory={furtherScreenHistory}
            pnToken="test"
          />
      }

    return <View style={styles.screen}>

      {mainView}

      <NavigationFooter
        furtherScreenHistory={furtherScreenHistory}
      />
    </View>
    
}

const styles = StyleSheet.create({
    screen : {
      flex:1,
      marginTop: getStatusBarHeight(),
    },

});

export default ScreenNavigation;