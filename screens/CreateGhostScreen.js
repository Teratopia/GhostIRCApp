import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import constyles from '../constants/constyles';
import colors from '../constants/colors';
import moment from 'moment';
import TouchTile from '../components/touchTile';

const CreateGhostScreen = props => {

    function handleSelection(selection){
        
    }

    return  <SafeAreaView style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                <ScrollView style={{flex : 1, width : '100%', marginBottom : 8}}>
                <Text style={{...constyles.genH3Text, textAlign : 'center'}}>What Type of Ghost?</Text>
                <TouchableOpacity 
                onPress={()=>{handleSelection("SPRITE")}}
                style={{ flexDirection : 'row' }}>
                <View style={styles.ghostTypeContainer}>
                    <Text style={styles.ghostTypeHeader}>SPRITE</Text>
                    <Text style={styles.ghostTypeSubHeader}>Cost: 100 Ecto</Text>
                    <View style={{width : '80%', height : 1, backgroundColor : 'white'}}/>
                    <Text style={styles.ghostTypeText}>
                        Sprites are the most common ghosts. They typically appear in one location 
                        but they can inhabit many. People can speak with a befriended Sprite 
                        from anywhere and can view them on the map, unless they are Shaded.
                    </Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={()=>{handleSelection("WISP")}}
                style={{ flexDirection : 'row' }}>
                <View style={styles.ghostTypeContainer}>
                    <Text style={styles.ghostTypeHeader}>WILL-O'-THE-WISP</Text>
                    <Text style={styles.ghostTypeSubHeader}>Cost: 500+ Ecto</Text>
                    <View style={{width : '80%', height : 1, backgroundColor : 'white'}}/>
                    <Text style={styles.ghostTypeText}>
                        Will-o'-the-Wisps are rare, elusive ghosts that lead friendly travellers to new 
                        locations. Always visible on the map, the cost of a Wisp varies by 
                        the distance of the path it creates.
                    </Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={()=>{handleSelection("CHANNEL")}}
                style={{ flexDirection : 'row' }}>
                <View style={styles.ghostTypeContainer}>
                    <Text style={styles.ghostTypeHeader}>CHANNEL</Text>
                    <Text style={styles.ghostTypeSubHeader}>Cost: 1000 Ecto</Text>
                    <View style={{width : '80%', height : 1, backgroundColor : 'white'}}/>
                    <Text style={styles.ghostTypeText}>
                        Channels are not ghosts, per se, more like conduits for interacting with others 
                        through space and time. Visible on the map unless they are shaded, you must be 
                        near a channel in order to converse with others through it.
                    </Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={()=>{handleSelection("SHADOW")}}
                style={{ flexDirection : 'row' }}>
                <View style={styles.ghostTypeContainer}>
                    <Text style={styles.ghostTypeHeader}>SHADOW</Text>
                    <Text style={styles.ghostTypeSubHeader}>Cost: 0 Ecto</Text>
                    <View style={{width : '80%', height : 1, backgroundColor : 'white'}}/>
                    <Text style={styles.ghostTypeText}>
                        Shadows are the rarest and most unique ghost type. They are not attached to a location
                        at all--instead, they are attached to a living person. Creating a Shadow means making
                        a one of a kind ghost just for you.
                    </Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={()=>{handleSelection("EIDOLON")}}
                style={{ flexDirection : 'row' }}>
                <View style={styles.ghostTypeContainer}>
                    <Text style={styles.ghostTypeHeader}>EIDOLON</Text>
                    <Text style={styles.ghostTypeSubHeader}>Cost: 10,000 Ecto</Text>
                    <View style={{width : '80%', height : 1, backgroundColor : 'white'}}/>
                    <Text style={styles.ghostTypeText}>
                        Creating an Eidolon is a difficult and venerable task that should not be taken lightly. 
                        An Eidolon is akin to a Sprite, but with an important distinction: Eidola represent real
                        figures from history.
                    </Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={()=>{handleSelection("ESSENCE")}}
                style={{ flexDirection : 'row' }}>
                <View style={styles.ghostTypeContainer}>
                    <Text style={styles.ghostTypeHeader}>ESSENCE</Text>
                    <Text style={styles.ghostTypeSubHeader}>Cost: 10,000 Ecto</Text>
                    <View style={{width : '80%', height : 1, backgroundColor : 'white'}}/>
                    <Text style={styles.ghostTypeText}>
                        Creating an Essence is a difficult and venerable task that should not be taken lightly. 
                        An Essence is akin to a Sprite, but with an important distinction: Essences represent real 
                        life entities.
                    </Text>
                </View>
                </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
    
}

/*

IDEAS : POLTERGEIST, POOKA

*/

const styles = StyleSheet.create({
    screen : {
      flex:1,
    },
    ghostTypeContainer : {
        flex : 1,
        marginHorizontal : 12,
        borderWidth : 1,
        borderColor : colors.primary,
        borderRadius : 24,
        marginVertical : 6,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : colors.secondary,
        padding : 8
    },
    ghostTypeHeader : {
        ...constyles.genH3Text, 
        color : 'white', 
        textAlign : 'center'
    },
    ghostTypeSubHeader : {
        ...constyles.genH5Text, 
        color : 'white', 
        textAlign : 'center'
    },
    ghostTypeText : {
        ...constyles.genH4Text, 
        color : 'white', 
        textAlign : 'center', 
        paddingHorizontal : 12, 
        paddingTop : 8
    }

});

export default CreateGhostScreen;