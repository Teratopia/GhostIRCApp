import React, { useState, Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import constyles from '../constants/constyles';
import Icon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../constants/colors';
import GenButton from '../components/genButton';
import moment from 'moment';

class GhostSelectionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.befriendGhost = this.befriendGhost.bind(this);
        this.unfriendGhost = this.unfriendGhost.bind(this);
        this.updateGhostStatus = this.updateGhostStatus.bind(this);
    }

    componentDidMount(){

    }

    componentDidUpdate(prevProps){

    }

    befriendGhost(){
        this.props.socket.emit('befriendGhost', {
            ghostId : this.props.ghost._id,
            userId : this.props.user._id
        });
        this.props.setShowModal(false);
    }

    unfriendGhost(){
        this.props.socket.emit('unfriendGhost', {
            ghostId : this.props.ghost._id,
            userId : this.props.user._id
        });
        this.props.setShowModal(false);
    }

    updateGhostStatus(status){
        this.props.socket.emit('updateGhostStatus', {
            ghostId : this.props.ghost._id,
            status : status
        });
        this.props.setShowModal(false);
    }

    render() {
        console.log('Foo');
        console.log('GhostSelectionModal 2');
        console.log('user = ', this.props.user);
        console.log('ghost = ', this.props.ghost);
            return <Modal
                animationType="slide"
                transparent={false}
                visible={true}
                onRequestClose={()=>this.props.setShowModal(false)}>
                <View style={{marginTop: 22, flex : 1, justifyContent : 'center', alignItems : 'center', padding : 24}}>
                    <View style={{flex : 1, justifyContent : 'center', alignItems : 'center', width : '100%'}}>
                        <Text style={{...constyles.genH2Text, textAlign : 'center', fontWeight : '200'}}>
                            {this.props.ghost.name}
                        </Text>
                        <Text style={{...constyles.genH6Text, textAlign : 'center', fontWeight : '200', marginTop : 4}}>
                            Created {moment(this.props.ghost.createDate).format("MMM Do YYYY")}
                        </Text>
                        <Text style={{...constyles.genH6Text, textAlign : 'center', fontWeight : '200', marginTop : 4}}>
                            {this.props.ghost.type}
                        </Text>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'flex-end', width : '50%'}}>
                            <Text style={constyles.genH5Text}>
                                Upvotes
                            </Text>
                            <View style={{width : 48}}/>
                            <Text style={constyles.genH4Text}>
                                {this.props.ghost.scores.upvotes}
                            </Text>
                        </View>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'flex-end', width : '50%'}}>
                            <Text style={constyles.genH5Text}>
                                Downvotes
                            </Text>
                            <View style={{width : 48}}/>
                            <Text style={constyles.genH4Text}>
                                {this.props.ghost.scores.downvotes}
                            </Text>
                        </View>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'flex-end', width : '50%'}}>
                            <Text style={constyles.genH5Text}>
                                Moderators
                            </Text>
                            <View style={{width : 48}}/>
                            <Text style={constyles.genH4Text}>
                                {this.props.ghost.moderatorIds.length}
                            </Text>
                        </View>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'flex-end', width : '50%'}}>
                            <Text style={constyles.genH5Text}>
                                Locations
                            </Text>
                            <View style={{width : 48}}/>
                            <Text style={constyles.genH4Text}>
                                {this.props.ghost.locations.length}
                            </Text>
                        </View>
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'flex-end', width : '50%'}}>
                            <Text style={constyles.genH5Text}>
                                Chat Cards
                            </Text>
                            <View style={{width : 48}}/>
                            <Text style={constyles.genH4Text}>
                                {this.props.ghost.chatCards.length}
                            </Text>
                        </View>
                    </View>
                    <View style={{flex : 1, width : '100%'}}>
                    <View style={{flexDirection : 'row'}}>
                        {
                            this.props.ghost.moderatorIds.includes(this.props.user._id) ?
                            <View style={{flex : 1, width : '100%'}}>
                                <View style={{flexDirection : 'row'}}>
                                    <GenButton
                                        title={this.props.ghost.status === 'RESTED' ? "Awaken Ghost" : "Rest Ghost"}
                                        style={this.props.ghost.status === 'RESTED' ? constyles.activeButton : constyles.inactiveButton}
                                        onPress={this.props.ghost.status === 'RESTED' ? ()=>this.updateGhostStatus(null) : ()=>this.updateGhostStatus('RESTED')}
                                    />
                                </View>
                                <View style={{flexDirection : 'row'}}>
                                    <GenButton
                                        title={this.props.ghost.status === 'SILENCED' ? "Unsilence Ghost" : "Silence Ghost"}
                                        style={this.props.ghost.status === 'SILENCED' ? constyles.activeButton : constyles.inactiveButton}
                                        onPress={this.props.ghost.status === 'SILENCED' ? ()=>this.updateGhostStatus(null) : ()=>this.updateGhostStatus('SILENCED')}
                                    />
                                </View>
                            </View>
                            :
                            this.props.user.ghostFriendIds.includes(this.props.ghost._id) ? 
                            <GenButton
                                title="Unfriend Ghost"
                                onPress={this.unfriendGhost}
                            />
                            :
                            <GenButton
                                title="Befriend Ghost"
                                style={constyles.activeButton}
                                onPress={this.befriendGhost}
                            />
                        }        
                        </View>
                        
                        <View style={{flexDirection : 'row'}}>
                            <GenButton
                                title="Chat Cards"
                                onPress={()=>{
                                    console.log('modal chat card press');
                                    this.props.setScreen('SELECTED_GHOST_CHAT_CARDS')
                                }}
                            />
                        </View>
                        <View style={{flexDirection : 'row'}}>
                            <GenButton
                                title="Locations"
                                onPress={()=>this.props.setScreen('SELECTED_GHOST_LOCATIONS')}
                            />
                        </View>
                        <View style={{flexDirection : 'row'}}>
                            <GenButton
                                title="Close"
                                onPress={()=>this.props.setShowModal(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
    }
}

const styles = StyleSheet.create({

});

export default GhostSelectionModal;