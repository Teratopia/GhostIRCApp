import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import constyles from '../constants/constyles';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/Entypo';  //

const ChatCardResponseListView = props => {

    return <View style={{flexDirection : 'row'}}>
            <FlatList
                style={{flex : 1}}
                data={props.responseList}
                renderItem={itemData => 
                    <View style={{...styles.responseContainer, borderColor : colors.tertiary}}>
                        <TouchableOpacity 
                            style={{flex : 1}}
                            onPress={()=>{props.responseTouchHandler(itemData.item)}}>
                            <Text style={constyles.genH4Text}>{itemData.item.text}</Text>
                        </TouchableOpacity>
                        <View style={{
                            flexDirection : 'row', 
                            justifyContent : 'center', 
                            alignItems : 'center'}}>
                            <TouchableOpacity 
                                onPress={()=>{props.responseUpVoteHandler(itemData.item)}}>
                                <Icon name="arrow-bold-up" size={18} color={colors.secondary} style={{marginTop : 4}}/>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={()=>{props.responseDownVoteHandler(itemData.item)}}>
                                <Icon name="arrow-bold-down" size={18} color={colors.secondary} style={{marginTop : 4, marginHorizontal : 8}}/>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={()=>{props.responseFlagHandler(itemData.item)}}>
                                <Icon name="flag" size={18} color={colors.secondary} style={{marginTop : 4}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                keyExtractor={itemData => itemData._id}
            />
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
        //flex : 1,
        flexDirection : 'row',
        //marginHorizontal : 12,
        borderWidth : 1,
        borderColor : colors.primary,
        borderRadius : 24,
        marginVertical : 6,
        justifyContent : 'space-between',
        //width : '100%',
        padding : 4,
        paddingHorizontal : 12
    },
})

export default ChatCardResponseListView;