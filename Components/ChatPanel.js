import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Text, View, Button } from 'react-native';
import styles from '../styles/styles';
import { PhoneIcon, VideoIcon, ProfileIcon } from '../assets/Icons'
import { getMessages, sendMessage, receiveMessages } from '../Components/queries';


const ChatPanel = ({ navigation, roomID, roomName }) => {

  const loggedUserID = '16193b7e-76d9-4bc4-ade7-5ab882380308';

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
      let data = await receiveMessages(roomID)
      const observer = {
        next: x => setReceivedMessage(x.data.messageAdded),
        error: err => console.error('Observer got an error: ' + err),
        complete: () => console.log('Observer got a complete notification'),
      };
      data.subscribe(observer)
    };

const insertMessage = (arr, index, newItem) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index)
];

const mergeMessages = () => {
  if (receivedMessage.user) {
    const _id = receivedMessage.id
    const text = receivedMessage.body
    const createdAt =  receivedMessage.insertedAt
    const user = {
         _id: receivedMessage.user.id,
    }
    let newItem = { _id, text, createdAt, user }
    const updated = insertMessage(roomMessages, 0, newItem)
   // if (!receivedMessage.user.id == loggedUserID) { // not multiply condition
     setRoomMessages(updated)
   // }

  }
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
mergeMessages()
  console.log(receivedMessage)
  console.log(roomMessages)
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
        _id: loggedUserID,
      }}
     />
     <Button // temp button to navigate
       title="BACK TO ROOMLIST"
       onPress={() => navigation.navigate('RoomList')}
     />
</View>
  
)};

  export default ChatPanel;


