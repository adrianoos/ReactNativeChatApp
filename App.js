import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
//import * as React from 'react';
import RoomList from './Components/RoomList';
import ChatPanel from './Components/ChatPanel';
import { getRooms } from './Components/queries';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const App = () => {

const Stack = createStackNavigator();

const [fetchedRooms, setFetchedRooms] = useState([])
const [roomID, setRoomID] = useState('')
const [roomName, setRoomName] = useState('')


const getData = async () => {
  let data = await getRooms()
  setFetchedRooms(data.response)
  }

useEffect(()=> {
getData()
}, [])

return (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{
        headerShown: false}}
        initialRouteName="RoomList">
      <Stack.Screen name="RoomList">
       {props => <RoomList {...props} data={fetchedRooms} roomID={roomID} setID={setRoomID} setRoomName={setRoomName} />}
      </Stack.Screen>
      <Stack.Screen name="ChatPanel">
       {props => <ChatPanel {...props} roomID={roomID} roomName={roomName}/>}
      </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>


)};

export default App;
