import React, { useState, useEffect } from 'react';
import RoomList from './Components/RoomList';
import { Rooms } from './Components/queries';

const DATA = [
  {
    title: "Rooms",
    data: ["Room1", "Room2", "Room3"]
  }
];

const App = () => {

const [fetchedRooms, setFetchedRooms] = useState({})

const getData = async () => {
  let data = await Rooms()
  setFetchedRooms(data)
  }

useEffect(()=> {
getData()
}, [])

console.log(fetchedRooms)

return (
<RoomList data={DATA}
  />
)};

export default App;