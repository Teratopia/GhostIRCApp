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

class ChatCardListRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedChatCard: null,
            searchText : ''
        };
        this.pressRow = this.pressRow.bind(this);
        this.jumpToChatCard = this.jumpToChatCard.bind(this);
    }

    componentDidMount() {
        console.log('SelectedGhostChatCardsScreen this.state.chatCards = ', this.state.chatCards);
        if (this.props.chatCard && this.props.chatCards.responseRequests.length > 0) {
            console.log('SelectedGhostChatCardsScreen 2 ');
            this.setState({
                unhandledResponses: this.props.chatCards[0]
            });
        }
    }

    render() {
                return <TouchableOpacity
                            onPress={() => { this.props.pressRow(this.props.chatCard) }}
                            style={this.props.chatCard._id === this.state.selectedChatCard._id ? { ...styles.rowContainer, backgroundColor: Colors.secondaryFaded } : styles.rowContainer}>
                            <Text style={{...constyles.genH3Text, textAlign : 'center', color : 'black', fontWeight : '200'}}>
                                {this.props.chatCard.text}
                            </Text>
                        </TouchableOpacity>
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

export default ChatCardListRow;