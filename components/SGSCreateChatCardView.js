import React, { useState, Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, FlatList, Modal } from 'react-native';
import constyles from '../constants/constyles';
import Icon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import { getStatusBarHeight } from 'react-native-status-bar-height';    //
import DeviceInfo from 'react-native-device-info';
import Colors from '../constants/colors';
import GenButton from './genButton';
import moment from 'moment';

class SGSCreateChatCardView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatCardText : '',
            showRouteToChatCardModal : false,
            routingChatCard : null
        };
        this.model = DeviceInfo.getModel();
        this.submitNewChatCard = this.submitNewChatCard.bind(this);
        this.routeToExistingChatCard = this.routeToExistingChatCard.bind(this);
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

    routeToExistingChatCard(){
        console.log('routeToExistingChatCard chatCard = ', this.state.routingChatCard);
        this.props.socket.emit('routeResponseToExistingChatCard', {
            responseId : this.props.response._id,
            destinationCCId : this.state.routingChatCard._id,
            userId : this.props.user._id,
            ghostId : this.props.ghost._id
        })
        this.setState({showRouteToChatCardModal : false});
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
                    title="Route To Existing Card"
                    style={constyles.activeButton}
                    onPress={()=>this.setState({showRouteToChatCardModal : true})}
                />
            </View>
            <View style={{flexDirection : 'row'}}>
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

                { this.state.showRouteToChatCardModal ? 
                    <Modal transparent={false} style={{justifyContent : 'center', alignItems : 'center', flex : 1}}>
                        <View style={styles.screen}>
                        <FlatList
                    style={{ flex: 1, width: '100%' }}
                    data={this.props.ghost.chatCards}
                    renderItem={(chatCard) =>
                        <TouchableOpacity
                            onPress={() => this.setState({routingChatCard : chatCard.item})}
                            style={this.state.routingChatCard && chatCard.item._id === this.state.routingChatCard._id ? { ...styles.rowContainer, backgroundColor: Colors.secondaryFaded } : styles.rowContainer}>
                            <Text style={{...constyles.genH3Text, textAlign : 'center', color : 'black', fontWeight : '200'}}>
                                {chatCard.item.text}
                            </Text>
                        </TouchableOpacity>}
                    keyExtractor={chatCard => chatCard._id}
                />

                        <View style={{flexDirection : 'row'}}>
                                <GenButton
                                    title="Cancel"
                                    onPress={()=>this.setState({showRouteToChatCardModal : false})}
                                />
                                <GenButton
                                    title="Submit"
                                    disabled={!this.state.routingChatCard}
                                    onPress={this.routeToExistingChatCard}
                                    style={constyles.activeButton}
                                />
                            </View>
                            {this.model === 'iPhone 11' ? <View style={{ height: 36, backgroundColor: 'black' }} /> : null}
                            </View>
                    </Modal>
                : null }

        </KeyboardAvoidingView>
    }

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: getStatusBarHeight(),
      },
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

export default SGSCreateChatCardView;