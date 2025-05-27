import { StyleSheet, } from 'react-native'
const styles = StyleSheet.create({
    Container:{
      width: '100%',
      height: '100%',
  
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    myOrdersContainer:{
      marginVertical: 40,
      width: '90%',
      borderRadius: 10,
      backgroundColor: 'white',
      elevation: 5,
      padding: 10,
    },
    Title:{
      fontSize: 25,
      fontWeight: 'bold',
      borderBottomWidth: 1,
      borderBottomColor: 'grey'
    },
    Text:{
      fontSize: 18,
      marginTop:10
    },
    Scroll:{
      width: '100%'
    }
  });
  export default styles