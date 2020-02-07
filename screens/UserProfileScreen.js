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
import SGSResponsesList from '../components/SGSResponsesList';
import ChatCardsFlagsListView from '../components/ChatCardsFlagsListView';
import GenButton from '../components/genButton';

class UserProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listView : 'RESPONSE_REQUESTS',
            responsesList : [],
            chatCardFlagsList : [],
            selectedResponse : null,
            selectedChatCardFlag : null
        };
        this.logOut = this.logOut.bind(this);
        this.removeResponse = this.removeResponse.bind(this);
        this.updateResponse = this.updateResponse.bind(this);
        this.jumpToChatCard = this.jumpToChatCard.bind(this);
    }

    componentDidMount() {
        this.props.socket.on('getAllRequestsAndPendingFlagsForUserResponse', res => {
            console.log('getAllRequestsAndPendingFlagsForUserResponse res = ', res);
            this.setState({responsesList : res.responseRequests, locationsList : res.locationRequests, chatCardFlagsList : res.chatCardFlags});
        });
        this.props.socket.on('responseRated', res=>this.updateResponse(res));
        this.props.socket.on('responseDeleted', res=>this.removeResponse(res.req.responseId));
        this.props.socket.on('getChatCardAndGhostByChatCardIdResponse', res=>this.jumpToChatCard(res));
        
        
        this.props.socket.emit('getAllRequestsAndPendingFlagsForUser', {
            userId : this.props.user._id
        });
    }

    updateResponse(res){
        console.log('updateResponse res = ', res);
        const responseId = res.req.responseId;
        let responsesClone = [...this.state.responsesList];
        let idx = null;
        for(let i = 0; i < responsesClone.length; i++){
            if(responsesClone[i]._id === responseId){
                idx = i;
                break;
            }
        }
        console.log('idx = ', idx);
        console.log('res.response = ', res.response);
        if(idx){
            responsesClone[idx] = res.response;
        }
        this.setState({responsesList : responsesClone});
        this.render();
    }

    removeResponse(responseId){
        console.log('removeResponse responseId = ', responseId);
        let responsesClone = [...this.state.responsesList];
        let idx = null;
        for(let i = 0; i < responsesClone.length; i++){
            if(responsesClone[i]._id === responseId){
                idx = i;
                break;
            }
        }
        if(idx){
            responsesClone.splice(idx, 1);
        }
        this.setState({responsesList : responsesClone});
        this.render();
    }

    jumpToChatCard(res){
        if(res.success){
            this.props.navigateToChatCard(res.ghost, res.chatCard);
        }
    }

    componentWillUnmount(){
        this.props.socket.removeListener('getAllRequestsAndPendingFlagsForUserResponse');
        this.props.socket.removeListener('responseRated');
        this.props.socket.removeListener('responseDeleted');
    }

    logOut() {
        this.props.setUser(null);
        this.props.setScreen('LOGIN');
    }

    render() {
        console.log('user = ', this.props.user);
        return <View style={{flex : 1, alignItems : 'center', justifyContent : 'center'}}>
            <Text style={constyles.genH3Text}>
                {this.props.user.username}
            </Text>

            <Text style={constyles.genH5Text}>
                Inbox
            </Text>
            <View style={{flexDirection : 'row', borderRadius : 8, marginHorizontal : 12}}>
                <TouchableOpacity 
                onPress={()=>this.setState({listView : 'RESPONSE_REQUESTS'})}
                style={this.state.listView === 'RESPONSE_REQUESTS' ? {...styles.activeButton, borderBottomLeftRadius : 8, borderTopLeftRadius : 8} : {...styles.inactiveButton, borderBottomLeftRadius : 8, borderTopLeftRadius : 8} }>
                <Text style={{...styles.buttonText, fontSize : 16}}>
                    Response Requests
                </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>this.setState({listView : 'LOCATION_REQUESTS'})}
                style={this.state.listView === 'LOCATION_REQUESTS' ? styles.activeButton : styles.inactiveButton }>
                <Text style={{...styles.buttonText, fontSize : 16}}>
                    Location Requests
                </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>this.setState({listView : 'FLAGS'})}
                style={this.state.listView === 'FLAGS' ? {...styles.activeButton, borderTopRightRadius : 8, borderBottomRightRadius : 8} : {...styles.inactiveButton, borderTopRightRadius : 8, borderBottomRightRadius : 8} }>
                <Text style={styles.buttonText}>
                    Flags
                </Text>
                </TouchableOpacity>
            </View>

                {this.state.listView === 'RESPONSE_REQUESTS' ? 
                <View style={{width : '100%', flex : 1, marginTop : 4}}>
                    { this.state.selectedResponse ? 
                        <View style={{flexDirection : 'row', marginHorizontal : 8}}>
                            <GenButton
                                title="Jump To Chat Card"
                                onPress={()=>this.props.socket.emit('getChatCardAndGhostByChatCardId', {
                                    chatCardId : this.state.selectedResponse.originCCId
                                })}
                                style={constyles.activeButton}
                            />
                        </View>
                    : null }
                    
                    <SGSResponsesList
                        style={{marginHorizontal : 4}}
                        socket={this.props.socket}
                        onSelect={this.state.selectedResponse ? 
                            ()=>this.setState({selectedResponse : null}) :
                            response=>this.setState({selectedResponse : response})}
                        user={this.props.user}
                        responses={this.state.responsesList}
                        selectedResponseId={this.state.selectedResponse ? this.state.selectedResponse._id : null}
                        ghost={{moderatorIds : [this.props.user._id]}}
                    />                
                </View>
                : this.state.listView === 'FLAGS' ? 
                <View style={{width : '100%', flex : 1, marginTop : 4}}>
                    { this.state.selectedChatCardFlag ? 
                        <View style={{flexDirection : 'row', marginHorizontal : 8}}>
                            <GenButton
                                title="Jump To Chat Card"
                                onPress={()=>this.props.socket.emit('getChatCardAndGhostByChatCardId', {
                                    chatCardId : this.state.selectedChatCardFlag.chatCardId
                                })}
                                style={constyles.activeButton}
                            />
                        </View>
                    : null }
                    
                    <ChatCardsFlagsListView
                        user={this.props.user}
                        chatCardFlags={this.state.chatCardFlagsList}
                        selectedFlag={this.state.selectedChatCardFlag}
                        setSelectedFlag={flag=>this.setState({selectedChatCardFlag : flag})}
                    />                
                </View>
                : this.state.listView === 'LOCATION_REQUESTS' ? 
                <View style={{width : '100%', flex : 1, marginTop : 4}}>
                    
                </View>
                : null }
                    


            <View style={{flexDirection : 'row', marginBottom : 8, marginHorizontal : 4}}>
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
    },
      inactiveButton : {
        flex : 1, 
        alignItems : 'center', 
        justifyContent : 'center',
        padding : 8,
        backgroundColor : Colors.secondary
      },
      activeButton : {
        flex : 1, 
        alignItems : 'center', 
        justifyContent : 'center',
        padding : 8,
        backgroundColor : Colors.primary
      },
      buttonText : {
        color : 'white',
        fontSize : 22,
        fontWeight : '600',
        textAlign : 'center'
      }
});

export default UserProfileScreen;