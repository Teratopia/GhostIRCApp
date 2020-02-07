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
import GenButton from '../components/genButton';

class GhostsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ghostsSelection : this.props.latestGhostsList || 'userGhosts',
      userGhosts : [],
      befriendedGhosts : [],
      restedGhosts : [],
      silencedGhosts : [],
      isViewingRestedGhosts : false,
      isViewingSilencedGhosts : true,
      locationNow : null
    };
    this.onGhostSelect = this.onGhostSelect.bind(this);
    this.setGhostView = this.setGhostView.bind(this);
    this.requestAndroidLocationPermissions = this.requestAndroidLocationPermissions.bind(this);
    this.establishLocation = this.establishLocation.bind(this);
    this.viewSilencedGhosts = this.viewSilencedGhosts.bind(this);
    this.viewRestedGhosts = this.viewRestedGhosts.bind(this);
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
    this.props.socket.on('getAllUserRestedGhostInformationByUserId', res => {
      console.log('getAllUserRestedGhostInformationByUserId res = ', res);
      if(res.success){
        this.setState({
          restedGhosts : res.ghosts
        });
      }
    });
    this.props.socket.on('getAllUserSilencedGhostInformationByUserId', res => {
      console.log('getAllUserSilencedGhostInformationByUserId res = ', res);
      if(res.success){
        this.setState({
          silencedGhosts : res.ghosts
        });
      }
    });
    this.setGhostView(this.state.ghostsSelection);
  }

  componentDidUpdate(prevProps){
    if(this.props.ghost && this.props.ghost.status && this.props.ghost !== prevProps.ghost){
      this.setGhostView(this.state.ghostsSelection);
    }
  }

  componentWillUnmount(){
    this.props.socket.removeListener('getAllUserGhostInformationByUserId');
    this.props.socket.removeListener('getAllBefriendedGhostsForUser');
    this.props.socket.removeListener('getAllNearbyGhosts');
    this.props.socket.removeListener('getAllUserRestedGhostInformationByUserId');
    this.props.socket.removeListener('getAllUserSilencedGhostInformationByUserId');
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
      this.props.socket.emit('getAllUserSilencedGhostInformationByUserId', {
        userId : this.props.user._id
      });
    }
    this.props.setLatestGhostsList(ghostsSelection);
    this.setState({
      ghostsSelection : ghostsSelection
    });
  }

  viewRestedGhosts(){
    this.setState({isViewingRestedGhosts : !this.state.isViewingRestedGhosts});
    if(this.state.restedGhosts.length === 0){
      this.props.socket.emit('getAllUserRestedGhostInformationByUserId', {
        userId : this.props.user._id
      });
    }
  }

  viewSilencedGhosts(){
    this.setState({isViewingSilencedGhosts : !this.state.isViewingSilencedGhosts});
    if(this.state.silencedGhosts.length === 0){
      this.props.socket.emit('getAllUserSilencedGhostInformationByUserId', {
        userId : this.props.user._id
      });
    }
  }

  render() {

    console.log('ghostsScreen props.user = ', this.props.user);

    return <View style={{flex : 1}}>
      { this.props.showModal ? 
        <View>
          <Text style={{...constyles.genH5Text, textAlign : 'center'}}>
            Include
          </Text>
          <View style={{flexDirection : 'row', marginHorizontal : 4}}>
            <GenButton
              title="RESTED"
              onPress={this.viewRestedGhosts}
              style={this.state.isViewingRestedGhosts ? constyles.activeButton : constyles.inactiveButton}
              />
            <GenButton
              title="SILENCED"
              onPress={this.viewSilencedGhosts}
              style={this.state.isViewingSilencedGhosts ? constyles.activeButton : constyles.inactiveButton}
              />
          </View>
          <View style={{...constyles.genTextInputRowContainer, marginTop : 0}}>
            <TextInput
              style={{...constyles.genTextInput}}
              placeholder="Search Ghosts"
            />
          </View>
        </View>
      : <View style={{height : 4}}/> }
      
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
      <View style={{flex : 1}}>
        <View style={{flexDirection : 'row', borderRadius : 8, marginHorizontal : 4, marginTop : 4}}>
          <TouchableOpacity 
            onPress={()=>this.props.setScreen('CREATE_GHOST')}
            style={{...constyles.activeButton, backgroundColor : colors.tertiary, borderRadius : 8, marginBottom : 0, padding : 4}}>
            <Text style={styles.buttonText}>
              Create Ghost
            </Text>
          </TouchableOpacity>
        </View>
        <GhostsListView
          style={{marginTop : 4}}
          ghosts={this.state.userGhosts}
          onSelect={this.onGhostSelect}
        />
        { this.state.isViewingRestedGhosts ? 
          <GhostsListView
            //style={{marginTop : 4}}
            ghosts={this.state.restedGhosts}
            onSelect={this.onGhostSelect}
          />
        : null }
        { this.state.isViewingSilencedGhosts ? 
          <GhostsListView
            //style={{marginTop : 4}}
            ghosts={this.state.silencedGhosts}
            onSelect={this.onGhostSelect}
          />
        : null }
        
      </View>
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