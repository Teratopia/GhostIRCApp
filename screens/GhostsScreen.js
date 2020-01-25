import React, { useState, Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import constyles from '../constants/constyles';
import CheckBox from 'react-native-check-box';
import colors from '../constants/colors';
//import AsyncStorage from '@react-native-community/async-storage';
import { getStatusBarHeight } from 'react-native-status-bar-height';    //
import GhostsListView from '../components/GhostsListView';


class GhostsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ghostsSelection : 'userGhosts',
      userGhosts : []
    };
    this.onGhostSelect = this.onGhostSelect.bind(this);

  }

  onGhostSelect(ghost){
    this.props.setGhost(ghost);
    this.props.setScreen('SELECTED_GHOST');
  }

  componentDidMount(){
    this.props.socket.on('getAllUserGhostInformationByUserId', res => {
      console.log('getAllUserGhostInformationByUserId res = ', res);
      if(res.success){
        this.setState({
          userGhosts : res.ghosts
        });
      }
    })
    this.props.socket.emit('getAllUserGhostInformationByUserId', {
      userId : this.props.user._id
    });
  }

  componentWillUnmount(){
    this.props.socket.removeListener('getAllUserGhostInformationByUserId');
  }

  render() {

    return <View style={{flex : 1}}>
      <View style={constyles.genTextInputRowContainer}>
        <TextInput
          style={{...constyles.genTextInput}}
          placeholder="Search Ghosts"
        />
      </View>
      <View style={{flexDirection : 'row', borderRadius : 8, marginHorizontal : 8}}>
        <TouchableOpacity 
        onPress={()=>this.setState({ghostsSelection : 'userGhosts'})}
        style={this.state.ghostsSelection === 'userGhosts' ? {...styles.activeButton, borderBottomLeftRadius : 8, borderTopLeftRadius : 8} : {...styles.inactiveButton, borderBottomLeftRadius : 8, borderTopLeftRadius : 8} }>
          <Text style={styles.buttonText}>
            My Ghosts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>this.setState({ghostsSelection : 'friendlyGhosts'})}
        style={this.state.ghostsSelection === 'friendlyGhosts' ? styles.activeButton : styles.inactiveButton }>
          <Text style={styles.buttonText}>
            Friendly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>this.setState({ghostsSelection : 'nearbyGhosts'})}
        style={this.state.ghostsSelection === 'nearbyGhosts' ? {...styles.activeButton, borderTopRightRadius : 8, borderBottomRightRadius : 8} : {...styles.inactiveButton, borderTopRightRadius : 8, borderBottomRightRadius : 8} }>
          <Text style={styles.buttonText}>
            Nearby
          </Text>
        </TouchableOpacity>
      </View>

    {this.state.userGhosts && this.state.ghostsSelection === 'userGhosts' ?
      <GhostsListView
        style={{marginTop : 4}}
        ghosts={this.state.userGhosts}
        onSelect={this.onGhostSelect}
      />
    : null }


    </View>

  }
} 

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  androidScreen: {
    flex: 1,
  },
  inactiveButton : {
    flex : 1, 
    alignItems : 'center', 
    justifyContent : 'center',
    padding : 8,
    backgroundColor : colors.secondary
  },
  activeButton : {
    flex : 1, 
    alignItems : 'center', 
    justifyContent : 'center',
    padding : 8,
    backgroundColor : colors.primary
  },
  buttonText : {
    color : 'white',
    fontSize : 22,
    fontWeight : '600',
    textAlign : 'center'
  }

});

export default GhostsScreen;