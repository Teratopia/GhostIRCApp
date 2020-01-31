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
import SelectedGhostLocationsScreen from './SelectedGhostLocationsScreen';
import SelectedGhostChatCardsScreen from './SelectedGhostChatCardsScreen';


class ScreenNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: 'LOGIN',
      user: null,
      selectedGhost: null,
      latestGhostsList : null,
      showModal : false,
      jumpToChatCard : null
    };

    this.setUser = this.setUser.bind(this);
    this.setScreen = this.setScreen.bind(this);
    this.setGhost = this.setGhost.bind(this);
    this.resetGhost = this.resetGhost.bind(this);
    this.system = DeviceInfo.getSystemName();
    this.model = DeviceInfo.getModel();
  }

  componentDidMount() {
    this.props.socket.on('responseRequestAdded', this.resetGhost);
    this.props.socket.on('responseRoutedToExistingChatCard', this.resetGhost);
    this.props.socket.on('responseRated', this.resetGhost);
    this.props.socket.on('chatCardRated', this.resetGhost);
    this.props.socket.on('ghostRated', this.resetGhost);
    this.props.socket.on('responseDeleted', this.resetGhost);
    this.props.socket.on('chatCardDeleted', this.resetGhost);
    this.props.socket.on('updateUser', res => {
      console.log('updateUser res = ', res);
      if(res.success){
        this.setUser(res.user);
      }
    });
  }

  resetGhost(res) {
    console.log('resetGhost res = ', res);
    if (res.success) {
      this.setGhost(res.ghost);
    }
  }

  componentWillUnmount() {
    this.props.socket.removeListener('responseRequestAdded');
    this.props.socket.removeListener('responseRoutedToExistingChatCard');
    this.props.socket.removeListener('responseRated');
    this.props.socket.removeListener('chatCardRated');
    this.props.socket.removeListener('ghostRated');
    this.props.socket.removeListener('responseDeleted');
    this.props.socket.removeListener('chatCardDeleted');
    this.props.socket.removeListener('updateUser');
  }

  setUser(user) {
    this.setState({
      user: user
    });
  }

  setScreen(screen) {
    console.log('setScreen screen = ', screen);
    if (screen === 'SELECTED_GHOST'
     || screen === 'SELECTED_GHOST_LOCATIONS'
     || screen === 'SELECTED_GHOST_CHAT_CARDS') {
      this.setState({
        currentScreen: screen,
        showModal : false
      })
    } else {
      this.setState({
        selectedGhost: null,
        showModal : false,
        currentScreen: screen
      });
    }
  }

  setGhost(ghost) {
    this.setState({
      selectedGhost: ghost
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
          setGhost={this.setGhost}
          setScreen={this.setScreen}
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
          setLatestGhostsList={selection => this.setState({ latestGhostsList : selection})}
          latestGhostsList={this.state.latestGhostsList}
          setShowModal={bool => this.setState({showModal : bool})}
          showModal={this.state.showModal}
        />
        break;
      case 'SELECTED_GHOST':
        console.log('4');
        console.log('this.state.jumpToChatCard = ', this.state.jumpToChatCard);
        mainView = <SelectedGhostScreen
          socket={this.props.socket}
          user={this.state.user}
          setGhost={this.setGhost}
          ghost={this.state.selectedGhost}
          setScreen={this.setScreen}
          setShowModal={bool => this.setState({showModal : bool})}
          showModal={this.state.showModal}
          jumpToChatCard={this.state.jumpToChatCard}
          setJumpToChatCard={chatCard => this.setState({jumpToChatCard : chatCard})}
        />
        break;
      case 'SELECTED_GHOST_LOCATIONS':
        console.log('5');
        mainView = <SelectedGhostLocationsScreen
        socket={this.props.socket}
        user={this.state.user}
        setGhost={this.setGhost}
        ghost={this.state.selectedGhost}
        setScreen={this.setScreen}
        setShowModal={bool => this.setState({showModal : bool})}
        showModal={this.state.showModal}
        />
        break;
      case 'SELECTED_GHOST_CHAT_CARDS':
         
          console.log('6');
          mainView = <SelectedGhostChatCardsScreen
          socket={this.props.socket}
          user={this.state.user}
          ghost={this.state.selectedGhost}
          chatCards={this.state.selectedGhost.chatCards}
          setScreen={this.setScreen}
          setShowModal={bool => this.setState({showModal : bool})}
          showModal={this.state.showModal}
          jumpToChatCard={this.state.jumpToChatCard}
          setJumpToChatCard={chatCard => this.setState({jumpToChatCard : chatCard})}
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
          setShowModal={bool => this.setState({showModal : bool})}
          showModal={this.state.showModal}
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