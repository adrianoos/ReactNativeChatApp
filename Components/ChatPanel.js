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

  useEffect(()=> {
    setRoom()
    }, [roomID])

    const [messages, setMessages] = useState([]);

    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
    }, []);

    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])


  return (
<View style={{flex: 1}}>
    <View style={styles.chatHeader}>
       <ProfileIcon />
         <View style={styles.ChatPanelHeaderTextContainer}>
         <Text style={styles.ChatPanelHeaderUp}>{roomName}</Text>
         <Text style={styles.ChatPanelHeaderDown}>ACTIVE NOW</Text>
     </View>
         <PhoneIcon />
         <VideoIcon />
     </View>
     <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
     />
     <Button
       title="BACK TO ROOMLIST"
       onPress={() => navigation.navigate('RoomList')}
     />
</View>
   )};

  export default ChatPanel;


