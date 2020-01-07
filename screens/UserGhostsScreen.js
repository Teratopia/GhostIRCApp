import React, {useState} from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import constyles from '../constants/constyles';
import colors from '../constants/colors';
import moment from 'moment';
import TouchTile from '../components/touchTile';
import SelectedGhostView from '../components/selectedGhostView';

const UserGhostsScreen = props => {

    const [isInit, setIsInit] = useState(false);
    const [userGhosts, setUserGhosts] = useState(false);
    const [ghost, setGhost] = useState(null);

    if(!isInit){
      props.socket.emit('getUserGhosts', {
        userId : props.user._id
      });
      props.socket.removeListener('getUserGhosts');
      props.socket.on('getUserGhosts', res => {
        console.log('getUserGhosts res = ', res);
        if(res.success){
          setUserGhosts(res.ghosts);
        }
      });
      setIsInit(true);
    }

    return  <SafeAreaView style={{flex : 1, justifyContent : 'center', alignItems : 'center', width : '100%'}}>
              
          {
            ghost ?
            <SelectedGhostView 
              socket={props.socket}
              ghost={ghost}
              user={props.user}
              />
          :
          <View style={{flex : 1, justifyContent : 'center', alignItems : 'center', width : '100%'}}>
              <TouchableOpacity 
                onPress={()=>{props.furtherScreenHistory("CREATE GHOST")}}
                style={{ flexDirection : 'row' }}>
                <View style={styles.cardContainer}>
                    <Text style={{...constyles.genH2Text, textAlign : 'center', color : 'white'}}>Make a Ghost!</Text>
                </View>
              </TouchableOpacity>

        {
          userGhosts ?
              <FlatList
              style={{width : '100%'}}
                data={userGhosts}
                renderItem={itemData => 
                <TouchableOpacity 
                    onPress={()=>{setGhost(itemData.item)}}
                    style={{ flexDirection : 'row', width : '100%' }}>
                    <View style={{...styles.cardContainer, backgroundColor : null, justifyContent : 'flex-start', padding : 12}}>
                    <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                      <Text style={{...constyles.genH3Text, color : colors.primary}}>{itemData.item.name}</Text>
                      <Text style={{...constyles.genH3Text, color : colors.tertiary}}>{itemData.item.type}</Text>
                    </View>
                    <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                      <Text style={{...constyles.genH4Text, color : colors.secondary}}>Ecto: 0</Text>
                      <Text style={{...constyles.genH4Text, color : colors.secondary}}>Unread: 0</Text>
                    </View>
                    
                    </View>
                  </TouchableOpacity>
                }
                keyExtractor={itemData => itemData._id}
              />
          :
          null
        }       
        </View>   
        }
    </SafeAreaView>
    
}

const styles = StyleSheet.create({
    screen : {
      flex:1,
    },
    cardContainer : {
      flex : 1,
      marginHorizontal : 12,
      height : 80,
      borderWidth : 1,
      borderColor : colors.primary,
      borderRadius : 24,
      marginVertical : 6,
      justifyContent : 'center',
      //alignItems : 'center',
      backgroundColor : colors.secondary
  }

});

export default UserGhostsScreen;