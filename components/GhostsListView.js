import React, { useState, Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import constyles from '../constants/constyles';
import Icon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../constants/colors';
import GhostsListViewRow from './GhostsListViewRow';

class GhostsListView extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return <View style={{...this.props.style}}>
            {this.props.ghosts.map(ghost => {
                return <GhostsListViewRow 
                onPress={this.props.onSelect}
                ghost={ghost}/>
            })
            }
        </View>
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 40,
        backgroundColor: Colors.secondary,
        width: '100%',
        marginBottom: 4,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopColor: Colors.primary,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1,
        borderTopWidth: 1
    },
    text: {
        color: 'white',
        fontSize: 20
    },
    touchableStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 6,
        borderRadius: 8
    }
});

export default GhostsListView;