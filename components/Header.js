import React, { useState, Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import constyles from '../constants/constyles';
import Icon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../constants/colors';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }


  render() {
    switch (this.props.currentScreen) {
        case 'LOGIN':
          return null;
          case 'GHOSTS':
            return  <View style={{...styles.container, ...this.props.style}}>
                        <TouchableOpacity onPress={()=>this.props.setScreen('SEARCH')} style={styles.touchableStyle}>
                            <FAIcon name='angle-left' size={20} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.text}>{this.props.currentScreen}</Text>
                        <TouchableOpacity onPress={()=>this.props.setShowModal(!this.props.showModal)} style={styles.touchableStyle}>
                            <FAIcon name='filter' size={16} color="white" />
                        </TouchableOpacity>
                    </View>
            case 'SELECTED_GHOST_CHAT_CARDS':
            case 'SELECTED_GHOST_LOCATIONS':
            case 'SELECTED_GHOST':
                return  <View style={{...styles.container, ...this.props.style}}>
                            <TouchableOpacity onPress={this.props.currentScreen === 'SELECTED_GHOST' ?  ()=>this.props.setScreen('GHOSTS') : ()=>this.props.setScreen('SELECTED_GHOST') } style={styles.touchableStyle}>
                                <FAIcon name='angle-left' size={20} color="white" />
                            </TouchableOpacity>
                            <Text style={styles.text}>{this.props.ghost.name}</Text>
                            <TouchableOpacity onPress={()=>this.props.setShowModal(true)} style={styles.touchableStyle}>
                                <FAIcon name='ellipsis-v' size={20} color="white" />
                            </TouchableOpacity>
                        </View>
            case 'USER_PROFILE':
                return  <View style={{...styles.container, ...this.props.style}}>
                            <TouchableOpacity onPress={()=>{}} style={styles.touchableStyle}>
                                <FAIcon name='cog' size={20} color="white" />
                            </TouchableOpacity>
                            <Text style={styles.text}>PROFILE</Text>
                            <TouchableOpacity onPress={()=>this.props.setScreen('SEARCH')} style={styles.touchableStyle}>
                                <FAIcon name='angle-right' size={20} color="white" />
                            </TouchableOpacity>
                        </View>
            case 'CREATE_GHOST':
                return  <View style={{...styles.container, ...this.props.style}}>
                            <TouchableOpacity onPress={()=>this.props.setScreen('GHOSTS')} style={styles.touchableStyle}>
                                <FAIcon name='angle-left' size={20} color="white" />
                            </TouchableOpacity>
                            <Text style={styles.text}>CREATE GHOST</Text>
                            <View style={{width : 20}}/>
                        </View>
        default:
            return  <View style={{...styles.container, ...this.props.style}}>
                        <TouchableOpacity onPress={()=>this.props.setScreen('USER_PROFILE')} style={styles.touchableStyle}>
                            <FAIcon name='user-circle' size={20} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.text}>{this.props.currentScreen}</Text>
                        <TouchableOpacity onPress={()=>this.props.setScreen('GHOSTS')} style={styles.touchableStyle}>
                            <FAIcon name='ghost' size={20} color="white" />
                        </TouchableOpacity>
                    </View>
      }
  }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height:40, 
        backgroundColor: Colors.secondary, 
        width:'100%', 
        marginBottom: 4, 
        paddingHorizontal: 12,
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderTopColor : Colors.primary,
        borderBottomColor : Colors.primary,
        borderBottomWidth : 1,
        borderTopWidth : 1
    },
    text: {
        color:'white', 
        fontSize:20
    },
    touchableStyle : {
        justifyContent : 'center',
        alignItems : 'center',
        padding:6, 
        borderRadius:8
    }
});

export default Header;