import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import constyles from '../constants/constyles';
import CheckBox from 'react-native-check-box';
import colors from '../constants/colors';
//import AsyncStorage from '@react-native-community/async-storage';
import { getStatusBarHeight } from 'react-native-status-bar-height';    //
import DeviceInfo from 'react-native-device-info';  

import NavigationFooter from '../components/navigationFooter';
import NavigationHeader from '../components/navigationHeader';
import LoginScreen from './LoginScreen';
import SearchScreen from './SearchScreen';
import ProfileScreen from './ProfileScreen';
import GhostsScreen from './GhostsScreen';


const ScreenNavigation = props => {

    const [screenHistory, setScreenHistory] = useState(['LOGIN']);
    const [user, setUser] = useState();
    const system = DeviceInfo.getSystemName();
    const model = DeviceInfo.getModel();
    
    console.log('system = ', system);
    console.log('model = ', model);

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
    console.log('screenHistory[screenHistory.length -1] = ', screenHistory[screenHistory.length - 1]);

    let mainView = null;
    switch(screenHistory[screenHistory.length - 1]) {
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
        case 'PROFILE':
            console.log('2');
            mainView = <ProfileScreen
            socket={props.socket}
            user={user}
            />
            break;
        case 'GHOSTS':
            console.log('2');
            mainView = <GhostsScreen
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


    if(screenHistory.length === 1){
      return mainView;
    } else {
      return <View style={system === 'Android' ? styles.androidScreen : styles.screen}>
        <NavigationHeader 
                title={screenHistory[screenHistory.length - 1]}
                leftIcon={ screenHistory.length > 2 ? 'chevron-thin-left' : 'log-out'}
                leftIconFunction={goBackInHistory}
                rightIcon="menu" 
                rightIconFunction={() => {}}
                />
        {mainView}
        <NavigationFooter
          furtherScreenHistory={furtherScreenHistory}
          currentScreen={screenHistory[screenHistory.length - 1]}
        />
        { model === 'iPhone 11' ? <View style={{height : 36, backgroundColor : 'black'}}/> : null }
      </View>
    }
    
    
}

const styles = StyleSheet.create({
    screen : {
      flex:1,
      marginTop: getStatusBarHeight(),
    },
    androidScreen : {
      flex:1,
    },

});

export default ScreenNavigation;