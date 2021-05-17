import React, { useEffect } from 'react';
import { Text, SafeAreaView, FlatList, View, Button, Touchable, TouchableWithoutFeedback } from 'react-native';
import styles from '../styles/styles';
import SearchIcon from './SearchIcon';
import RoomsIcon from './RoomsIcon';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const RoomList = ({ navigation, data, setID, setRoomName }) => {

const switchView = (id, name) =>{
  navigation.navigate('ChatPanel')
  setID(id)
  setRoomName(name)
};

useEffect(() => setID('')) // temp function for cleaning RoomId after switch from ChatPanel

  const renderItem = ({ item }) => (
    <Item title={item.name} id={item.id} name={item.name}/>);

  const Item = ({ title, id, name }) => (
    <TouchableWithoutFeedback style={styles.touchableElem} onPressIn={() => switchView(id, name)}>
    <View style={styles.listItem}>
      <Text style={styles.title}>{title}</Text>
    </View>
    </TouchableWithoutFeedback>
    );

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ROOMS</Text>
        <SearchIcon />
        <RoomsIcon />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

export default RoomList;
