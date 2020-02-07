import React, { useState, Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import constyles from '../constants/constyles';
import Icon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../constants/colors';
import GhostsListViewRow from './GhostsListViewRow';
import SGSResponsesList from './SGSResponsesList';
import GenButton from './genButton';
import stringSimilarity from 'string-similarity';


class SGSResponsesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newResponseText : '',
            responsesList : []
        };
        this.selectResponse = this.selectResponse.bind(this);
        this.updateNewResponseText = this.updateNewResponseText.bind(this);
        this.submitNewResponseText = this.submitNewResponseText.bind(this);
    }

    componentDidMount(){
        if(this.props.chatCard){
            this.setState({responsesList : [...this.props.chatCard.responseRequests, ...this.props.chatCard.responses]});
        }
    }

    componentDidUpdate(prevProps){
        console.log('SGSResponsesView prevProps = ', prevProps);
        console.log('SGSResponsesView this.props = ', this.props);
        if((!prevProps.chatCard && this.props.chatCard) || 
            (prevProps.chatCard && this.props.chatCard && 
            (prevProps.chatCard.responses !== this.props.chatCard.responses ||
            prevProps.chatCard.responseRequests !== this.props.chatCard.responseRequests))){
            this.componentDidMount();
        }
    }

    selectResponse(response){
        console.log('response = ', response);
    }

    updateNewResponseText(filterString){
        console.log('updateNewResponseText filterString = ', filterString);
        let responsesClone = [...this.state.responsesList];
        responsesClone.sort((a, b) => {
            console.log('sort a = ', a.text);
            console.log('stringSimilarity.compareTwoStrings(a, filterString) = ', stringSimilarity.compareTwoStrings(a.text, filterString));
            console.log('sort b = ', b.text);
            console.log('stringSimilarity.compareTwoStrings(b, filterString) = ', stringSimilarity.compareTwoStrings(b.text, filterString));

            return stringSimilarity.compareTwoStrings(b.text, filterString) - stringSimilarity.compareTwoStrings(a.text, filterString);
        });
        this.setState({ newResponseText : filterString, responsesList : responsesClone });
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
                    
{/*paste here*/}
                        <SGSResponsesList
                            socket={this.props.socket}
                            onSelect={response=>this.setState({selectedResponse : response})}
                            selectedResponseId={this.state.selectedResponse ? this.state.selectedResponse._id : null}
                            user={this.props.user}
                            responses={this.state.responsesList}
                            ghost={this.props.ghost}
                        />
                    
                </View>
        } else {
            return null;
        }
    }

}

const styles = StyleSheet.create({

});

export default SGSResponsesView;

/*
copy here:

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
*/