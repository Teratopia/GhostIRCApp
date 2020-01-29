import React, { useState, Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import constyles from '../constants/constyles';
import Icon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../constants/colors';
import GenButton from './genButton';
import moment from 'moment';

class SGSCreateChatCardView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatCardText : ''
        };
        this.submitNewChatCard = this.submitNewChatCard.bind(this);
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    submitNewChatCard(){
        console.log('submite new chat card 1 this.state.chatCardText = ', this.state.chatCardText);
        if(this.state.chatCardText && this.state.chatCardText.length > 0){
            this.props.socket.emit('createNewChatCard', {
                ghostId : this.props.ghost._id,
                userId : this.props.user._id,
                text : this.state.chatCardText,
                responseId : this.props.response._id
            });
        }
    }

    render() {
        return <KeyboardAvoidingView style={{flex : 1, marginHorizontal : 24, marginVertical : 12}} behavior="padding" enabled keyboardVerticalOffset={92}> 
            <View style={{marginBottom : 8}}>
                <Text style={{...constyles.genH6Text, textAlign : 'center'}}>
                    Write a response to...
                </Text>
                <Text style={{...constyles.genH3Text, textAlign : 'center'}}>
                    {this.props.response.text}
                </Text>
            </View>
            <TextInput
                placeholder="Create a new chat card!"
                style={{...constyles.genH3Text, 
                    fontWeight : '200', 
                    textAlign : 'center', 
                    flex : 1, 
                    justifyContent : 'center', 
                    alignItems : 'center',
                    borderWidth : 1,
                    borderColor : Colors.secondary,
                    borderRadius : 8,
                    padding : 12
                }}
                onChangeText={e=>this.setState({chatCardText : e})}
                //onSubmitEditing={this.submitNewChatCard}
                multiline={true}

            />
            <View style={{flexDirection : 'row', marginTop : 4}}>
                <GenButton
                    title="Bibliography"
                    onPress={()=>{}}
                />
            </View>
            <View style={{flexDirection : 'row'}}>
                <GenButton
                    title="Cancel"
                    onPress={this.props.nullifyResponseBeingHandled}
                />
                <GenButton
                    title="Submit"
                    onPress={this.submitNewChatCard}
                    style={constyles.activeButton}
                />
            </View>
        </KeyboardAvoidingView>
    }

}

const styles = StyleSheet.create({

});

export default SGSCreateChatCardView;