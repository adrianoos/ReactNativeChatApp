import React from 'react';
import { Text, SafeAreaView, FlatList, View, Button, Touchable, TouchableWithoutFeedback } from 'react-native';
import styles from '../styles/styles';
import SearchIcon from './SearchIcon';
import RoomsIcon from './RoomsIcon';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const RoomList = ({ navigation, data, roomID, setID }) => {

const switchView = (id) =>{
  navigation.navigate('ChatPanel')
  setID(id)
}

  const renderItem = ({ item }) => (
    <Item title={item.name} id={item.id}/>);

  const Item = ({ title, id }) => (
    <TouchableWithoutFeedback style={styles.touchableElem} onPressIn={() => switchView(id)}>
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
