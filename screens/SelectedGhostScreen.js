import React, { useState, Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import constyles from '../constants/constyles';
import CheckBox from 'react-native-check-box';
import colors from '../constants/colors';
//import AsyncStorage from '@react-native-community/async-storage';
import { getStatusBarHeight } from 'react-native-status-bar-height';    //
import GhostsListView from '../components/GhostsListView';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SGSChatCardView from '../components/SGSChatCardView';
import SGSResponsesView from '../components/SGSResponsesView';
import SGSCreateChatCardView from '../components/SGSCreateChatCardView';
import moment from 'moment';


class SelectedGhostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedChatCard : null,
        responseBeingHandled : null,
        chatCardHistory : []
    };

    this.onResponseSelection = this.onResponseSelection.bind(this);
    this.onGoBackInChatCardHistory = this.onGoBackInChatCardHistory.bind(this);
    this.props.socket.on('chatCardCreated', res => {
        console.log('chatCardCreated res = ', res);
        //if(res.success){
        //    this.setState({ responseBeingHandled : res.response });
        //}
        if(res.success){
            this.setState({ responseBeingHandled : null });
            this.props.setGhost(res.ghost);
            this.onResponseSelection(res.response);
        }
    });
  }

  componentDidMount(){
    console.log('selected ghost screen componentDidMount 0');
    if(this.props.ghost){
        console.log('this.state.selectedChatCard = ', this.state.selectedChatCard);
        if(!this.state.selectedChatCard){
            if(this.props.ghost.baseChatCards && this.props.ghost.baseChatCards.length > 0){
                this.setState({
                    selectedChatCard : this.props.ghost.baseChatCards[0],
                    chatCardHistory : [this.props.ghost.baseChatCards[0]]
                });
            }
        } else {
            console.log('selected ghost screen componentDidMount 1');
            if(this.props.ghost.chatCards && this.props.ghost.chatCards.length > 0){
                let ccId = this.state.selectedChatCard._id;
                console.log('selected ghost screen componentDidMount 2');
                /*
                if(this.state.responseBeingHandled && this.state.responseBeingHandled.destinationCCId){
                    console.log('selected ghost screen componentDidMount 3');
                    ccId = this.state.responseBeingHandled.destinationCCId;
                    this.setState({
                        responseBeingHandled : null
                    });
                }
                */
                console.log('selected ghost screen componentDidMount 4 ccId = ', ccId);
                for(let i = 0 ; i < this.props.ghost.chatCards.length ; i++){
                    if(this.props.ghost.chatCards[i]._id === ccId){
                        console.log('selected ghost screen componentDidMount 5');
                        this.setState({
                            selectedChatCard : this.props.ghost.chatCards[i]
                        });
                        break;
                    }
                }
            }
        }
    }
    /*
    this.props.socket.on('chatCardDeleted', res => {
        if(res.success){
            this.setState({

            })
        }
    })
    */
  }

  componentDidUpdate(prevProps){
    if(prevProps.ghost !== this.props.ghost){
        console.log('prevProps.ghost !== this.props.ghost');
        this.componentDidMount();
    }
  }

  componentWillUnmount(){
    this.props.socket.removeListener('chatCardCreated');
  }

  onResponseSelection(response){
    let ccs = this.props.ghost.chatCards;
    for(let i = 0 ; i < ccs.length ; i++){
        if(ccs[i]._id === response.destinationCCId){
            this.setState({
                selectedChatCard : ccs[i],
                chatCardHistory : [...this.state.chatCardHistory, ccs[i]]
            });
            return;
        }
    }
    this.setState({responseBeingHandled : response});
  }

  onGoBackInChatCardHistory(){
      if(this.state.chatCardHistory.length > 1){
          let cchClone = [...this.state.chatCardHistory];
          cchClone.splice(cchClone.length-1, 1);
          let sccClone = cchClone[cchClone.length - 1];
          const ccs = this.props.ghost.chatCards;
          if(ccs && ccs.length > 0){
            for(let i = 0 ; i < ccs.length ; i++){
                if(sccClone._id === ccs[i]._id){
                    sccClone = ccs[i];
                    break;
                }
            }
          }
          cchClone[cchClone.length-1] = sccClone;
          console.log('onGoBackInChatCardHistory update = ', {
            selectedChatCard : sccClone,
            chatCardHistory : cchClone
        });
          this.setState({
              selectedChatCard : sccClone,
              chatCardHistory : cchClone
          });
      }
  }

  render() {

    return  <View style={{flex : 1}}>
        <View style={{flexDirection : 'row', marginTop : 8}}>
            <View style={{flexDirection : 'column', alignItems : 'center', justifyContent : 'center', flex : 1}}>
                <Text style={constyles.genH6Text}>
                    Type
                </Text>
                <Text style={constyles.genH5Text}>
                    {this.props.ghost.type}
                </Text>
            </View>
            <View style={{flexDirection : 'column', alignItems : 'center', justifyContent : 'center', flex : 1}}>
                <Text style={constyles.genH6Text}>
                    Created
                </Text>
                <Text style={constyles.genH5Text}>
                    {moment(this.props.ghost.createDate).format("MMM Do YYYY")}
                </Text>
            </View>
            <View style={{flexDirection : 'column', alignItems : 'center', justifyContent : 'center', flex : 1}}>
                <Text style={constyles.genH6Text}>
                    Ecto
                </Text>
                <Text style={constyles.genH5Text}>
                    {this.props.ghost.scores.upvotes - this.props.ghost.scores.downvotes}
                </Text>
            </View>
        </View>

{
    this.state.responseBeingHandled ? 
    <SGSCreateChatCardView
        socket={this.props.socket}
        ghost={this.props.ghost}
        user={this.props.user}
        response={this.state.responseBeingHandled}
        nullifyResponseBeingHandled={()=>this.setState({responseBeingHandled : null})}
    />
    :
    <View style={{flex : 1}}>
        <SGSChatCardView
            socket={this.props.socket}
            ghost={this.props.ghost}
            user={this.props.user}
            chatCard={this.state.selectedChatCard}
            chatCardHistory={this.state.chatCardHistory}
            onSelect={this.onResponseSelection}
            onGoBack={this.onGoBackInChatCardHistory}
        />
        <SGSResponsesView
            socket={this.props.socket}
            ghost={this.props.ghost}
            user={this.props.user}
            chatCard={this.state.selectedChatCard}
            onSelect={this.onResponseSelection}
            onGoBack={this.onGoBackInChatCardHistory}
        />
    </View>
}

    

            </View>

  }
} 

const styles = StyleSheet.create({
});

export default SelectedGhostScreen;