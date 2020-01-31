import React, { useState, Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import constyles from '../constants/constyles';
import Icon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../constants/colors';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';   //
import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';  //
import GenButton from '../components/genButton';
import GhostSelectionModal from '../modals/GhostSelectionModal';

class SelectedGhostLocationsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationNow : null
        };
        this.pressRow = this.pressRow.bind(this);
    }

    componentDidMount(){
        console.log('SelectedGhostLocationsScreen this.props.ghost = ', this.props.ghost);
        if(this.props.ghost && this.props.ghost.locations && this.props.ghost.locations.length > 0){
            console.log('SelectedGhostLocationsScreen 2 ');
            this.setState({
                locationNow : {
                    latitude: this.props.ghost.locations[0].location.coordinates[1],
                    longitude: this.props.ghost.locations[0].location.coordinates[0],
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.00421,
                    _id : this.props.ghost.locations[0]._id
                },
                selectedLocationId : this.props.ghost.locations[0]._id
            });
        }
    }

    pressRow(location){
        console.log('location = ', location);
        this.setState({
            locationNow : {
                latitude: location.location.coordinates[1],
                longitude: location.location.coordinates[0],
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421
            },
            selectedLocationId : location._id
        });
    }


    render() {
        console.log('SelectedGhostLocationsScreen this.state.locationNow = ', this.state.locationNow);
        return <View style={{flex : 1, justifyContent : 'center', alignItems : 'center', width : '100%'}}>
        <View style={{flex : 1, justifyContent : 'center', alignItems : 'center', width : '100%'}}>
              {
                this.state.locationNow ? 
                <MapView 
                  provider={PROVIDER_GOOGLE} 
                  style={{width : '100%', height : '100%'}}
                  initialRegion={this.state.locationNow}
                  region={this.state.locationNow}
                  showsUserLocation={true}
                  followsUserLocation={true}
                  showsMyLocationButton={true}
                  //onRegionChangeComplete={onRegionChangeComplete}
                  //onUserLocationChange={onUserLocationChange}
                  minZoomLevel={7}
                >
{
                            this.props.ghost.locations.map(location => (
                                <MapView.Marker
                                key={location._id}
                                identifier={location._id}
                                coordinate={{
                                    latitude : location.location.coordinates[1], 
                                    longitude : location.location.coordinates[0], 
                                    latitudeDelta: 0.00922,
                                    longitudeDelta: 0.00421}}
                                onPress={()=>{this.pressRow(location)}}
                                />
                            ))
                    }
                    </MapView>
                :
                null
              }
        </View>
        <View style={{flex : 1, width : '100%'}}>
              <View style={{flexDirection : 'row'}}>
                <GenButton title="Delete Location" onPress={() => {}} />
                <GenButton title="Add Location" style={constyles.activeButton} onPress={() => {}} />
              </View>
              {
                  this.props.ghost.locations.map(location => {

                    return  <TouchableOpacity 
                                onPress={()=>{this.pressRow(location)}}
                                style={location._id === this.state.selectedLocationId ? {...styles.rowContainer, backgroundColor : Colors.secondaryFaded} : styles.rowContainer}>
                                <Text style={{...constyles.genH3Text, textAlign : 'center'}}>
                                    {location.location.coordinates[1].toFixed(3)}, {location.location.coordinates[0].toFixed(3)}
                                </Text>
                            </TouchableOpacity>
                  })
              }
        </View>
        { this.props.showModal ? 
            <GhostSelectionModal
            socket={this.props.socket}
            ghost={this.props.ghost}
            setScreen={this.props.setScreen}
            setShowModal={this.props.setShowModal}
            user={this.props.user}
            />
        : null }
      </View>
    }

}

const styles = StyleSheet.create({
    rowContainer : {
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

export default SelectedGhostLocationsScreen;