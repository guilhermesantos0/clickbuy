import { StyleSheet, } from 'react-native'
const firstStep = StyleSheet.create({
    InputContainer:{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    InputArea:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    Input:{
      width: '100%',
      height: 60,
      marginTop: 10,
      fontSize: 15,
      backgroundColor: 'rgb(224, 224, 224)',
      paddingLeft:8,
      outline: 'none',
      borderWidth: 0,
      borderRadius: 10,
      paddingVertical: 0,
      paddingHorizontal: '1%',
    },
    Next: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 90,
      marginTop: 30,
      backgroundColor: '#DDA04B',
      borderRadius: 5,
    },
    buttomText: {
      color: 'white',
      fontSize: 40,
    },
    text:{
      fontSize:16,
      marginTop: 10
  }
  });
  export default firstStep