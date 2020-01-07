import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import constyles from '../constants/constyles';
import colors from '../constants/colors';
import moment from 'moment';
import TouchTile from '../components/touchTile';
import GenInfoModal from '../modals/genInfoModal';
import CreateGhostOptionsList from '../components/createGhostOptionsList';
import CreateGhostForm from '../components/createGhostForm';



const CreateGhostScreen = props => {

    const [modalView, setModalView] = useState();
    const [ghostType, setGhostType] = useState();

    function handleSelection(selection){
        if(selection === 'EIDOLON'){
            setModalView(<GenInfoModal 
                headerText="EIDOLON"
                subheaderText="The Sprites For Historical Figures"
                bodyTextArray={[
                    "An Eidolon manager's goal is to approximate the character of a historical figure as accurately "+
                    "and transparently as possible.",
                    "Eidola are extraordinary ghosts; they cannot be maintained by just anyone. "+
                    "GhostIRC strives to give historical figures the respect they deserve and the first step "+
                    "is you.",
                    "The creator of an Eidolon must be an expert on the figure in question. For this reason "+
                    "all Eidolon creators must be vetted before they can be confirmed.",
                    
                ]}
                onClose={() => {setModalView(null)}}
                secondButtonTitle="Create"
                secondButtonOnPress={() => {
                    setGhostType('EIDOLON');
                    setModalView(null);
                }}
                activeSecondButton={true}
            />);
            return;
        }
        if(selection === 'ESSENCE'){
            setModalView(<GenInfoModal 
                headerText="ESSENCE"
                subheaderText="The Sprites For Entities"
                bodyTextArray={[
                    "An Essence manager's goal is to approximate the character of an entity or concept as accurately "+
                    "and transparently as possible.",
                    "Essences are extraordinary ghosts; they cannot be maintained by just anyone. "+
                    "GhostIRC strives to give all entities the respect they deserve and the first step "+
                    "is you.",
                    "The creator of an Essence must be an expert on the entity or concept in question. For this reason "+
                    "all Essence creators must be vetted before they can be confirmed.",
                    
                ]}
                onClose={() => {setModalView(null)}}
                secondButtonTitle="Create"
                secondButtonOnPress={() => {
                    setGhostType('ESSENCE');
                    setModalView(null);
                }}
                activeSecondButton={true}
            />);
            return;
        }
        setGhostType(selection);
    }

    return  <View style={{flex : 1, justifyContent : 'center', alignItems : 'center', margin : 12}}>

                { ghostType ?
                    <CreateGhostForm 
                        ghostType={ghostType}
                        setGhostType={setGhostType}
                        user={props.user}
                        socket={props.socket}
                        furtherScreenHistory={props.furtherScreenHistory}
                    />
                :
                    <CreateGhostOptionsList handleSelection={handleSelection}/>
                }
                
                {modalView}
            </View>
    
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