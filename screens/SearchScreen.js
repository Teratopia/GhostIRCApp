import React, { useState, Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';   //
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';  //
import GenButton from '../components/genButton';
import Colors from '../constants/colors';
import constyles from '../constants/constyles';

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationNow: null,
      selectedLocationId: null,
      selectedGhost: null,
      ghosts: null,
      showModal: false
    };
    this.pressMarker = this.pressMarker.bind(this);
    this.requestAndroidLocationPermissions = this.requestAndroidLocationPermissions.bind(this);
    this.establishLocation = this.establishLocation.bind(this);
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.pressTalkToGhost = this.pressTalkToGhost.bind(this);
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

  establishLocation() {
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
        if (!this.state.ghosts) {
          this.props.socket.emit('getAllGhostsWithinRadius', {
            radiusInMeters: 200,
            centerLong: position.coords.longitude,
            centerLat: position.coords.latitude
          });
        }
      });
    }
  }

  componentDidMount() {
    this.props.socket.on('getAllGhostsWithinRadius', res => {
      console.log('getAllGhostsWithinRadius res= ', res);
      if (res.success) {
        this.setState({
          ghosts: res.locationsWithGhosts
        });
      }
    });
    this.props.socket.on('getAllGhostInfoById', res => {
      console.log('getAllGhostInfoById res= ', res);
      if (res.success) {
        this.setState({
          selectedGhost: res.ghost,
          showModal: true
        });
      }
    })
    if (PermissionsAndroid.check('ACCESS_FINE_LOCATION')) {
      this.establishLocation();
    } else {
      this.requestAndroidLocationPermissions();
    }
  }

  componentWillUnmount() {
    this.props.socket.removeListener('getAllGhostsWithinRadius');
  }

  onRegionChangeComplete(region){
    this.setState({
      locationNow : region
    })
  }

  pressMarker(location) {
    console.log('pressMarker location = ', location);
    this.props.socket.emit('getAllGhostInfoById', {
      ghostId: location.ghostId
    });
    this.setState({
      selectedLocationId: location._id
    });
  }

  pressTalkToGhost(){
    if(this.state.selectedGhost){
      this.props.setGhost(this.state.selectedGhost);
      this.props.setScreen('SELECTED_GHOST');
    }
  }

  render() {
    console.log('SearchScreen this.state.locationNow = ', this.state.locationNow);
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      {
        this.state.locationNow ?
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ width: '100%', height: '100%' }}
            initialRegion={this.state.locationNow}
            region={this.state.locationNow}
            showsUserLocation={true}
            followsUserLocation={true}
            showsMyLocationButton={true}
            onRegionChangeComplete={this.onRegionChangeComplete}
            //onUserLocationChange={onUserLocationChange}
            minZoomLevel={7}
          >
            {this.state.ghosts ?
              this.state.ghosts.map(location => (
                <MapView.Marker
                  key={location._id}
                  identifier={location._id}
                  coordinate={{
                    latitude: location.location.coordinates[1],
                    longitude: location.location.coordinates[0],
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.00421
                  }}
                  onPress={() => { this.pressMarker(location) }}
                  title={location.ghost ? location.ghost.name : null}
                />
              ))
              : null}
          </MapView>
          :
          null
      }

      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.showModal}
        onRequestClose={() => this.setState({ showModal: false, selectedGhost: null, selectedLocationId: null })}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ borderWidth: 1, borderColor: Colors.secondary, borderRadius: 8, backgroundColor: 'white', padding: 12 }}>
            <Text style={{...constyles.genH2Text, fontWeight : '200', textAlign : 'center'}}>
              {this.state.selectedGhost ? this.state.selectedGhost.name : null}
            </Text>
            <Text style={{...constyles.genH3Text, fontWeight : '200', textAlign : 'center'}}>
              {this.state.selectedGhost && 
               this.state.selectedGhost.baseChatCards && 
               this.state.selectedGhost.baseChatCards.length > 0 ? 
               this.state.selectedGhost.baseChatCards[0].text : null}
            </Text>
            <View style={{ flexDirection: 'row', minWidth: '50%', marginTop : 4, marginBottom : 0 }}>
              <GenButton
                title="Talk to Ghost"
                style={constyles.activeButton}
                onPress={() => this.pressTalkToGhost()}
              />
            </View>
            <View style={{ flexDirection: 'row', minWidth: '50%' }}>
              <GenButton
                title="Close"
                onPress={() => this.setState({ showModal: false, selectedGhost: null, selectedLocationId: null })}
              />
            </View>
          </View>

        </View>
      </Modal>


    </View>
  }

}

const styles = StyleSheet.create({
  rowContainer: {
    margin: 4,
    marginHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.secondary,
    padding: 4,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default SearchScreen;