import React from 'react';
import RoomList from './Components/RoomList';

const DATA = [
  {
    title: "Rooms",
    data: ["Room1", "Room2", "Room3"]
  }
];

const App = () => (
  <RoomList data={DATA}/>
);

export default App;