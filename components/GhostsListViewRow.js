import React, { useState, Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import constyles from '../constants/constyles';
import Icon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../constants/colors';

class GhostsListViewRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasRequests: false,
            hasFlags: false
        };
    }

    componentDidMount() {
        let hasRequests = false;
        let hasFlags = false;
        this.props.ghost.chatCards.forEach(card => {
            if (card.responseRequests.length > 0) {
                hasRequests = true;
            }
            if (card.flags.length > 0) {
                hasFlags = true;
            }
        });
        this.setState({
            hasRequests: hasRequests,
            hasFlags: hasFlags
        })
    }

    componentWillUpdate(prevProps) {
        if (this.props.ghost !== prevProps.ghost) {
            this.componentDidMount();
        }
    }


    render() {
        return <TouchableOpacity
            onPress={() => this.props.onPress(this.props.ghost)}
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
                {this.props.ghost.name}
            </Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                {
                    this.state.hasRequests ?
                        <FAIcon name='envelope-open-text' size={16} color={Colors.primary} style={styles.rowIcon}/>
                        :
                        null
                }
                {
                    this.state.hasFlags ?
                        <FAIcon name='flag' size={16} color={Colors.primary} style={styles.rowIcon} />
                        :
                        null
                }
                {
                    !this.props.ghost.status ?
                    null
                    : this.props.ghost.status === 'RESTED' ? 
                        <FAIcon name='bed' size={16} color={Colors.dark} style={styles.rowIcon} />
                    : this.props.ghost.status === 'SILENCED' ? 
                        <FAIcon name='volume-off' size={16} color={Colors.dark} style={styles.rowIcon} />
                    : null
                }

            </View>

        </TouchableOpacity>
    }

}

const styles = StyleSheet.create({
    rowIcon : {
        marginRight : 8
    }
});

export default GhostsListViewRow;