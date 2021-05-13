import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles/styles';


const RoomItem = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  export default RoomItem;