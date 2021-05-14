import React from 'react';
import { Text, View, Button } from 'react-native';
import styles from '../styles/styles';


const ChatPanel = ({ navigation, title }) => (
    <View>
      <Text>HI I AM CHAT PANEL</Text>
      <Button
        title="BACK TO ROOMLIST"
        onPress={() => navigation.navigate('RoomList')}
      />
    </View>
  );

  export default ChatPanel;