import React, { useState, Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Picker, Modal, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import constyles from '../constants/constyles';
import Icon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../constants/colors';
import GenButton from '../components/genButton';
import moment from 'moment';

class ChatCardFlagsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreatingFlag : false,
            newFlagReasonText : null,
            selectedFlag : null,
            newFlagType : 'INACCURATE'
        };
        this.postNewFlag = this.postNewFlag.bind(this);
        this.deleteFlag = this.deleteFlag.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
    }

    componentDidMount(){
        console.log('this.props.chatCard = ', this.props.chatCard);
    }

    componentDidUpdate(prevProps){
        if(prevProps.chatCard !== this.props.chatCard && this.state.selectedFlag){
            this.props.chatCard.chatCardFlags.forEach(flag => {
                if(flag._id === this.state.selectedFlag._id){
                    this.setState({selectedFlag : flag});
                }
            });
        }
    }

    deleteFlag(){
        this.props.socket.emit('deleteChatCardFlag', {
            chatCardFlagId : this.state.selectedFlag._id,
            ghostId : this.props.chatCard.ghostId
        });
        this.setState({
            selectedFlag : null
        });
    }

    updateStatus(status){
        this.props.socket.emit('updateChatCardFlagStatus', {
            chatCardFlagId : this.state.selectedFlag._id,
            status : status,
            ghostId : this.props.ghost._id
        });
    }

    postNewFlag(){
        /*
        createDate : Date,
        flagType : String,
        flaggerId : String,
        chatCardId : String,
        reasonText : String
        */
        this.props.socket.emit('createChatCardFlag', {
            flagType : this.state.newFlagType,
            flaggerId : this.props.user._id,
            chatCardId : this.props.chatCard._id,
            reasonText : this.state.newFlagReasonText
        });
        this.setState({
            isCreatingFlag : false,
            newFlagReasonText : null,
            newFlagType : 'INACCURATE'
        });
    }

    render() {
            return <Modal
                animationType="slide"
                transparent={false}
                visible={true}
                onRequestClose={()=>this.props.setShowModal(false)}>
                <SafeAreaView style={{marginTop: 22, flex : 1, justifyContent : 'center', alignItems : 'center', padding : 24}}>
                    {this.state.isCreatingFlag ? 
                        <View style={{flex : 1, width : '100%'}}>
                            <Text style={{...constyles.genH5Text, textAlign : 'center', marginVertical : 4}}>
                                Flag Type
                            </Text>
                            <View style={{flexDirection : 'row', borderRadius : 8, marginHorizontal : 8}}>
                                <TouchableOpacity 
                                onPress={()=>this.setState({newFlagType: 'INACCURATE'})}
                                style={this.state.newFlagType === 'INACCURATE' ? {...styles.activeButton, borderBottomLeftRadius : 8, borderTopLeftRadius : 8} : {...styles.inactiveButton, borderBottomLeftRadius : 8, borderTopLeftRadius : 8} }>
                                <Text style={styles.buttonText}>
                                    Inaccurate
                                </Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                onPress={()=>this.setState({newFlagType: 'INAPPROPRIATE'})}
                                style={this.state.newFlagType === 'INAPPROPRIATE' ? styles.activeButton : styles.inactiveButton }>
                                <Text style={styles.buttonText}>
                                    Inappropriate
                                </Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                onPress={()=>this.setState({newFlagType: 'UNCITED'})}
                                style={this.state.newFlagType === 'UNCITED' ? {...styles.activeButton, borderTopRightRadius : 8, borderBottomRightRadius : 8} : {...styles.inactiveButton, borderTopRightRadius : 8, borderBottomRightRadius : 8} }>
                                <Text style={styles.buttonText}>
                                    Uncited
                                </Text>
                                </TouchableOpacity>
                            </View>
                            <TextInput 
                            onChangeText={e=>this.setState({newFlagReasonText : e})}
                            style={{...constyles.genTextInput, padding : 12, textAlign : 'left', paddingTop : 12, margin : 8}}
                            multiline={true}
                            placeholder={
                                this.state.newFlagType === 'INACCURATE' ? "How is this chat card inaccurate?" :
                                this.state.newFlagType === 'INAPPROPRIATE' ? "How is this chat card inappropriate?" :
                                this.state.newFlagType === 'UNCITED' ? "How is this chat card uncited?" :
                                null }
                            />
                        </View>
                        
                    : null }
                    {
                            this.state.isCreatingFlag ? 
                            <View style={{flexDirection : 'row', marginHorizontal : 8}}>
                                <GenButton
                                    title="Cancel Flag"
                                    onPress={()=>this.setState({isCreatingFlag : false, newFlagReasonText : null, newFlagType : 'INACCURATE'})}
                                />
                                <GenButton
                                    title="Confirm Flag"
                                    onPress={this.postNewFlag}
                                    style={constyles.activeButton}
                                    disabled={!this.state.newFlagReasonText}
                                />
                            </View>
                            :
                            <View style={{flexDirection : 'row', marginHorizontal : 8}}>
                                <GenButton
                                    title="Create Flag"
                                    onPress={()=>this.setState({isCreatingFlag : true})}
                                />
                            </View>
                        }

                    {
                        this.props.chatCard.chatCardFlags.length === 0 ?
                        <View style={{flex : 1, width : '100%', alignItems : 'center', justifyContent: 'center'}}>
                            <Text style={{...constyles.genH2Text, textAlign : 'center'}}>
                                This Chat Card Has No Flags
                            </Text>
                        </View>
                    :
                    <View style={{flex : 1, width : '100%'}}>
                        
                        { this.state.selectedFlag && this.state.selectedFlag.flaggerId === this.props.user._id ? 
                            <View style={{flexDirection : 'row', marginHorizontal : 8}}>
                                <GenButton
                                    title="Remove Flag"
                                    onPress={this.deleteFlag}
                                />
                            </View>
                        : null}
                        {this.props.ghost && this.props.user && this.state.selectedFlag && this.props.ghost.moderatorIds.includes(this.props.user._id) ?
                        <View style={{flexDirection : 'row', borderRadius : 8, marginHorizontal : 12, marginVertical : 4}}>
                            <TouchableOpacity 
                            onPress={()=>this.updateStatus('PENDING')}
                            style={this.state.selectedFlag.status === 'PENDING' ? {...styles.activeButton, borderBottomLeftRadius : 8, borderTopLeftRadius : 8} : {...styles.inactiveButton, borderBottomLeftRadius : 8, borderTopLeftRadius : 8} }>
                            <Text style={styles.buttonText}>
                                Pending
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            onPress={()=>this.updateStatus('DISREGARDED')}
                            style={this.state.selectedFlag.status === 'DISREGARDED' ? styles.activeButton : styles.inactiveButton }>
                            <Text style={styles.buttonText}>
                                Disregarded
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            onPress={()=>this.updateStatus('HANDLED')}
                            style={this.state.selectedFlag.status === 'HANDLED' ? {...styles.activeButton, borderTopRightRadius : 8, borderBottomRightRadius : 8} : {...styles.inactiveButton, borderTopRightRadius : 8, borderBottomRightRadius : 8} }>
                            <Text style={styles.buttonText}>
                                Handled
                            </Text>
                            </TouchableOpacity>
                        </View>
                        : null}
                        <FlatList
                            data={this.props.chatCard.chatCardFlags}
                            renderItem={ (flag)  => {
                                console.log('flag = ', flag);
                                console.log('flag.item = ', flag.item);
                                return <TouchableOpacity 
                                    style={this.state.selectedFlag && flag.item._id === this.state.selectedFlag._id ?
                                        styles.selectedFlagContainer :
                                        flag.item.flaggerId === this.props.user._id ? 
                                        styles.userFlagContainer : 
                                        styles.flagContainer}
                                    onPress={this.state.selectedFlag && flag.item._id === this.state.selectedFlag._id ? 
                                        ()=>{this.setState({selectedFlag : null})}
                                        : ()=>{this.setState({selectedFlag : flag.item})}}
                                    >
                                    <View style={{flexDirection : 'row', justifyContent : 'space-between', marginHorizontal : 8}}>
                                        <Text style={constyles.genH5Text}>
                                            {flag.item.status + ' ' + flag.item.flagType + ' FLAG'}
                                        </Text>
                                        <Text style={constyles.genH5Text}>
                                            {moment(flag.item.createDate).format("MMM Do YYYY")}
                                        </Text>
                                    </View>
                                    <Text style={{...constyles.genH4Text, marginHorizontal : 8}}>
                                        {flag.item.reasonText}
                                    </Text>
                                </TouchableOpacity>}
                            }
                            keyExtractor={flag => flag._id}
                        />
                    </View>
    }
                    <View style={{flexDirection : 'row', margin : 8}}>
                            <GenButton
                                title="Close"
                                onPress={()=>this.props.setShowModal(false)}
                            />
                        </View>
                    
                </SafeAreaView>
            </Modal>
    }
}

const styles = StyleSheet.create({
    flagContainer : {
        margin: 4,
        marginHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.secondary,
        padding: 4,
        paddingHorizontal: 8,

    },
    userFlagContainer : {
        margin: 4,
        marginHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.secondary,
        padding: 4,
        paddingHorizontal: 8,
        backgroundColor: Colors.secondaryFaded,
    },
    selectedFlagContainer : {
        margin: 4,
        marginHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.secondary,
        padding: 4,
        paddingHorizontal: 8,
        backgroundColor: Colors.tertiaryFaded,
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
        fontSize : 18,
        fontWeight : '600',
        textAlign : 'center'
      }
});

export default ChatCardFlagsModal;