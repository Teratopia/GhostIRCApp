import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import constyles from '../constants/constyles';
import colors from '../constants/colors';
import CreateGhostOptionCard from '../components/createGhostOptionCard';

const CreateGhostOptionsList = props => {

    return  <SafeAreaView style={{flex : 1, justifyContent : 'center', alignItems : 'center', width : '100%'}}>
                <ScrollView style={{flex : 1, width : '100%', marginBottom : 8}}>
                
                <CreateGhostOptionCard 
                    handleSelection={props.handleSelection}
                    name={"SPRITE"}
                    cost={"Cost: 100 Ecto"}
                    bodyText={"Sprites are the most common ghosts. They typically appear in one location but they can inhabit many. People can speak with a befriended Sprite from anywhere and can view them on the map, unless they are Shaded."}
                />
                <CreateGhostOptionCard 
                    handleSelection={props.handleSelection}
                    name={"WILL-O'-THE-WISP"}
                    cost={"Cost: 500+ Ecto"}
                    bodyText={"Will-o'-the-Wisps are rare, elusive ghosts that lead friendly travellers to new locations. Always visible on the map, the Ecto cost of a Wisp varies by the distance of the path it creates."}
                /> 
                <CreateGhostOptionCard 
                    handleSelection={props.handleSelection}
                    name={"CHANNEL"}
                    cost={"Cost: 1000+ Ecto"}
                    bodyText={"Channels are not ghosts, per se, more like conduits for interacting with others. Visible on the map unless they are shaded, you may only contribute to a channel when within its radius. The Ecto cost of a channel varies by its diamater."}
                /> 
                <CreateGhostOptionCard 
                    handleSelection={props.handleSelection}
                    name={"SHADOW"}
                    cost={"Cost: 0 Ecto"}
                    bodyText={"Shadows are the rarest and most unique ghost type. They are not attached to a location at all--instead, they are attached to a living person. Creating a Shadow means making a one of a kind ghost just for you."}
                /> 
                <CreateGhostOptionCard 
                    handleSelection={props.handleSelection}
                    name={"EIDOLON"}
                    cost={"Cost: 10,000 Ecto"}
                    bodyText={"Creating an Eidolon is a difficult and venerable task that should not be taken lightly. An Eidolon is akin to a Sprite, but with an important distinction: Eidola represent real figures from history."}
                /> 
                <CreateGhostOptionCard 
                    handleSelection={props.handleSelection}
                    name={"ESSENCE"}
                    cost={"Cost: 10,000 Ecto"}
                    bodyText={"Creating an Essence is a difficult and venerable task that should not be taken lightly. An Essence is akin to a Sprite, but with an important distinction: Essences represent real life entities."}
                /> 

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

export default CreateGhostOptionsList;