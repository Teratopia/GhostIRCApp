import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';   //
import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';  //

const SearchScreen = props => {

  const [locNow, setLocNow] = useState();

  async function requestAndroidLocationPermissions() {
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
        establishLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  if(PermissionsAndroid.check('ACCESS_FINE_LOCATION')){
    establishLocation();
  } else {
    requestAndroidLocationPermissions();
  }

  async function establishLocation(){
    if(!locNow){

      Geolocation.getCurrentPosition(position => {
        console.log('establishLocation position = ', position);
        setLocNow({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421
        });
      });
    }
  }
  

    return  <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
              {
                locNow ? 
                <MapView 
                  provider={PROVIDER_GOOGLE} 
                  style={{width : '100%', height : '100%'}}
                  initialRegion={locNow}
                  region={locNow}
                  showsUserLocation={true}
                  followsUserLocation={true}
                  showsMyLocationButton={true}
                  //onRegionChangeComplete={onRegionChangeComplete}
                  //onUserLocationChange={onUserLocationChange}
                  minZoomLevel={7}
                />
                :
                null
              }
            </View>
}

const styles = StyleSheet.create({
    screen : {
      flex:1,
    },

});

export default SearchScreen;