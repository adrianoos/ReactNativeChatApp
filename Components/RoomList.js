import React from 'react';
import RoomItem from '../Components/RoomItem'
import { Text, SafeAreaView, SectionList } from 'react-native';
import styles from '../styles/styles';



const RoomList = ({ data }) => (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <RoomItem title={item} />}
        renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );

  export default RoomList;