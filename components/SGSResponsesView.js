import React, { useState, Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import constyles from '../constants/constyles';
import Icon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../constants/colors';
import GhostsListViewRow from './GhostsListViewRow';
import SGSResponsesList from './SGSResponsesList';
import GenButton from './genButton';

class SGSResponsesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newResponseText : ''
        };
        this.selectResponse = this.selectResponse.bind(this);
        this.updateNewResponseText = this.updateNewResponseText.bind(this);
        this.submitNewResponseText = this.submitNewResponseText.bind(this);
    }

    selectResponse(response){
        console.log('response = ', response);
    }

    updateNewResponseText(e){
        console.log('updateNewResponseText e = ', e);
        this.setState({ newResponseText : e });
    }

    submitNewResponseText(){
        this.props.socket.emit('addResponseRequestToChatCard', {
            originChatCardId : this.props.chatCard._id,
            text : this.state.newResponseText,
            userId : this.props.user._id,
            ghostId : this.props.ghost._id
        });
        this.setState({ newResponseText : '' });
    }


    render() {
        if(this.props.user && this.props.chatCard){
        return  <View style={{...this.props.style}}>
                    <View style={{...constyles.genTextInputRowContainer, marginBottom : 0}}>
                        <TextInput
                        style={{...constyles.genTextInput}}
                        placeholder="Write Your Own Reply!"
                        returnKeyLabel="send"
                        onChangeText={this.updateNewResponseText}
                        onSubmitEditing={this.submitNewResponseText}
                        value={this.state.newResponseText}
                        />
                    </View>
                    { this.state.newResponseText && this.state.newResponseText.length > 0 ?
                    <View style={{flexDirection : 'row', marginHorizontal : 4}}>
                        <GenButton
                            title="Cancel"
                            onPress={()=>this.setState({ newResponseText : '' })}
                        />
                        <GenButton
                            title="Send"
                            onPress={this.submitNewResponseText}
                            style={constyles.activeButton}
                        />
                    </View>
                    : null }
                    { this.props.ghost.moderatorIds.includes(this.props.user._id) ?
                        <SGSResponsesList
                            socket={this.props.socket}
                            onSelect={this.props.onSelect}
                            user={this.props.user}
                            responses={this.props.chatCard.responseRequests}
                            ghost={this.props.ghost}
                        />
                    : null }
                    <SGSResponsesList
                        socket={this.props.socket}
                        onSelect={this.props.onSelect}
                        user={this.props.user}
                        responses={this.props.chatCard.responses}
                        ghost={this.props.ghost}
                    />
                    { !this.props.ghost.moderatorIds.includes(this.props.user._id) ?
                        <SGSResponsesList
                            socket={this.props.socket}
                            onSelect={this.props.onSelect}
                            user={this.props.user}
                            responses={this.props.chatCard.responseRequests}
                            ghost={this.props.ghost}
                        />
                    : null }
                    
                </View>
        } else {
            return null;
        }
    }

}

const styles = StyleSheet.create({

});

export default SGSResponsesView;