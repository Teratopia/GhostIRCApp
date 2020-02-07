import React, { useState, Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import constyles from '../constants/constyles';
import Icon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../constants/colors';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';   //
import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';  //
import GenButton from '../components/genButton';
import GhostSelectionModal from '../modals/GhostSelectionModal';
import { getStatusBarHeight } from 'react-native-status-bar-height';    //


class SelectedGhostLocationsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationNow : null,
            newLocationReasonText : null,
            showLocationRequestModal : false,
            locationRequests : [],
            userLocationRequests : []
        };
        this.pressRow = this.pressRow.bind(this);
        this.postLocationRequest = this.postLocationRequest.bind(this);
        this.props.socket.on('locationRequestPosted', res => {
            console.log('locationRequestPosted res = ', res);
        });
        this.props.socket.on('getLocationRequestsForGhostResponse', res => {
            console.log('getLocationRequestsForGhostResponse res = ', res);
            if(res.success){
                this.setState({locationRequests : res.locationRequests});
            }
        });
        this.props.socket.on('getLocationRequestsForGhostAndUserResponse', res => {
            console.log('getLocationRequestsForGhostAndUserResponse res = ', res);
            if(res.success){
                this.setState({userLocationRequests : res.locationRequests});
            }
        });
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
        this.props.ghost.moderatorIds.includes(this.props.user._id) ?
        this.props.socket.emit('getLocationRequestsForGhost', {
            ghostId : this.props.ghost._id
        })
        :
        this.props.socket.emit('getLocationRequestsForGhostAndUser', {
            ghostId : this.props.ghost._id,
            userId : this.props.user._id
        });
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

    postLocationRequest(){
        Geolocation.getCurrentPosition(position => {
            console.log('createSprite position = ', position);
              this.props.socket.emit('postLocationRequest', {
                ghostId : this.props.ghost._id,
                userId : this.props.user._id,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                reason : this.state.newLocationReasonText
              });
              this.setState({newLocationReasonText : null, showLocationRequestModal : false});
          });
    }

    componentWillUnmount(){
        this.props.socket.removeListener('locationRequestPosted');
        this.props.socket.removeListener('getLocationRequestsForGhost');
        this.props.socket.removeListener('getLocationRequestsForGhostAndUser');
    }

    render() {
        //console.log('SelectedGhostLocationsScreen this.state.locationNow = ', this.state.locationNow);
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
                    {this.props.ghost.moderatorIds.includes(this.props.user._id) ?
                    this.state.locationRequests.map(location => (
                        <MapView.Marker
                        pinColor={'green'}
                        key={location.ghostId+''+location.latitude+location.longitude}
                        key={location.ghostId+''+location.latitude+location.longitude}
                        coordinate={{
                            latitude : location.latitude, 
                            longitude : location.longitude, 
                            latitudeDelta: 0.00922,
                            longitudeDelta: 0.00421}}
                        onPress={()=>{this.pressRow(location)}}
                        />
                    ))
                    :
                    this.state.userLocationRequests.map(location => (
                        <MapView.Marker
                        pinColor={'blue'}
                        key={location.ghostId+''+location.userId+location.latitude+location.longitude}
                        identifier={location.ghostId+''+location.userId+location.latitude+location.longitude}
                        coordinate={{
                            latitude : location.latitude, 
                            longitude : location.longitude, 
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
            {
                this.props.ghost.moderatorIds.includes(this.props.user._id) ? 
                <View style={{flexDirection : 'row', marginHorizontal : 4, marginTop : 4}}>
                    <GenButton title="Delete Location" onPress={() => {}} />
                    <GenButton title="Add Location" style={constyles.activeButton} onPress={()=>this.setState({showLocationRequestModal : true})} />
                </View>
                :
                <View style={{flexDirection : 'row', marginHorizontal : 4, marginTop : 4}}>
                    <GenButton title="Request New Location" onPress={()=>this.setState({showLocationRequestModal : true})} />
                </View>
            }
              
              {
                  this.props.ghost.locations.map(location => {

                    return  <TouchableOpacity 
                                onPress={()=>{this.pressRow(location)}}
                                style={location._id === this.state.selectedLocationId ? {...styles.rowContainer, backgroundColor : Colors.tertiaryFaded} : styles.rowContainer}>
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
        { this.state.showLocationRequestModal ?
            <Modal
            animationType="slide"
            transparent={false}
            visible={true}
            onRequestClose={()=>this.setState({showLocationRequestModal : false})}>
                <View style={styles.modalContainer}>
                    <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                        <Text style={{...constyles.genH3Text, textAlign : 'center'}}>
                            Send a request to this ghost's moderators for the ghost to appear at your current location. Please explain what makes this location unique and relevant to the ghost, and why it would be beneficial for the ghost to appear here.
                        </Text>
                    </View>
                        <TextInput
                            style={{...constyles.genTextInput, textAlign : 'left', padding : 12, paddingTop : 12, marginHorizontal : 8, flex : 1}}
                            placeholder="Tell the ghost moderators why this ghost should appear at this location!"
                            onChangeText={e=>this.setState({newLocationReasonText : e})}
                            multiline={true}
                        />

                <View style={{flexDirection : 'row', marginHorizontal : 4}}>
                    <GenButton title="Cancel" onPress={()=>this.setState({showLocationRequestModal : false, newLocationReasonText : null})} />
                    <GenButton 
                        disabled={!this.state.newLocationReasonText}
                        title="Submit" style={constyles.activeButton} onPress={this.postLocationRequest} />
                </View>
                </View>
            </Modal>
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
    },
    modalContainer : {
        marginVertical: getStatusBarHeight(),
        flex : 1, 
        marginHorizontal : 12
    }
});

export default SelectedGhostLocationsScreen;