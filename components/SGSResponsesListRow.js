import React, { useState, Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import constyles from '../constants/constyles';
import Icon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../constants/colors';
import GenButton from './genButton';
import moment from 'moment';

class SGSResponsesListRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upvotes : 0,
            downvotes : 0,
            hasDownvoted : false,
            hasUpvoted : false,
            showModal : false,
            confirmingDelete : false
        };
        this.pressUpvote = this.pressUpvote.bind(this);
        this.pressDownvote = this.pressDownvote.bind(this);
        this.pressDelete = this.pressDelete.bind(this);
    }

    componentDidMount() {
        console.log('comp did mount resp = ', this.props.response);
        let upvotes = 0;
        let downvotes = 0;
        let hasDownvoted = false;
        let hasUpvoted = false;
        this.props.response.responseRatings.forEach(rating => {
            rating.isDownvote ? downvotes++ : upvotes++;
            rating.userId === this.props.user._id ? 
            rating.isDownvote ? hasDownvoted = true : hasUpvoted = true
            : null;
        });
        this.setState({
            upvotes : upvotes,
            downvotes : downvotes,
            hasDownvoted : hasDownvoted,
            hasUpvoted : hasUpvoted
        });
    }

    componentDidUpdate(prevProps) {
        if(prevProps.response !== this.props.response){
            this.componentDidMount();
        }
    }

    pressUpvote(){
        this.props.socket.emit('rateResponse', {
            userId : this.props.user._id,
            responseId : this.props.response._id,
            isUpvote : true,
            isDownvote : false,
            ghostId : this.props.ghost._id
        });
        this.setState({ showModal : false });
    }

    pressDownvote(){
        this.props.socket.emit('rateResponse', {
            userId : this.props.user._id,
            responseId : this.props.response._id,
            isUpvote : false,
            isDownvote : true,
            ghostId : this.props.ghost._id
        });
        this.setState({ showModal : false });
    }

    pressDelete(){

    }


    render() {
        return <TouchableOpacity
            onPress={() => this.props.onPress(this.props.response)}
            style={{
                margin: 4,
                marginHorizontal: 8,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: Colors.secondary,
                padding: 4,
                paddingHorizontal: 8,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'

            }}>
            <Text style={{ ...constyles.genH3Text, fontWeight: '300' }}>
                {this.props.response.text}
            </Text>
            <TouchableOpacity 
            onPress={()=>this.setState({showModal : true})}
            style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Text style={{...constyles.genH4Text, marginRight : 8}}>
                    {this.state.upvotes - this.state.downvotes}
                </Text>
                { this.state.hasUpvoted ?
                    <FAIcon name='arrow-circle-up' size={24} color={Colors.primary} style={{marginRight : 8}}/>
                : null }
                { this.state.hasDownvoted ?
                    <FAIcon name='arrow-circle-down' size={24} color={Colors.danger} style={{marginRight : 8}}/>
                : null }
                <FAIcon name='ellipsis-v' size={24} color={Colors.secondary} style={{marginRight : 8}}/>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.showModal}
                onRequestClose={() => this.setState({showModal : false})}>
                <View style={{marginTop: 22, flex : 1, justifyContent : 'center', alignItems : 'center', padding : 24}}>
                    <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                        <Text style={{...constyles.genH2Text, fontWeight : '200'}}>{this.props.response.text}</Text>
                    </View>
                    
                    <View style={{flex : 1, alignItems : 'center'}}>
                    <Text style={constyles.genH6Text}>
                        {moment(this.props.response.createDate).format("MMM Do YYYY")}
                    </Text>

                    {   this.props.ghost.moderatorIds.includes(this.props.user._id) ||
                        this.props.response.requesterId === this.props.user._id ? 
                        this.state.confirmingDelete ? 
                        <View style={{flexDirection : 'row'}}>
                            <View>
                                <View style={{flexDirection : 'row'}}>
                                    <GenButton
                                        //style={this.state.hasUpvoted ? null : constyles.activeButton}
                                        onPress={() => this.setState({ confirmingDelete : false})}
                                        title="Cancel"
                                    />
                                    <GenButton
                                        //style={constyles.activeButton}
                                        onPress={this.pressDelete}
                                        title="Delete"
                                    />
                                </View>
                                <Text style={{...constyles.genH5Text, textAlign : 'center', marginBottom : 8}}>
                                    Deleting a response detroys the pathway to its destination chat card, as well as any ratings for the response. Are you sure you want to delete this response?
                                </Text>
                            </View>
                        </View>
                        :
                        <View style={{flexDirection : 'row'}}>
                            <GenButton
                                onPress={() => this.setState({ confirmingDelete : true})}
                                title="Delete"
                            />
                        </View>
                    : null }

                    <View style={{flexDirection : 'row'}}>
                        <GenButton
                            style={this.state.hasUpvoted ? constyles.activeButton : null}
                            onPress={this.pressUpvote}
                            title={this.state.hasUpvoted ? 'Remove Upvote' : 'Upvote'}
                        />
                    </View>

                    <View style={{flexDirection : 'row'}}>
                        <GenButton
                            style={this.state.hasDownvoted ? constyles.activeButton : null}
                            onPress={this.pressDownvote}
                            title={this.state.hasDownvoted ? 'Remove Downvote' : 'Downvote'}
                        />
                    </View>

                    <View style={{flexDirection : 'row'}}>
                        <GenButton
                            onPress={() => this.setState({showModal : false})}
                            title="Close"
                        />
                    </View>
                   </View>
                </View>
            </Modal>

        </TouchableOpacity>
    }

}

const styles = StyleSheet.create({

});

export default SGSResponsesListRow;