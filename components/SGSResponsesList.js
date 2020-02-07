import React, { useState, Component } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import constyles from '../constants/constyles';
import Icon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../constants/colors';
import SGSResponsesListRow from './SGSResponsesListRow';

class SGSResponsesList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return <SafeAreaView style={{...this.props.style}}>
            <FlatList
                data={this.props.responses}
                renderItem={ (response)  => 
                    <SGSResponsesListRow 
                        socket={this.props.socket}
                        user={this.props.user}
                        ghost={this.props.ghost}
                        onPress={this.props.onSelect}
                        response={response.item}
                        selectedResponseId={this.props.selectedResponseId}
                    />
                }
                keyExtractor={response => response._id}
            />
            {/*
            this.props.responses.map(response => {
                return <SGSResponsesListRow 
                socket={this.props.socket}
                user={this.props.user}
                ghost={this.props.ghost}
                onPress={this.props.onSelect}
                response={response}/>
            })
        */}
        </SafeAreaView>
    }

}

const styles = StyleSheet.create({

});

export default SGSResponsesList;