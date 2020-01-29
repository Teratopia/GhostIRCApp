import React, { useState, Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import constyles from '../constants/constyles';
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';  //
import CheckBox from 'react-native-check-box';
import colors from '../constants/colors';
//import AsyncStorage from '@react-native-community/async-storage';
import { getStatusBarHeight } from 'react-native-status-bar-height';    //
import GhostsListView from '../components/GhostsListView';


class GhostsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ghostsSelection : this.props.latestGhostsList || 'userGhosts',
      userGhosts : [],
      befriendedGhosts : [],
      locationNow : null
    };
    this.onGhostSelect = this.onGhostSelect.bind(this);
    this.setGhostView = this.setGhostView.bind(this);
    this.requestAndroidLocationPermissions = this.requestAndroidLocationPermissions.bind(this);
    this.establishLocation = this.establishLocation.bind(this);
  }

  onGhostSelect(ghost){
    this.props.setGhost(ghost);
    this.props.setScreen('SELECTED_GHOST');
  }

  componentDidMount(){
    this.props.socket.on('getAllUserGhostInformationByUserId', res => {
      console.log('getAllUserGhostInformationByUserId res = ', res);
      if(res.success){
        this.setState({
          userGhosts : res.ghosts
        });
      }
    });
    this.props.socket.on('getAllBefriendedGhostsForUser', res => {
      console.log('getAllBefriendedGhostsForUser res = ', res);
      if(res.success){
        this.setState({
          befriendedGhosts : res.ghosts
        });
      }
    });
    this.props.socket.on('getAllNearbyGhosts', res => {
      console.log('getAllNearbyGhosts res = ', res);
      if(res.success){
        this.setState({
          nearbyGhosts : res.ghosts
        });
      }
    });
    this.setGhostView(this.state.ghostsSelection);
  }

  componentWillUnmount(){
    this.props.socket.removeListener('getAllUserGhostInformationByUserId');
    this.props.socket.removeListener('getAllBefriendedGhostsForUser');
  }

  async requestAndroidLocationPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Allow GhostIRC to Access Location',
          message:
            'GhostIRC can show you where ghosts are ' +
            'if you allow location access!',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        this.establishLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

 async establishLocation() {
    if (!this.state.locationNow) {
      Geolocation.getCurrentPosition(position => {
        console.log('establishLocation position = ', position);
        this.setState({
          locationNow: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421
          }
        });
        this.props.socket.emit('getAllNearbyGhosts', {
          radiusInMeters : 25,
          centerLong : position.coords.longitude,
          centerLat : position.coords.latitude
        });
      });
    }
  }

  setGhostView(ghostsSelection){
    if(ghostsSelection === 'friendlyGhosts'){
      this.props.socket.emit('getAllBefriendedGhostsForUser', {
        userId : this.props.user._id
      });
    } else if (ghostsSelection === 'nearbyGhosts'){
      if (PermissionsAndroid.check('ACCESS_FINE_LOCATION')) {
        if(!this.state.locationNow){
          this.establishLocation();
        } else {
          this.props.socket.emit('getAllNearbyGhosts', {
            radiusInMeters : 25,
            centerLong : this.state.locationNow.longitude,
            centerLat : this.state.locationNow.latitude
          });
        }
      } else {
        this.requestAndroidLocationPermissions();
      }
    } else {
      this.props.socket.emit('getAllUserGhostInformationByUserId', {
        userId : this.props.user._id
      });
    }
    this.props.setLatestGhostsList(ghostsSelection);
    this.setState({
      ghostsSelection : ghostsSelection
    });
  }

  render() {

    return <View style={{flex : 1}}>
      <View style={constyles.genTextInputRowContainer}>
        <TextInput
          style={{...constyles.genTextInput}}
          placeholder="Search Ghosts"
        />
      </View>
      <View style={{flexDirection : 'row', borderRadius : 8, marginHorizontal : 8}}>
        <TouchableOpacity 
        onPress={()=>this.setGhostView('userGhosts')}
        style={this.state.ghostsSelection === 'userGhosts' ? {...styles.activeButton, borderBottomLeftRadius : 8, borderTopLeftRadius : 8} : {...styles.inactiveButton, borderBottomLeftRadius : 8, borderTopLeftRadius : 8} }>
          <Text style={styles.buttonText}>
            My Ghosts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>this.setGhostView('friendlyGhosts')}
        style={this.state.ghostsSelection === 'friendlyGhosts' ? styles.activeButton : styles.inactiveButton }>
          <Text style={styles.buttonText}>
            Friendly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>this.setGhostView('nearbyGhosts')}
        style={this.state.ghostsSelection === 'nearbyGhosts' ? {...styles.activeButton, borderTopRightRadius : 8, borderBottomRightRadius : 8} : {...styles.inactiveButton, borderTopRightRadius : 8, borderBottomRightRadius : 8} }>
          <Text style={styles.buttonText}>
            Nearby
          </Text>
        </TouchableOpacity>
      </View>

    {this.state.userGhosts && this.state.ghostsSelection === 'userGhosts' ?
      <GhostsListView
        style={{marginTop : 4}}
        ghosts={this.state.userGhosts}
        onSelect={this.onGhostSelect}
      />
    : this.state.befriendedGhosts && this.state.ghostsSelection === 'friendlyGhosts' ?
      <GhostsListView
        style={{marginTop : 4}}
        ghosts={this.state.befriendedGhosts}
        onSelect={this.onGhostSelect}
      />
    : this.state.nearbyGhosts && this.state.ghostsSelection === 'nearbyGhosts' ?
      <GhostsListView
        style={{marginTop : 4}}
        ghosts={this.state.nearbyGhosts}
        onSelect={this.onGhostSelect}
      />
    : null }


    </View>

  }
} 

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  androidScreen: {
    flex: 1,
  },
  inactiveButton : {
    flex : 1, 
    alignItems : 'center', 
    justifyContent : 'center',
    padding : 8,
    backgroundColor : colors.secondary
  },
  activeButton : {
    flex : 1, 
    alignItems : 'center', 
    justifyContent : 'center',
    padding : 8,
    backgroundColor : colors.primary
  },
  buttonText : {
    color : 'white',
    fontSize : 22,
    fontWeight : '600',
    textAlign : 'center'
  }

});

export default GhostsScreen;