import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Text, View, Button } from 'react-native';
import styles from '../styles/styles';
import PhoneIcon from './PhoneIcon';
import VideoIcon from './VideoIcon';
import ProfileIcon from './ProfileIcon';
import { getMessages, sendMessage, receiveMessages } from '../Components/queries';


const ChatPanel = ({ navigation, roomID, roomName }) => {

  const [roomMessages, setRoomMessages] = useState([])
  const [newMessage, setNewMessage] = useState(false)
  const [receivedMessage, setReceivedMessage ] = useState([])

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

    const listenerOn = async () => {
      let data = await receiveMessages()
      const observer = {
        next: x => setReceivedMessage(x),
        error: err => console.error('Observer got an error: ' + err),
        complete: () => console.log('Observer got a complete notification'),
      };
      data.subscribe(observer)
    };

useEffect(()=> {
 if (roomID) {
   getMsg()
   listenerOn()
  }
}, [roomID])


useEffect(()=> {
if (roomMessages.length) {
 sendMessage(roomID, roomMessages[0].text)
}
}, [newMessage])

useEffect(()=> {
  console.log(receivedMessage)
  }, [receivedMessage])


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


