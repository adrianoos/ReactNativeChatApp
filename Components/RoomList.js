import React from 'react';
import { Text, SafeAreaView, FlatList, View, Button } from 'react-native';
import styles from '../styles/styles';
import SearchIcon from './SearchIcon';
import RoomsIcon from './RoomsIcon';
import { createStackNavigator } from '@react-navigation/stack';
import ChatPanel from '../Components/ChatPanel';

const Stack = createStackNavigator();

const RoomList = ({ navigation, data }) => {



  const renderItem = ({ item }) => (
    <Item title={item.name} />);

  const Item = ({ title }) => (
    <View style={styles.listItem}>
      <Text style={styles.title}>{title}</Text>
    </View>);

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headetText}>ROOMS</Text>
        <SearchIcon />
        <RoomsIcon />
        <Button
        title="Go to Details"
        onPress={() => navigation.navigate('ChatPanel')}
      />
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
