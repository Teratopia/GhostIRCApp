import React, { useState, Component } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import constyles from '../constants/constyles';
import Icon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../constants/colors';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';   //
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';  //
import GhostSelectionModal from '../modals/GhostSelectionModal';
import GenButton from '../components/genButton';

class UserProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {

    }

    logOut() {
        this.props.setUser(null);
        this.props.setScreen('LOGIN');
    }

    render() {
        console.log('user = ', this.props.user);
        return <View style={{flex : 1, alignItems : 'center', justifyContent : 'center', padding : 24}}>
            <Text style={constyles.genH3Text}>
                {this.props.user.username}
            </Text>


            <View style={{flexDirection : 'row'}}>
                <GenButton
                    title="Log Out"
                    onPress={this.logOut}
                />
            </View>

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

export default UserProfileScreen;