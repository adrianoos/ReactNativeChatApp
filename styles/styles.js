
import { StyleSheet, StatusBar } from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      marginHorizontal: 16,
      backgroundColor: 'rgb(221, 221, 221)'
    },
    listItem: {
      padding: 20,
      margin: 6,
      borderRadius: 4,
      backgroundColor: 'rgb(255, 255, 255)',
    },
    header: {
      position: 'relative',
      height: '10vw',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      padding: 8,
      backgroundColor: 'rgb(61, 207, 252)',
      borderBottomStartRadius: 14,
      borderBottomEndRadius: 14
    },
    headetText: {
      fontSize: '80px',
      color: 'rgb(0, 82, 107)',
      flex: 3,
      fontWeight: '500'
    },
    title: {
      fontSize: 24
    },

  });

  export default styles;