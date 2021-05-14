import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Text, View, Button, SafeAreaView, FlatList, TouchableWithoutFeedback } from 'react-native';
import styles from '../styles/styles';
import PhoneIcon from './PhoneIcon';
import VideoIcon from './VideoIcon';
import ProfileIcon from './ProfileIcon';
import { getRoom } from '../Components/queries';


const ChatPanel = ({ navigation, roomID, roomName }) => {

  const [roomMessages, setRoomMessages] = useState([])

  const setRoom = async () => {
    let data = await getRoom(roomID)
    setRoomMessages(data.response)
    }
console.log(roomName)

  useEffect(()=> {
    setRoom()
    }, [roomID])

    const renderItem = ({ item }) => (
      <Item title={item.body} id={item.id}/>);

    const Item = ({ title, id }) => (
      <TouchableWithoutFeedback style={styles.touchableElem} onPressIn={() => switchView(id)}>
      <View style={styles.listItem}>
        <Text style={styles.title}>{title}</Text>
      </View>
      </TouchableWithoutFeedback>
      );


  return (
<View style={styles.ChatPanelContainer}>
   <SafeAreaView style={styles.container}>
      <View style={styles.chatHeader}>
        <ProfileIcon />
        <View style={styles.ChatPanelHeaderTextContainer}>
        <Text style={styles.ChatPanelHeaderUp}>{roomName}</Text>
        <Text style={styles.ChatPanelHeaderDown}>ACTIVE NOW</Text>
        </View>
        <PhoneIcon />
        <VideoIcon />
      </View>
        <FlatList
         data={roomMessages}
         renderItem={renderItem}
         keyExtractor={item => item.id}
         />
  </SafeAreaView>
    <Button
        title="BACK TO ROOMLIST"
        onPress={() => navigation.navigate('RoomList')}
        />
</View>

  )};

  export default ChatPanel;


