import React, { useState, Component } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import constyles from '../constants/constyles';
import Colors from '../constants/colors';
import GhostSelectionModal from '../modals/GhostSelectionModal';
import stringSimilarity from 'string-similarity';
import GenButton from '../components/genButton';

class SelectedGhostChatCardsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedChatCard: null,
            searchText : '',
            chatCardsList : []
        };
        this.pressRow = this.pressRow.bind(this);
        this.jumpToChatCard = this.jumpToChatCard.bind(this);
        this.updateSearchString = this.updateSearchString.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
    }

    componentDidMount() {
        console.log('SelectedGhostChatCardsScreen this.state.chatCards = ', this.state.chatCards);
        if (this.props.chatCards && this.props.chatCards.length > 0) {
            console.log('SelectedGhostChatCardsScreen 2 ');
            this.setState({
                selectedChatCard: this.props.chatCards[0],
                chatCardsList : this.props.chatCards
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

    updateSearchString(filterString){
        console.log('updateNewResponseText filterString = ', filterString);
        let chatCardsClone = [...this.state.chatCardsList];
        chatCardsClone.sort((a, b) => {
            console.log('sort a = ', a.text);
            console.log('stringSimilarity.compareTwoStrings(a, filterString) = ', stringSimilarity.compareTwoStrings(a.text, filterString));
            console.log('sort b = ', b.text);
            console.log('stringSimilarity.compareTwoStrings(b, filterString) = ', stringSimilarity.compareTwoStrings(b.text, filterString));
            return stringSimilarity.compareTwoStrings(b.text, filterString) - stringSimilarity.compareTwoStrings(a.text, filterString);
        });
        this.setState({
            chatCardsList : chatCardsClone,
            searchText : filterString
        });
    }

    clearSearch(){
        this.setState({
            chatCardsList : this.props.chatCards,
            searchText : ''
        });
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
                        onChangeText={this.updateSearchString}
                        onSubmitEditing={()=>{}}
                        value={this.state.searchText}
                        />
                    </View>
                    { this.state.searchText.length > 0 ? 
                        <View style={{flexDirection : 'row', marginHorizontal : 4}}>
                        <GenButton
                            title="Clear"
                            onPress={this.clearSearch}
                        />
                        {/*<GenButton
                            title="Search"
                            onPress={()=>{}}
                            style={constyles.activeButton}
                        />*/}
                    </View>
                    : null }
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
                    data={this.state.chatCardsList}
                    renderItem={(chatCard) =>
                        <TouchableOpacity
                            onPress={() => { this.pressRow(chatCard.item) }}
                            style={chatCard.item._id === this.state.selectedChatCard._id ? 
                            { ...styles.rowContainer, backgroundColor: Colors.tertiaryFaded } 
                            : chatCard.item.responseRequests.length > 0 ? 
                            { ...styles.rowContainer, backgroundColor: Colors.secondaryFaded }
                            : styles.rowContainer}>
                            <Text style={{...constyles.genH3Text, textAlign : 'center', color : 'black', fontWeight : '200'}}>
                                {chatCard.item.text}
                            </Text>

                            <View style={{flexDirection : 'row'}}>
                                <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center', flex : 1}}>
                                    <Text style={constyles.genH6Text}>
                                        Response Requests: 
                                    </Text>
                                    <Text style={{...constyles.genH5Text, marginLeft : 4}}>
                                        {chatCard.item.responseRequests.length}
                                    </Text>
                                </View>
                                <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center', flex : 1}}>
                                    <Text style={constyles.genH6Text}>
                                        Handled Responses: 
                                    </Text>
                                    <Text style={{...constyles.genH5Text, marginLeft : 4}}>
                                        {chatCard.item.responses.length}
                                    </Text>
                                </View>
                            </View>
                            
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
        //flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default SelectedGhostChatCardsScreen;