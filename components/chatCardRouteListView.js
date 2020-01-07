import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import constyles from '../constants/constyles';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/Entypo';  //
import GenButton from './genButton';

const ChatCardRouteListView = props => {
    const [selectedCard, setSelectedCard] = useState();
    console.log('ChatCardRouteListView init');
    console.log('ChatCardRouteListView props.chatCards = ', props.chatCards);

    return <View 
    //style={{flexDirection : 'row'}}
    >
        <Text>test</Text>
            <FlatList
                //style={{flex : 1}}
                data={props.chatCards}
                renderItem={itemData => 
                    <TouchableOpacity 
                        onPress={() => setSelectedCard(itemData.item)}
                        style={itemData.item === selectedCard ? {...styles.responseContainer, 
                            borderColor : colors.primary, 
                            alignItems : 'center',
                            backgroundColor : colors.tertiaryFaded
                        } : styles.responseContainer}>
                        <Text style={constyles.genH3Text}>
                            {itemData.item.text}
                        </Text>
                    </TouchableOpacity>
                }
                keyExtractor={itemData => itemData._id}
            />
            {
                selectedCard ? 
                <View style={{flexDirection : 'row', width : '100%'}}>
                    <GenButton 
                        style={constyles.activeButton}
                        title="Set" 
                        onPress={() => {props.routeResponseToExistingCard(selectedCard)}}/>
                </View>
                :
                null
            }
            <View style={{flexDirection : 'row', width : '100%'}}>
                <GenButton 
                    title="Cancel" 
                    onPress={() => {props.setAllGhostChatCards(null)}}/>
            </View>
            
        </View>
}

const styles = StyleSheet.create({
    currentCardContainer : {
        //justifyContent : 'center', 
        alignItems : 'center', 
        borderTopColor : colors.secondary, 
        borderTopWidth : 1,
        paddingVertical : 4,
        flex : 1
    },
    responseContainer : {
        flexDirection : 'row',
        borderWidth : 1,
        borderColor : colors.primary,
        borderRadius : 12,
        marginVertical : 4,
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingHorizontal : 12
    },
})

export default ChatCardRouteListView;