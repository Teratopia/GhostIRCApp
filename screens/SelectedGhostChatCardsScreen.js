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

class SelectedGhostChatCardsScreen extends Component {
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
        if (this.props.chatCards && this.props.chatCards.length > 0) {
            console.log('SelectedGhostChatCardsScreen 2 ');
            this.setState({
                selectedChatCard: this.props.chatCards[0]
            });
        }
    }

    pressRow(chatCard) {
        console.log('chatCard = ', chatCard);
        this.setState({
            selectedChatCard : chatCard
        });
    }

    jumpToChatCard(){
        if(this.state.selectedChatCard){
            this.props.setJumpToChatCard(this.state.selectedChatCard);
            this.props.setScreen('SELECTED_GHOST');
        }
    }


    render() {
        if (this.state.selectedChatCard) {
            console.log('SelectedGhostChatCardsScreen this.props.chatCards = ', this.props.chatCards);
            console.log('SelectedGhostChatCardsScreen this.state.selectedChatCard = ', this.state.selectedChatCard);
            return <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>

                    <View style={{...constyles.genTextInputRowContainer, marginBottom : 0}}>
                        <TextInput
                        style={{...constyles.genTextInput}}
                        placeholder="Search Cards"
                        onChangeText={e=>this.setState({ searchText : e })}
                        onSubmitEditing={()=>{}}
                        value={this.state.searchText}
                        />
                    </View>
                    <View style={{flexDirection : 'row', marginHorizontal : 4}}>
                        <GenButton
                            title="Clear"
                            onPress={()=>this.setState({ searchText : '' })}
                        />
                        <GenButton
                            title="Search"
                            onPress={()=>{}}
                            style={constyles.activeButton}
                        />
                    </View>
                    <View style={{flexDirection : 'row', marginHorizontal : 4}}>
                        <GenButton
                            title="Jump To Card"
                            onPress={this.jumpToChatCard}
                            style={constyles.activeButton}
                            disabled={!this.state.selectedChatCard}
                        />
                    </View>

                <FlatList
                style={{ flex: 1, width: '100%' }}
                    data={this.props.chatCards}
                    renderItem={(chatCard) =>
                        <TouchableOpacity
                            onPress={() => { this.pressRow(chatCard.item) }}
                            style={chatCard.item._id === this.state.selectedChatCard._id ? { ...styles.rowContainer, backgroundColor: Colors.secondaryFaded } : styles.rowContainer}>
                            <Text style={{...constyles.genH3Text, textAlign : 'center', color : 'black', fontWeight : '200'}}>
                                {chatCard.item.text}
                            </Text>
                        </TouchableOpacity>}
                    keyExtractor={chatCard => chatCard._id}
                />
                { this.props.showModal ? 
            <GhostSelectionModal
                socket={this.props.socket}
                ghost={this.props.ghost}
                setScreen={this.props.setScreen}
                setShowModal={this.props.setShowModal}
                user={this.props.user}
                />
            : null }
            </SafeAreaView>
        } else {
            return null;
        }

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

export default SelectedGhostChatCardsScreen;