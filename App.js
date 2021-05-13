import React, { useState, useEffect } from 'react';
import RoomList from './Components/RoomList';
import { Rooms } from './Components/queries';

const App = () => {

const [fetchedRooms, setFetchedRooms] = useState([])

const getData = async () => {
  let data = await Rooms()
  setFetchedRooms(data.response)
  }

useEffect(()=> {
getData()
}, [])

return (
<RoomList data={fetchedRooms}
  />
)};

export default App;
