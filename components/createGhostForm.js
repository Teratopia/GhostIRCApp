import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Keyboard, KeyboardAvoidingView } from 'react-native';
import constyles from '../constants/constyles';
import colors from '../constants/colors';
import moment from 'moment';
import TouchTile from '../components/touchTile';
import GenInfoModal from '../modals/genInfoModal';
import GenButton from '../components/genButton';
import CreateGhostOptionsList from '../components/createGhostOptionsList';

const CreateGhostForm = props => {

    const [nameInput, setNameInput] = useState();
    const [descriptionInput, setDescriptionInput] = useState();

    return  <KeyboardAvoidingView style={{flex : 1, justifyContent : 'center', alignItems : 'center', margin : 12}}>
              <Text style={{...constyles.genH5Text, color : colors.secondary}}>
                Name
              </Text>
              <View style={{flexDirection : 'row', marginBottom : 12}}>
                <TextInput style={constyles.genTextInput}
                    //placeholder='password'
                    onSubmitEditing={(e) => {setNameInput(e.nativeEvent.text)}}
                    //returnKeyLabel="done"
                    //secureTextEntry={true}
                />
              </View>
              
              <Text style={{...constyles.genH5Text, color : colors.secondary}}>
                Starting Chat Card
              </Text>
              <View style={{flexDirection : 'row', flex : 1, marginBottom : 12}}>
                <TextInput style={{...constyles.genTextInput, textAlign : 'auto', textAlignVertical : 'top', justifyContent : 'flex-start'}}
                    //placeholder='password'
                    onSubmitEditing={(e) => {setDescriptionInput(e.nativeEvent.text)}}
                    //returnKeyLabel="done"
                    //secureTextEntry={true}
                    multiline={true}
                />
              </View>

            <View style={{flexDirection : 'row'}}>
              <GenButton
                title="Cancel"
                onPress={()=>{}}
              />

              <GenButton
                title="Create!"
                onPress={()=>{}}
              />    
            </View>
              


            </KeyboardAvoidingView>
    
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

export default CreateGhostForm;