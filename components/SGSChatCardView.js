import React, { useState, Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import constyles from '../constants/constyles';
import Icon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../constants/colors';
import GhostsListViewRow from './GhostsListViewRow';
import moment from 'moment';

class SGSChatCardView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upvotes : 0,
            downvotes : 0,
            hasDownvoted : false,
            hasUpvoted : false
        };
        this.pressUpvote = this.pressUpvote.bind(this);
        this.pressDownvote = this.pressDownvote.bind(this);
        this.goForward = this.goForward.bind(this);
    }

    componentDidMount(){
        if(this.props.chatCard && this.props.chatCard.chatCardRatings){
            let upvotes = 0;
            let downvotes = 0;
            let hasDownvoted = false;
            let hasUpvoted = false;
            this.props.chatCard.chatCardRatings.forEach(ccr => {
                ccr.isDownvote ? downvotes++ : upvotes++;
                ccr.userId === this.props.user._id ? 
                ccr.isDownvote ? hasDownvoted = true : hasUpvoted = true
                : null;
            });
            this.setState({
                upvotes : upvotes,
                downvotes : downvotes,
                hasDownvoted : hasDownvoted,
                hasUpvoted : hasUpvoted
            });
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.chatCard !== this.props.chatCard){
            this.componentDidMount();
        }
    }

    pressUpvote(){
        this.props.socket.emit('rateChatCard', {
            userId : this.props.user._id,
            chatCardId : this.props.chatCard._id,
            isUpvote : true,
            isDownvote : false,
            ghostId : this.props.ghost._id
        });
    }

    pressDownvote(){
        this.props.socket.emit('rateChatCard', {
            userId : this.props.user._id,
            chatCardId : this.props.chatCard._id,
            isUpvote : false,
            isDownvote : true,
            ghostId : this.props.ghost._id
        });
    }

    goForward(){

        if(this.props.ghost.moderatorIds.includes(this.props.user._id)){
            if(this.props.chatCard.responseRequests.length > 0){
                this.props.onSelect(this.props.chatCard.responseRequests[0]);
            } else {
                this.props.onSelect(this.props.chatCard.responses[0]);
            }
        } else {
            if(this.props.chatCard.responses.length > 0){
                this.props.onSelect(this.props.chatCard.responses[0]);
            } else {
                this.props.onSelect(this.props.chatCard.responseRequests[0]);
            }
        }
    }


    render() {
        if(this.props.chatCard){
            return <View>
                    <View style={{
                        flexDirection : 'row',
                        marginVertical : 16,
                        ...this.props.style}}>
                        <TouchableOpacity
                        disabled={this.props.chatCardHistory.length <= 1}
                        onPress={() => this.props.onGoBack()}
                        style={{
                            flex : 1,
                            justifyContent : 'center',
                            alignItems : 'center'
                        }}>
                            { this.props.chatCardHistory.length > 1 ? 
                                <FAIcon name='angle-left' size={16} color="black" />
                            : null }
                        </TouchableOpacity>
            
                        <View style={{
                            flex : 7,
                            justifyContent : 'center',
                            alignItems : 'center'
                        }}>
                        <Text style={{...constyles.genH3Text, fontWeight : '200', textAlign : 'center'}}>
                        {this.props.chatCard.text}
                        </Text>
                        </View>
            
                        <TouchableOpacity
                        disabled={this.props.chatCard.responses.length === 0 && this.props.chatCard.responseRequests.length === 0}
                        onPress={this.goForward}
                        style={{
                            flex : 1,
                            justifyContent : 'center',
                            alignItems : 'center'
                        }}>
                        { this.props.chatCard.responses.length > 0 || this.props.chatCard.responseRequests.length > 0 ?
                            <FAIcon name='angle-right' size={16} color="black" />
                        : null }
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection : 'row', justifyContent : 'space-between', marginHorizontal : 12}}>
                        <View style={{flexDirection : 'row', flex : 3}}>
                            {
                                this.state.hasUpvoted ? 
                                <FAIcon name='arrow-circle-up' onPress={this.pressUpvote} size={20} color={Colors.primary} style={styles.rowIcon}/>
                                :
                                <FAIcon name='arrow-up' onPress={this.pressUpvote} size={20} color={Colors.secondary} style={styles.rowIcon}/>
                            }
                            {
                                this.state.hasDownvoted ? 
                                <FAIcon name='arrow-circle-down' onPress={this.pressDownvote} size={20} color={Colors.danger} style={styles.rowIcon}/>
                                :
                                <FAIcon name='arrow-down' onPress={this.pressDownvote} size={20} color={Colors.secondary} style={styles.rowIcon}/>
                            }
                            
                            <Text style={{...constyles.genH5Text, marginLeft : 8}}>
                                {this.state.upvotes - this.state.downvotes}
                            </Text>
                        </View>

                        <View style={{flex : 3, justifyContent : 'center', alignItems : 'center'}}>
                            <Text style={constyles.genH6Text}>
                                {moment(this.props.chatCard.createDate).format("MMM Do YYYY")}
                            </Text>
                        </View>
                            

                        <View style={{flexDirection : 'row', flex : 3, justifyContent : 'flex-end'}}>
                            <FAIcon name='edit' size={20} color={Colors.secondary} style={styles.rowIcon}/>
                            <FAIcon name='flag' size={20} color={Colors.secondary} style={styles.rowIcon}/>
                            <FAIcon name='pen-nib' size={20} color={Colors.secondary} style={styles.rowIcon}/>
                        </View>
                    </View>
            </View>
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    rowIcon : {
        marginHorizontal : 4
    }
});

export default SGSChatCardView;