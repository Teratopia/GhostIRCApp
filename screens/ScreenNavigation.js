import React, { useState, Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
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
import UserGhostsScreen from './UserGhostsScreen';
import CreateGhostScreen from './CreateGhostScreen';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../components/Header';
import GhostsScreen from './GhostsScreen';
import SelectedGhostScreen from './SelectedGhostScreen';

class ScreenNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: 'LOGIN',
      user : null,
      selectedGhost : null
    };

    this.setUser = this.setUser.bind(this);
    this.setScreen = this.setScreen.bind(this);
    this.setGhost = this.setGhost.bind(this);
    this.resetGhost = this.resetGhost.bind(this);
    this.system = DeviceInfo.getSystemName();
    this.model = DeviceInfo.getModel();
  }

  componentDidMount(){
    this.props.socket.on('responseRequestAdded', this.resetGhost);
    this.props.socket.on('responseRoutedToExistingChatCard', this.resetGhost);
    this.props.socket.on('responseRated', this.resetGhost);
    this.props.socket.on('chatCardRated', this.resetGhost);
    this.props.socket.on('ghostRated', this.resetGhost);
    this.props.socket.on('responseDeleted', this.resetGhost);
    this.props.socket.on('chatCardDeleted', this.resetGhost);
  }

  resetGhost(res){
    console.log('resetGhost res = ', res);
      if(res.success){
        this.setGhost(res.ghost);
      }
  }

  componentWillUnmount(){
    this.props.socket.removeListener('responseRequestAdded');
    this.props.socket.removeListener('responseRoutedToExistingChatCard');
    this.props.socket.removeListener('responseRated');
    this.props.socket.removeListener('chatCardRated');
    this.props.socket.removeListener('ghostRated');
    this.props.socket.removeListener('responseDeleted');
    this.props.socket.removeListener('chatCardDeleted');
  }

  setUser(user){
    this.setState({
      user : user
    });
  }

  setScreen(screen){
    this.setState({
      currentScreen : screen
    });
  }

  setGhost(ghost){
    this.setState({
      selectedGhost : ghost
    });
  }

  render() {

    let mainView = null;
    switch (this.state.currentScreen) {
      case 'LOGIN':
        console.log('1');
        mainView = <LoginScreen
          socket={this.props.socket}
          setUser={this.setUser}
          setScreen={this.setScreen}
          pnToken="test"
        />
        break;
      case 'SEARCH':
        console.log('2');
        mainView = <SearchScreen
          socket={this.props.socket}
          //user={user}
          //furtherScreenHistory={furtherScreenHistory}
        />
        break;
      case 'GHOSTS':
          console.log('3');
          mainView = <GhostsScreen
            socket={this.props.socket}
            user={this.state.user}
            setGhost={this.setGhost}
            setScreen={this.setScreen}
          />
          break;
          case 'SELECTED_GHOST':
            console.log('4');
            mainView = <SelectedGhostScreen
              socket={this.props.socket}
              user={this.state.user}
              setGhost={this.setGhost}
              ghost={this.state.selectedGhost}
            />
            break;
      default:
        console.log('5');
        mainView = <LoginScreen
          socket={this.props.socket}
          setUser={this.setUser}
          setScreen={this.setScreen}
          //setUser={setUser}
          //furtherScreenHistory={furtherScreenHistory}
          pnToken="test"
        />
    }


    if (this.state.currentScreen === 'LOGIN') {
      return mainView;
    } else {
      return <TouchableOpacity
        onPress={() => { Keyboard.dismiss() }}
        style={this.system === 'Android' ? styles.androidScreen : styles.screen}
        activeOpacity={1}
      >
        <Header
          socket={this.props.socket}
          setUser={this.setUser}
          setScreen={this.setScreen}
          currentScreen={this.state.currentScreen}
          ghost={this.state.selectedGhost}
        />
        {mainView}
        {this.model === 'iPhone 11' ? <View style={{ height: 36, backgroundColor: 'black' }} /> : null}
      </TouchableOpacity>
    }

  }
} 

/*
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
        if(screenHistory.length > 1){
          if(screenHistory.length === 2){
            AsyncStorage.setItem('@autoLogin', 'FALSE');
          }
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
            furtherScreenHistory={furtherScreenHistory}
            />
            break;
        case 'PROFILE':
            console.log('2');
            mainView = <ProfileScreen
            socket={props.socket}
            user={user}
            furtherScreenHistory={furtherScreenHistory}
            />
            break;
        case 'GHOSTS':
            console.log('2');
            mainView = <GhostsScreen
            socket={props.socket}
            user={user}
            furtherScreenHistory={furtherScreenHistory}
            />
            break;
        case 'MY GHOSTS':
            console.log('2');
            mainView = <UserGhostsScreen
            socket={props.socket}
            user={user}
            furtherScreenHistory={furtherScreenHistory}
            />
            break;
        case 'CREATE GHOST':
            console.log('2');
            mainView = <CreateGhostScreen
            socket={props.socket}
            user={user}
            furtherScreenHistory={furtherScreenHistory}
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
      return <TouchableOpacity
              onPress={() => {Keyboard.dismiss()}}
              style={system === 'Android' ? styles.androidScreen : styles.screen}
              activeOpacity={1}
              >
              <NavigationHeader 
                  title={screenHistory[screenHistory.length - 1]}
                  leftIcon={ screenHistory.length > 2 ? 'chevron-thin-left' : 'log-out'}
                  leftIconFunction={goBackInHistory}
                  rightIcon="menu" 
                  rightIconFunction={() => {}}
              />
              {mainView}
              { model === 'iPhone 11' ? <View style={{height : 36, backgroundColor : 'black'}}/> : null }
            </TouchableOpacity>
    }
    
    
}
*/

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  androidScreen: {
    flex: 1,
  },

});

export default ScreenNavigation;