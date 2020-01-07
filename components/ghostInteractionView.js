import React, {useState} from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import constyles from '../constants/constyles';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/Entypo';  //
import GenButton from './genButton';
import ChatCardResponseListView from './chatCardResponseListView';
import ChatCardRouteListView from './chatCardRouteListView';

const GhostInteractionView = props => {

    const [isInit, setIsInit] = useState();
    const [ghost, setGhost] = useState(props.ghost);
    const [currentChatCard, setCurrentChatCard] = useState();
    const [newResponseText, setNewResponseText] = useState();
    const [chatCardHistory, setChatCardHistory] = useState([]);
    const [responseRequestBeingHandled, setReponseRequestBeingHandled] = useState();
    const [newChatCardText, setNewChatCardText] = useState();
    const [allGhostChatCards, setAllGhostChatCards] = useState();
    
    console.log('allGhostChatCards = ', allGhostChatCards);
    console.log('currentChatCard = ', currentChatCard);

    function responseTouchHandler(response){
        if(currentChatCard.creatorId === props.user._id && !response.ownerId){
            setReponseRequestBeingHandled(response);
            //setChatCardHistory([...chatCardHistory, currentChatCard]);
            setCurrentChatCard(null);
        } else if(response.destinationCCId){
            props.socket.emit('getChatCardById', {
                chatCardId : response.destinationCCId
            });
        } else {
            //to do: alert that no card dest exists
        }
    }
    function goBackResponseHandler(){
        let clone = [...chatCardHistory];
        clone.splice(clone.length - 1, 1);
        setChatCardHistory(clone);
        props.socket.emit('getChatCardById', {
            chatCardId : clone[clone.length -1]
        });
    }
    function nevermindButtonHandler(){
        console.log('chatCardHistory = ', chatCardHistory);
        props.socket.emit('getChatCardById', {
            chatCardId : chatCardHistory[chatCardHistory.length -1]
        });
    }
    function routeToExistingCardButtonHandler(){
        setCurrentChatCard(null);
        props.socket.emit('getAllChatCardForGhostByGhostId', {
            ghostId : ghost._id
        });
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
                chatCardId : chatCardHistory[chatCardHistory.length-1],
                text : newResponseText,
                userId : props.user._id
            });
        }
    }
    function postNewChatCard(){
        if(newChatCardText && responseRequestBeingHandled){
            var req = {
                ghostId : ghost._id,
                text : newChatCardText,
                userId : props.user._id,
                responseId : responseRequestBeingHandled._id,
                originChatCardId : chatCardHistory[chatCardHistory.length-1]
            };
            console.log('postNewChatCard req = ', req);
            props.socket.emit('postNewChatCard', req);
        }
    }
    function routeResponseToExistingCard(chatCard){
            var req = {
                originChatCardId : chatCardHistory[chatCardHistory.length-1],
                responseId : responseRequestBeingHandled._id,
                ownerId : props.user._id,
                destinationCCId : chatCard._id,
            }
            console.log('routeResponseToExistingCard req = ', req);
            props.socket.emit('routeResponseToExistingCard', req);
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
        props.socket.removeListener('updateChatCard');
        props.socket.on('updateChatCard', res => {
            console.log('updateChatCard res = ', res);
            if(res.success){
                setChatCardHistory(previous => {
                    if(previous[previous.length-1] === res.chatCard._id){
                        previous.splice(previous.length - 1, 1);
                    }
                    return [...previous, res.chatCard._id];
                });
                setCurrentChatCard(res.chatCard);
                setNewResponseText(null);
                setNewChatCardText(null);
            } else {
                console.log('updateChatCard error = ', res.message);
            }
        });
        props.socket.removeListener('getAllChatCardForGhostByGhostId');
        props.socket.on('getAllChatCardForGhostByGhostId', res => {
            console.log('getAllChatCardForGhostByGhostId res = ', res);
            if(res.success){
                console.log('getAllChatCardForGhostByGhostId success');
                setAllGhostChatCards(res.chatCards);
            }
        });
        
        
        if(props.ghost && props.ghost.baseChatCards && props.ghost.baseChatCards.length > 0){
            console.log('props.ghost.baseChatCards[Math.floor(Math.random() * (props.ghost.baseChatCards.length -1))] = ', props.ghost.baseChatCards[Math.floor(Math.random() * (props.ghost.baseChatCards.length -1))]);
            
            //setCurrentChatCard(props.ghost.baseChatCards[Math.floor(Math.random() * (props.ghost.baseChatCards.length -1))]);
            props.socket.emit('getChatCardById', {
                chatCardId : props.ghost.baseChatCards[Math.floor(Math.random() * (props.ghost.baseChatCards.length -1))]._id
            });
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
            <Text style={{...constyles.genH3Text, marginVertical : 12}}>{currentChatCard.text}</Text>
            <View style={{...constyles.genTextInputRowContainer, width : '100%', marginTop : 0}}>
                <TextInput
                    style={{...constyles.genTextInput, textAlign : 'auto', paddingTop : 8}}
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

        {chatCardHistory.length > 1 ?
        <View style={{...styles.responseContainer, borderColor : colors.secondary, alignItems : 'center', backgroundColor : colors.tertiaryFaded}}>
            <TouchableOpacity 
                style={{flex : 1, padding : 8}}
                onPress={goBackResponseHandler}>
                <Text style={constyles.genH5Text}>Hold on...</Text>
            </TouchableOpacity>
        </View>
        : null}

        <ChatCardResponseListView
            responseList={currentChatCard.responses}
            responseTouchHandler={responseTouchHandler}
            responseUpVoteHandler={responseUpVoteHandler}
            responseDownVoteHandler={responseDownVoteHandler}
            responseFlagHandler={responseFlagHandler}
        />

        <ChatCardResponseListView
            responseList={currentChatCard.responseRequests}
            responseTouchHandler={responseTouchHandler}
            responseUpVoteHandler={responseUpVoteHandler}
            responseDownVoteHandler={responseDownVoteHandler}
            responseFlagHandler={responseFlagHandler}
        />

        

        </View>
        :
        allGhostChatCards ? 
            <ChatCardRouteListView
                chatCards={allGhostChatCards}
                routeResponseToExistingCard={routeResponseToExistingCard}
                setAllGhostChatCards={setAllGhostChatCards}
            />
        :
        <View style={{flex : 1, width : '100%', alignItems : 'center'}}>
            <Text style={{...constyles.genH5Text, marginTop : 12}}>{responseRequestBeingHandled ? responseRequestBeingHandled.text : null}</Text>
            <Text style={{...constyles.genH3Text, marginVertical : 12}}>{newChatCardText}</Text>
            <View style={{...constyles.genTextInputRowContainer, width : '100%', marginTop : 0}}>
                <TextInput
                    style={{...constyles.genTextInput, textAlign : 'auto'}}
                    value={newChatCardText}
                    multiline={true}
                    onChange={e => setNewChatCardText(e.nativeEvent.text)}
                    blurOnSubmit={true}
                    returnKeyType="done"
                />
            </View>
            { newChatCardText ? 
            <View style={{flexDirection : 'row', width : '100%'}}>
                <GenButton 
                    title="Cancel" 
                    onPress={() => {setNewChatCardText(null)}}
                />
                <GenButton 
                    title="Submit" 
                    onPress={postNewChatCard}
                    style={constyles.activeButton}
                />
            </View>
            
            : null }
            <View style={{flexDirection : 'row', width : '100%'}}>
                <GenButton 
                    title="Route To Existing Card" 
                    style={constyles.activeButton}
                    onPress={routeToExistingCardButtonHandler}
                />
            </View>
            <View style={{flexDirection : 'row', width : '100%'}}>
                <GenButton 
                    title="Nevermind" 
                    onPress={nevermindButtonHandler}
                />
            </View>
        </View>
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
        borderRadius : 12,
        marginVertical : 4,
        justifyContent : 'space-between',
        //width : '100%',
        //padding : 8,
        paddingHorizontal : 12
    },
})

export default GhostInteractionView;