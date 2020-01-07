import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import constyles from '../constants/constyles';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/Entypo';  //

const ChatCardResponseListView = props => {
    const [viewLowerRowId, setViewLowerRowId] = useState();

    function toggleViewLower(id){
        if(viewLowerRowId){
            setViewLowerRowId(null);
        } else {
            setViewLowerRowId(id);
        }
    }

    return <View 
    style={{width : '100%'}}
    >
        {
            props.responseList.map(response=>{
                return <View style={
                    response.ownerId ?
                    {...styles.responseContainer, 
                        borderColor : colors.primary, 
                        alignItems : 'center',
                        backgroundColor : colors.tertiaryFaded
                    }
                    :
                    {...styles.responseContainer, 
                        borderColor : colors.tertiary, 
                        alignItems : 'center', 
                        backgroundColor : colors.secondaryFaded
                    }}
                    >
                        <View style={styles.mainRow}>

                    <TouchableOpacity 
                        style={{flex : 1, padding : 8}}
                        onPress={()=>{props.responseTouchHandler(response)}}>
                        <Text style={constyles.genH5Text}>{response.text}</Text>
                    </TouchableOpacity>
                    <View style={{
                        flexDirection : 'row', 
                        justifyContent : 'center', 
                        alignItems : 'center'}}>
                        <TouchableOpacity 
                            onPress={()=>{props.responseUpVoteHandler(response)}}>
                            <Icon name="arrow-bold-up" size={18} color={colors.secondary} style={{marginTop : 4}}/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={()=>{toggleViewLower(response._id)}}>
                            <Icon name="info" size={18} color={colors.secondary} style={{marginTop : 4}}/>
                        </TouchableOpacity>
                    </View>
                    </View>
                    {
                        viewLowerRowId === response._id ?
                        <View style={{...styles.mainRow, paddingBottom : 8}}>
                            <TouchableOpacity 
                                onPress={()=>{setViewLowerRow(previous=>!previous)}}>
                                <Icon name="arrow-bold-up" size={18} color={colors.secondary} style={{marginTop : 4}}/>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={()=>{setViewLowerRow(previous=>!previous)}}>
                                <Icon name="arrow-bold-down" size={18} color={colors.secondary} style={{marginTop : 4}}/>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={()=>{setViewLowerRow(previous=>!previous)}}>
                                <Icon name="flag" size={18} color={colors.secondary} style={{marginTop : 4}}/>
                            </TouchableOpacity>
                        </View>
                        :
                        null
                    }
                    
                </View>
            })
        }
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
        //flexDirection : 'row',
        //marginHorizontal : 12,
        borderWidth : 1,
        borderColor : colors.primary,
        borderRadius : 12,
        marginVertical : 4,
        //justifyContent : 'space-between',
        //width : '100%',
        //padding : 8,
        paddingHorizontal : 12
    },
    mainRow : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        width : '100%'
    }
})

export default ChatCardResponseListView;