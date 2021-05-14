import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
//import * as React from 'react';
import RoomList from './Components/RoomList';
import ChatPanel from './Components/ChatPanel';
import { Rooms } from './Components/queries';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const App = () => {

const Stack = createStackNavigator();

const [fetchedRooms, setFetchedRooms] = useState([])
const [roomID, setroomID] = useState('')

const getData = async () => {
  let data = await Rooms()
  setFetchedRooms(data.response)
  }

useEffect(()=> {
getData()
}, [])



console.log(fetchedRooms)

return (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{
        headerShown: false}}
        initialRouteName="RoomList">
      <Stack.Screen name="RoomList">
       {props => <RoomList {...props} data={fetchedRooms} roomID={roomID} setID={setroomID} />}
      </Stack.Screen>
      <Stack.Screen name="ChatPanel">
       {props => <ChatPanel {...props} roomID={roomID} />}
      </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>


)};

export default App;
