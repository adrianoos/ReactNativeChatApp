import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Text, View, Button } from 'react-native';
import styles from '../styles/styles';
import PhoneIcon from './PhoneIcon';
import VideoIcon from './VideoIcon';
import ProfileIcon from './ProfileIcon';
import { getMessages, sendMessage } from '../Components/queries';


const ChatPanel = ({ navigation, roomID, setRoomID, roomName }) => {

  const [roomMessages, setRoomMessages] = useState([])
  const [newMessage, setNewMessage] = useState(false)

  const getMsg = async () => {
    let data = await getMessages(roomID)
    let dataMessage = data.data.room.messages
    let messagesArray = []
    for (let item in dataMessage) {
      const _id = dataMessage[item].id
      const text = dataMessage[item].body
      const createdAt =  dataMessage[item].insertedAt
      const user = {
        _id: dataMessage[item].user.id,

      }
      let newItem = { _id, text, createdAt, user }
      messagesArray.push(newItem)
    }
    messagesArray.reverse()
    setRoomMessages(messagesArray)
    };

useEffect(()=> {
  getMsg()
}, [roomID])

console.log(roomMessages)

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
        _id: '16193b7e-76d9-4bc4-ade7-5ab882380308', // temp hardcoded
      }}
     />
     <Button // temp button to navigate
       title="BACK TO ROOMLIST"
       onPress={() => navigation.navigate('RoomList')}
     />
</View>
  
)};

  export default ChatPanel;


