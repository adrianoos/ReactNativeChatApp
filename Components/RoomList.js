import React from 'react';
import { Text, SafeAreaView, FlatList, View } from 'react-native';
import styles from '../styles/styles';


const RoomList = ({ data }) => {

  const renderItem = ({ item }) => (
    <Item title={item.name} />
  );

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

export default RoomList;
