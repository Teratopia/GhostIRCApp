import React, {useState} from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import constyles from '../constants/constyles';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/Entypo';  //
import GenButton from './genButton';
import ChatCardResponseListView from './chatCardResponseListView';

const GhostInteractionView = props => {

    const [isInit, setIsInit] = useState();
    const [ghost, setGhost] = useState(props.ghost);
    const [currentChatCard, setCurrentChatCard] = useState();
    const [newResponseText, setNewResponseText] = useState();

    function responseTouchHandler(){

    }
    function responseUpVoteHandler(){
        
    }
    function responseDownVoteHandler(){
        
    }
    function responseFlagHandler(){
        
    }
    function addResponseRequestToChatCard(){
        if(newResponseText){
            props.socket.emit('addResponseRequestToChatCard', {
                chatCardId : currentChatCard._id,
                text : newResponseText,
                userId : props.user._id
            });
        }
    }

    if(!isInit){
        props.socket.removeListener('updateGhost');
        props.socket.on('updateGhost', res => {
            if(res.success){
                setGhost(res.ghost);
            } else {
                console.log('update ghost error = ', res.message);
            }
        });
        props.socket.on('addResponseRequestToChatCard', res => {
            console.log('addResponseRequestToChatCard res = ', res);
            if(res.success){
                setCurrentChatCard(res.chatCard);
                setNewResponseText(null);
            } else {
                console.log('addResponseRequestToChatCarderror = ', res.message);
            }
        });
        
        if(props.ghost && props.ghost.baseChatCards && props.ghost.baseChatCards.length > 0){
            console.log('props.ghost.baseChatCards[Math.floor(Math.random() * (props.ghost.baseChatCards.length -1))] = '+ props.ghost.baseChatCards[Math.floor(Math.random() * (props.ghost.baseChatCards.length -1))]);
            setCurrentChatCard(props.ghost.baseChatCards[Math.floor(Math.random() * (props.ghost.baseChatCards.length -1))]);

        }
        setIsInit(true);
    }

    return <View style={{
        flex : 1, 
        width : '100%', 
        paddingVertical : 8, 
        justifyContent : 'center', 
        alignItems : 'center'}}>
    {
        currentChatCard ? 
        <View style={styles.currentCardContainer}>
            <Text style={{...constyles.genH4Text, marginVertical : 12}}>{currentChatCard.text}</Text>
            <View style={{...constyles.genTextInputRowContainer, width : '100%', marginTop : 0}}>
                <TextInput
                    style={{...constyles.genTextInput, textAlign : 'auto'}}
                    value={newResponseText}
                    multiline={true}
                    onBlur={e => setNewResponseText(e.nativeEvent.text)}
                    blurOnSubmit={true}
                    returnKeyType="done"
                />

            </View>
        { newResponseText ? 
            <View style={{flexDirection : 'row', width : '100%'}}>
                <GenButton 
                    title="Cancel" 
                    onPress={() => {setNewResponseText(null)}}
                />
                <GenButton 
                    title="Submit" 
                    onPress={addResponseRequestToChatCard}
                    style={constyles.activeButton}
                />
                
            </View>
        : null }

        <ChatCardResponseListView
            responseList={currentChatCard.responseRequests}
            responseTouchHandler={responseTouchHandler}
            responseUpVoteHandler={responseUpVoteHandler}
            responseDownVoteHandler={responseDownVoteHandler}
            responseFlagHandler={responseFlagHandler}
        />

        <ChatCardResponseListView
            responseList={currentChatCard.responses}
            responseTouchHandler={responseTouchHandler}
            responseUpVoteHandler={responseUpVoteHandler}
            responseDownVoteHandler={responseDownVoteHandler}
            responseFlagHandler={responseFlagHandler}
        />

        </View>
        :
        null
    }      
    </View>
}

const styles = StyleSheet.create({
    currentCardContainer : {
        //justifyContent : 'center', 
        alignItems : 'center', 
        borderTopColor : colors.secondary, 
        borderTopWidth : 1,
        paddingVertical : 4,
        flex : 1
    },
    responseContainer : {
        //flex : 1,
        flexDirection : 'row',
        //marginHorizontal : 12,
        borderWidth : 1,
        borderColor : colors.primary,
        borderRadius : 24,
        marginVertical : 6,
        justifyContent : 'space-between',
        //width : '100%',
        padding : 4,
        paddingHorizontal : 12
    },
})

export default GhostInteractionView;