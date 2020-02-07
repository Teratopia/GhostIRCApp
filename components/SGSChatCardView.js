import React, { useState, Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import constyles from '../constants/constyles';
import Icon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../constants/colors';
import GhostsListViewRow from './GhostsListViewRow';
import ChatCardFlagsModal from '../modals/ChatCardFlagsModal';
import GenButton from './genButton';
import moment from 'moment';

class SGSChatCardView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upvotes: 0,
            downvotes: 0,
            hasDownvoted: false,
            hasUpvoted: false,
            showModal: false,
            confirmingDelete: false,
            showFlagModal: false
        };
        this.pressUpvote = this.pressUpvote.bind(this);
        this.pressDownvote = this.pressDownvote.bind(this);
        this.goForward = this.goForward.bind(this);
        this.pressDelete = this.pressDelete.bind(this);
        this.pressConfirmEdit = this.pressConfirmEdit.bind(this);
    }

    componentDidMount() {
        if (this.props.chatCard && this.props.chatCard.chatCardRatings) {
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
                upvotes: upvotes,
                downvotes: downvotes,
                hasDownvoted: hasDownvoted,
                hasUpvoted: hasUpvoted
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.chatCard !== this.props.chatCard) {
            this.componentDidMount();
        }
    }

    pressUpvote() {
        this.props.socket.emit('rateChatCard', {
            userId: this.props.user._id,
            chatCardId: this.props.chatCard._id,
            isUpvote: true,
            isDownvote: false,
            ghostId: this.props.ghost._id
        });
        this.setState({ showModal: false, confirmingDelete: false });
    }

    pressDownvote() {
        console.log('pressDownvote req = ', {
            userId: this.props.user._id,
            chatCardId: this.props.chatCard._id,
            isUpvote: false,
            isDownvote: true,
            ghostId: this.props.ghost._id
        });
        this.props.socket.emit('rateChatCard', {
            userId: this.props.user._id,
            chatCardId: this.props.chatCard._id,
            isUpvote: false,
            isDownvote: true,
            ghostId: this.props.ghost._id
        });
        this.setState({ showModal: false, confirmingDelete: false });
    }

    pressConfirmEdit() {
        console.log('pressConfirmEdit req = ', {
            userId: this.props.user._id,
            chatCardId: this.props.chatCard._id,
            newText: this.state.newChatCardText,
            ghostId: this.props.chatCard.ghostId
        });
        this.props.socket.emit('editChatCard', {
            userId: this.props.user._id,
            chatCardId: this.props.chatCard._id,
            newText: this.state.newChatCardText,
            ghostId: this.props.chatCard.ghostId
        });
        this.setState({
            newChatCardText: null,
            isEditing: false,
            showModal: false,
            confirmingDelete: false
        });
    }

    goForward() {

        if (this.props.ghost.moderatorIds.includes(this.props.user._id)) {
            if (this.props.chatCard.responseRequests.length > 0) {
                this.props.onSelect(this.props.chatCard.responseRequests[0]);
            } else {
                this.props.onSelect(this.props.chatCard.responses[0]);
            }
        } else {
            if (this.props.chatCard.responses.length > 0) {
                this.props.onSelect(this.props.chatCard.responses[0]);
            } else {
                this.props.onSelect(this.props.chatCard.responseRequests[0]);
            }
        }
    }

    pressDelete() {
        this.props.socket.emit('deleteChatCard', {
            userId: this.props.user._id,
            chatCardId: this.props.chatCard._id,
            ghostId: this.props.ghost._id
        })
        this.setState({ showModal: false, confirmingDelete: false });
        this.props.onGoBack();
    }


    render() {
        if (this.props.chatCard) {
            return <View>
                <View style={{
                    flexDirection: 'row',
                    marginVertical: 16,
                    ...this.props.style
                }}>
                    <TouchableOpacity
                        disabled={this.props.chatCardHistory.length <= 1}
                        onPress={() => this.props.onGoBack()}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        {this.props.chatCardHistory.length > 1 ?
                            <FAIcon name='angle-left' size={16} color="black" />
                            : null}
                    </TouchableOpacity>

                    <View style={{
                        flex: 7,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{ ...constyles.genH3Text, fontWeight: '200', textAlign: 'center' }}>
                            {this.props.chatCard.text}
                        </Text>
                    </View>

                    <TouchableOpacity
                        disabled={this.props.chatCard.responses.length === 0 && this.props.chatCard.responseRequests.length === 0}
                        onPress={this.goForward}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        {this.props.chatCard.responses.length > 0 
                        || (this.props.chatCard.responseRequests.length > 0 && this.props.ghost.moderatorIds.includes(this.props.user._id)) ?
                            <FAIcon name='angle-right' size={16} color="black" />
                            : null}
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 12 }}>
                    <View style={{ flexDirection: 'row', flex: 3 }}>
                        {
                            this.state.hasUpvoted ?
                                <FAIcon name='arrow-circle-up' onPress={this.pressUpvote} size={20} color={Colors.primary} style={styles.rowIcon} />
                                :
                                <FAIcon name='arrow-up' onPress={this.pressUpvote} size={20} color={Colors.secondary} style={styles.rowIcon} />
                        }
                        {
                            this.state.hasDownvoted ?
                                <FAIcon name='arrow-circle-down' onPress={this.pressDownvote} size={20} color={Colors.danger} style={styles.rowIcon} />
                                :
                                <FAIcon name='arrow-down' onPress={this.pressDownvote} size={20} color={Colors.secondary} style={styles.rowIcon} />
                        }

                        <Text style={{ ...constyles.genH5Text, marginLeft: 8 }}>
                            {this.state.upvotes - this.state.downvotes}
                        </Text>
                    </View>

                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={constyles.genH6Text}>
                            {moment(this.props.chatCard.createDate).format("MMM Do YYYY")}
                        </Text>
                    </View>


                    <TouchableOpacity
                        onPress={() => { this.setState({ showModal: true }) }}
                        style={{ flexDirection: 'row', flex: 3, justifyContent: 'flex-end' }}>
                        {this.props.chatCard.bibliographyReferences.length > 0 ?
                            <FAIcon name='pen-nib' size={20} color={Colors.secondary} style={styles.rowIcon} />
                            : null}
                        {this.props.chatCard.chatCardFlags.length > 0 ?
                            <FAIcon name='flag' size={20} color={Colors.secondary} style={styles.rowIcon} />
                            : null}
                        <FAIcon name='ellipsis-v' size={20} color={Colors.secondary} style={styles.rowIcon} />
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.setState({ showModal: false })}>
                    <View style={{ marginTop: 22, flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
                        {
                            this.state.isEditing ?
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                    <TextInput
                                        style={{
                                            ...constyles.genH2Text,
                                            fontWeight: '200',
                                            borderWidth: 1,
                                            borderRadius: 8,
                                            borderColor: Colors.secondary,
                                            textAlign: 'center',
                                            width: '100%'
                                        }}
                                        defaultValue={this.props.chatCard.text}
                                        multiline={true}
                                        onChangeText={e => {
                                            this.setState({ newChatCardText: e })
                                        }}
                                    />
                                </View>
                                :
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ ...constyles.genH2Text, fontWeight: '200' }}>{this.props.chatCard.text}</Text>
                                </View>
                        }


                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={constyles.genH6Text}>
                                {moment(this.props.chatCard.createDate).format("MMM Do YYYY")}
                            </Text>

                            {this.props.ghost.moderatorIds.includes(this.props.user._id) ||
                                this.props.chatCard.creatorId === this.props.user._id ?
                                this.state.confirmingDelete ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <GenButton
                                                    //style={this.state.hasUpvoted ? null : constyles.activeButton}
                                                    onPress={() => this.setState({ confirmingDelete: false })}
                                                    title="Cancel"
                                                />
                                                <GenButton
                                                    //style={constyles.activeButton}
                                                    onPress={this.pressDelete}
                                                    title="Delete"
                                                />
                                            </View>
                                            <Text style={{ ...constyles.genH5Text, textAlign: 'center', marginBottom: 8 }}>
                                                Deleting a chat card detroys the pathways for all responses directed to it. This will change all responses directed to this chat card to requests. Are you sure you want to delete this chat card?
                                </Text>
                                        </View>
                                    </View>
                                    :
                                    <View style={{ flexDirection: 'row' }}>
                                        <GenButton
                                            onPress={() => this.setState({ confirmingDelete: true })}
                                            title="Delete"
                                        />
                                    </View>
                                : null}


                            {!this.props.ghost.moderatorIds.includes(this.props.user._id) ?
                            null
                            : this.state.isEditing ?
                                <View style={{ flexDirection: 'row' }}>
                                    <GenButton
                                        onPress={() => this.setState({ isEditing: false, newChatCardText: null })}
                                        title="Cancel"
                                    />
                                    <GenButton
                                        style={constyles.activeButton}
                                        onPress={this.pressConfirmEdit}
                                        title="Confirm"
                                    />
                                </View>
                                :
                                <View style={{ flexDirection: 'row' }}>
                                    <GenButton
                                        onPress={() => this.setState({ isEditing: true })}
                                        title="Edit"
                                    />
                                </View>
                            }
                            <View style={{ flexDirection: 'row' }}>
                                <GenButton
                                    //style={this.state.hasUpvoted ? constyles.activeButton : null}
                                    onPress={() => this.setState({ showFlagModal: true, showModal: false })}
                                    title="Flags"
                                />
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <GenButton
                                    style={this.state.hasUpvoted ? constyles.activeButton : null}
                                    onPress={this.pressUpvote}
                                    title={this.state.hasUpvoted ? 'Remove Upvote' : 'Upvote'}
                                />
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <GenButton
                                    style={this.state.hasDownvoted ? constyles.activeButton : null}
                                    onPress={this.pressDownvote}
                                    title={this.state.hasDownvoted ? 'Remove Downvote' : 'Downvote'}
                                />
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <GenButton
                                    onPress={() => this.setState({ showModal: false, confirmingDelete: false })}
                                    title="Close"
                                />
                            </View>
                        </View>
                    </View>
                </Modal>

                {this.state.showFlagModal ?
                    <ChatCardFlagsModal
                        setShowModal={bool => this.setState({ showFlagModal: bool })}
                        chatCard={this.props.chatCard}
                        socket={this.props.socket}
                        user={this.props.user}
                        ghost={this.props.ghost}
                    />
                    : null}

            </View>
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    rowIcon: {
        marginHorizontal: 4
    }
});

export default SGSChatCardView;