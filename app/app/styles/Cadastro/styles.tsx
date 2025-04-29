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
    Form: {
      width: '80%',
      height: '75%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '3%'
    },
    Title:{
      color: '#DDA04B',
      fontSize: 32,
    },
    Error:{
      color:'red'
    },
    Recovery: {
      fontSize:20,
      color: 'black',
      textDecorationLine: 'underline',
    },
  });
  export default styles