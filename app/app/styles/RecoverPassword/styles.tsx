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
      width: '90%',
      borderRadius: 10,
      backgroundColor: 'white',
      elevation: 5,
      padding: 20,
      alignItems: 'center'
    },
    Title:{
      fontSize: 25,
      fontWeight: 'bold',
    },
    Success:{
      fontSize: 15,
      marginTop:10,
      textAlign: 'center',
      color: 'green'
    },
    Error:{
        fontSize: 15,
      marginTop:10,
      textAlign: 'center',
      color: 'red'
    },
    Text:{
      fontSize: 15,
      marginTop:10,
      textAlign: 'center'
    },
    Input:{
      height: 50,
      width: '90%',
      marginTop: 10,
      fontSize: 15,
      backgroundColor: 'rgb(224, 224, 224)',
      borderWidth: 0,
      borderRadius: 10,
      paddingVertical: 0,
    },
    Button: {
      backgroundColor: '#DDA04B',
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 5,
      marginTop: 20
    },
    ButtonText: {
      color: 'white',
    },
  });
  export default styles