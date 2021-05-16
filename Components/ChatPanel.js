import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Text, View, Button } from 'react-native';
import styles from '../styles/styles';
import PhoneIcon from './PhoneIcon';
import VideoIcon from './VideoIcon';
import ProfileIcon from './ProfileIcon';
import { getMessages, sendMessage } from '../Components/queries';


const ChatPanel = ({ navigation, roomID, roomName }) => {

  const [roomMessages, setRoomMessages] = useState([])
  const [newMessage, setNewMessage] = useState(false)

  const getMsg = async () => {
    let data = await getMessages(roomID)
    let dataMessage = data.data.room.messages
    let messagesArray = []
    for (let item in dataMessage) {
      const _id = dataMessage[item].id
      const text = dataMessage[item].body
      const createdAt =  new Date()
      const user = {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      }
      let newItem = { _id, text, createdAt, user }
      messagesArray.push(newItem)
    }
    setRoomMessages(messagesArray)
    };

useEffect(()=> {
  getMsg()
}, [roomID])


useEffect(()=> {
if (roomMessages.length) {
 sendMessage(roomID, roomMessages[0].text)
}
}, [newMessage])

const onSend = useCallback((messages = []) => {
  setRoomMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  setNewMessage(!newMessage)
}, [])


return (

<View style={{flex: 1}}>
    <View style={styles.chatHeader}>
       <ProfileIcon />
         <View style={styles.ChatPanelHeaderTextContainer}>
         <Text style={styles.ChatPanelHeaderUp}>{roomName}</Text>
         <Text style={styles.ChatPanelHeaderDown}>ACTIVE NOW</Text>
     </View>
         <PhoneIcon />
         <VideoIcon />
     </View>
     <GiftedChat
      messages={roomMessages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
     />
     <Button // temp button to navigate
       title="BACK TO ROOMLIST"
       onPress={() => navigation.navigate('RoomList')}
     />
</View>
  
)};

  export default ChatPanel;


