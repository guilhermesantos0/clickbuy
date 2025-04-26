import { StyleSheet, } from 'react-native'
const styles = StyleSheet.create({
    Container: {
      width: '100%',
      height: '100%',
  
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    Form:{
      width: '80%',
      height: 350,
  
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '3%'
    },
    Title:{
      color:'#DDA04B',
      fontSize: 32
    },
    InputContainer:{
      paddingVertical: 10,
      width: '85%',
  
      display: 'flex',
      flexDirection: 'column',
    },
    Input:{
      height: 60,
      marginTop: 10,
      fontSize: 15,
      backgroundColor: 'rgb(188, 188, 188)',
      outline: 'none',
      borderWidth: 0,
      borderRadius: 10,
      paddingVertical: 0,
      paddingHorizontal: '1%',
    },
    InputFocused: {
      borderRadius: 5,
    },
    Texto: {
      fontSize: 20,
    },
    Recovery: {
      fontSize:20,
      paddingBottom: 50,
      color: 'black',
      textDecorationLine: 'underline',
    },
    ButtonsArea:{
      width: '80%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flexDirection: 'row',
    },
    Login: {
      backgroundColor: '#DDA04B',
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 5,
    },
    ButtonText: {
      color: 'white',
    },
    ButtonText2: {
      color: '#DDA04B',
    },
    SignUP: {
      backgroundColor: 'white',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#DDA04B',
    },
  
  
  });
  export default styles