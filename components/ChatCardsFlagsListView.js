import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import constyles from '../constants/constyles';
import Colors from '../constants/colors';
import moment from 'moment';

class ChatCardsFlagsListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  componentDidMount(){
      console.log('ChatCardsFlagsListView props = ', this.props);
  }

  render() {
    console.log('ChatCardsFlagsListView props = ', this.props);
    return  <FlatList
                data={this.props.chatCardFlags}
                renderItem={ (flag)  => {
                    console.log('flag = ', flag);
                    console.log('flag.item = ', flag.item);
                    return <TouchableOpacity 
                        style={this.props.selectedFlag && flag.item._id === this.props.selectedFlag._id ?
                            styles.selectedFlagContainer :
                            flag.item.flaggerId === this.props.user._id ? 
                            styles.userFlagContainer : 
                            styles.flagContainer}
                        onPress={this.props.selectedFlag && flag.item._id === this.props.selectedFlag._id ? 
                            ()=>{this.props.setSelectedFlag(null)}
                            : ()=>{this.props.setSelectedFlag(flag.item)}}
                        >
                        <View style={{flexDirection : 'row', justifyContent : 'space-between', marginHorizontal : 8}}>
                            <Text style={constyles.genH5Text}>
                                {flag.item.status + ' ' + flag.item.flagType + ' FLAG'}
                            </Text>
                            <Text style={constyles.genH5Text}>
                                {moment(flag.item.createDate).format("MMM Do YYYY")}
                            </Text>
                        </View>
                        <Text style={{...constyles.genH4Text, marginHorizontal : 8}}>
                            {flag.item.reasonText}
                        </Text>
                    </TouchableOpacity>}
                }
                keyExtractor={flag => flag._id}
            />
  }
}

const styles = StyleSheet.create({
    flagContainer : {
        margin: 4,
        marginHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.secondary,
        padding: 4,
        paddingHorizontal: 8,

    },
    userFlagContainer : {
        margin: 4,
        marginHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.secondary,
        padding: 4,
        paddingHorizontal: 8,
        backgroundColor: Colors.secondaryFaded,
    },
    selectedFlagContainer : {
        margin: 4,
        marginHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.secondary,
        padding: 4,
        paddingHorizontal: 8,
        backgroundColor: Colors.tertiaryFaded,
    },
    inactiveButton : {
        flex : 1, 
        alignItems : 'center', 
        justifyContent : 'center',
        padding : 8,
        backgroundColor : Colors.secondary
      },
      activeButton : {
        flex : 1, 
        alignItems : 'center', 
        justifyContent : 'center',
        padding : 8,
        backgroundColor : Colors.primary
      },
      buttonText : {
        color : 'white',
        fontSize : 18,
        fontWeight : '600',
        textAlign : 'center'
      }
});

export default ChatCardsFlagsListView;