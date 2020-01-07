import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Keyboard, KeyboardAvoidingView } from 'react-native';
import constyles from '../constants/constyles';
import colors from '../constants/colors';
import moment from 'moment';
import TouchTile from '../components/touchTile';
import GenInfoModal from '../modals/genInfoModal';
import GenButton from '../components/genButton';
import CreateGhostOptionsList from '../components/createGhostOptionsList';
import Geolocation from '@react-native-community/geolocation';  //

const CreateGhostForm = props => {

    const [nameInput, setNameInput] = useState();
    const [chatCardText, setChatCardText] = useState();
    const [modalView, setModalView] = useState();

    function postGhost(){
            var sendType = props.ghostType === "Will-O'-THE-WISP" ? 'WISP' : props.ghostType;
            Geolocation.getCurrentPosition(position => {
              console.log('postGhost position = ', position);
              if(nameInput && setChatCardText){
                props.socket.emit('createGhost', {
                  userId : props.user._id,
                  name : nameInput,
                  type : sendType,
                  chatCardText : chatCardText,
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                });
                props.setGhostType(null);
                props.furtherScreenHistory('MY GHOSTS');
              }
            });
            
    }

    function createButtonHandler(){
      if(props.ghostType === 'EIDOLON' || props.ghostType === 'ESSENCE'){
        setModalView(<GenInfoModal 
          headerText="ESSENCES AND EIDOLA"
          subheaderText="Beginning The Vetting Process"
          bodyTextArray={[
              "You're one step close to creating your ghost! Selecting 'Continue!' will subtract 1000 Ecto from "+
              "your account and generate an email sent to your address. The email will contain a link to "+
              "your vetting form.",
              "The 1000 Ecto cost is a non-refundable processing fee, with the remaining 9,000 Ecto only subtracted "+
              "when your application is accepted.",
              "Are you sure you wish to continue?"
          ]}
          closeTitle="Cancel"
          onClose={() => {
            setModalView(null);
            props.setGhostType(null);
          }}
          secondButtonTitle="Continue!"
          secondButtonOnPress={() => {
              setModalView(null);
              
          }}
          activeSecondButton={true}
          headerTextStyle={constyles.genH3Text}
        />);
      } else {
        let price;
        props.ghostType === 'SPRITE' ? price = '100'
        : props.ghostType === "WILL-O'-THE-WISP" ? price = '500'
        : props.ghostType === 'CHANNEL' ? price = '1000' 
        : null;
        setModalView(<GenInfoModal 
          headerText="CONFIRM YOUR GHOST!"
          subheaderText="Are You Sure?"
          bodyTextArray={[
              "You're one step close to creating your ghost! Selecting 'Continue!' will subtract "+price+" Ecto from "+
              "your account and add your new ghost to your ghost list.",
              "Your ghost's location is your current position and can only be changed by spending Ecto, so make "+
              "sure you're where you mean to be!",
              "Are you sure you wish to continue?"
          ]}
          closeTitle="Cancel"
          onClose={() => {
            setModalView(null);
            props.setGhostType(null);
          }}
          secondButtonTitle="Continue!"
          secondButtonOnPress={() => {
            setModalView(null);
            postGhost();
          }}
          activeSecondButton={true}
          headerTextStyle={constyles.genH3Text}
        />);
      }
    }

    async function attachSocketListeners(){
      console.log('attachSocketListeners 1');
      props.socket.removeListener('createGhost');
      props.socket.on('createGhost', res => {
          console.log('createGhost, res = ', res);
      });
    }

    attachSocketListeners();

    return  <KeyboardAvoidingView style={{flex : 1, justifyContent : 'center', alignItems : 'center', margin : 12}}>
              <Text style={{...constyles.genH3Text, color : colors.primary}}>
                {props.ghostType === 'EIDOLON' || props.ghostType === 'ESSENCE' ? 'MAKE AN '+props.ghostType+'!' : 'MAKE A '+props.ghostType+'!'}
              </Text>
              <Text style={{...constyles.genH5Text, color : colors.secondary}}>
                Name
              </Text>
              <View style={{flexDirection : 'row', marginBottom : 12}}>
                <TextInput style={constyles.genTextInput}
                    placeholder='e.g. Casper'
                    onSubmitEditing={(e) => {setNameInput(e.nativeEvent.text)}}
                    returnKeyLabel="done"
                />
              </View>
              
              <Text style={{...constyles.genH5Text, color : colors.secondary}}>
                Starting Chat Card
              </Text>
              <View style={{flexDirection : 'row', flex : 1, marginBottom : 12}}>
                <TextInput style={{...constyles.genTextInput, textAlign : 'auto', textAlignVertical : 'top', justifyContent : 'flex-start'}}
                    placeholder="e.g. Hi there! I'm Casper the friendly ghost!"
                    onSubmitEditing={(e) => {setChatCardText(e.nativeEvent.text)}}
                    multiline={true}
                />
              </View>

            <View style={{flexDirection : 'row'}}>
              <GenButton
                title="Cancel"
                onPress={()=>{props.setGhostType(null)}}
              />

              <GenButton
                title="Create!"
                onPress={createButtonHandler}
                style={constyles.activeButton}
              />    
            </View>
              

            {modalView}
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