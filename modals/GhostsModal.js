import React, { useState, Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import constyles from '../constants/constyles';
import Icon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../constants/colors';
import GenButton from '../components/genButton';
import moment from 'moment';

class GhostsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    componentDidMount(){

    }

    componentDidUpdate(prevProps){

    }

    render() {
        console.log('GhostsModal 1');
            return <Modal
                animationType="slide"
                transparent={false}
                visible={true}
                onRequestClose={()=>this.props.setModal(null)}>
                <View style={{marginTop: 22, flex : 1, justifyContent : 'center', alignItems : 'center', padding : 24}}>
                        <View style={{flexDirection : 'row'}}>
                            <GenButton
                                title="Create Ghost"
                                onPress={()=>this.props.setModal(null)}
                            />
                        </View>
                        <View style={{flexDirection : 'row'}}>
                            <GenButton
                                title="Close"
                                onPress={()=>this.props.setModal(null)}
                            />
                        </View>
                </View>
            </Modal>
    }
}

const styles = StyleSheet.create({

});

export default GhostsModal;