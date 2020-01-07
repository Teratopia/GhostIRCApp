import React, {useState} from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import constyles from '../constants/constyles';
import colors from '../constants/colors';
import TouchTile from './touchTile';
import GhostInteractionView from './ghostInteractionView';

const SelectedGhostView = props => {
    const [mainView, setMainView] = useState();
    
    return <View style={{flex : 1, width : '100%', paddingHorizontal : 24, paddingVertical : 8, justifyContent : 'center', alignItems : 'center'}}>
    <Text style={{...constyles.genH1Text, textAlign : 'center'}}>{props.ghost.name}</Text>
    <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
      <Text style={{...constyles.genH4Text, color : colors.secondary, textAlign : 'center', width : '33%'}}>Ecto: 0</Text>
      <Text style={{...constyles.genH4Text, color : colors.primary, textAlign : 'center', width : '33%'}}>{props.ghost.type}</Text>
      <Text style={{...constyles.genH4Text, color : colors.secondary, textAlign : 'center', width : '33%'}}>Unread: 0</Text>
    </View>

    { mainView ? 
        mainView
    :
        <View style={{flex : 1, width : '100%', paddingHorizontal : 24, paddingVertical : 8, justifyContent : 'center', alignItems : 'center'}}>
            <View style={{flexDirection : 'row', justifyContent : 'space-evenly'}}>
                <TouchTile 
                    title="INTERACT" 
                    sizeChange={32} 
                    cornerCount={0}
                    fontSize={24}
                    onPress={() => {
                        setMainView(<GhostInteractionView
                            ghost={props.ghost}
                            user={props.user}
                            socket={props.socket}
                        />)}}
                />
                <TouchTile 
                    title="REQUESTS" 
                    sizeChange={32} 
                    cornerCount={0}
                    fontSize={24}
                    onPress={() => {}}
                />
            </View>
            <View style={{flexDirection : 'row', justifyContent : 'space-evenly'}}>
                <TouchTile 
                    title="LOCATIONS" 
                    sizeChange={32}
                    fontSize={24}
                    onPress={() => {}}
                />
                <TouchTile 
                    title="MORE" 
                    sizeChange={32}
                    fontSize={24}
                    onPress={() => {}}
                />
            </View>   
        </View>
    }

               
  </View>
}

export default SelectedGhostView;