import { StyleSheet, } from 'react-native'
const SecondStep = StyleSheet.create({
    InputContainer:{
      width: '100%',
  
      display: 'flex',
      flexDirection: 'column'
    },
    InputArea: {
      width: '100%',
      height: 180,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    InputGroup:{
      width: '100%',
    },
    Input:{
      width: '100%',
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
    InvalidPassword:{
      borderWidth: 2,
      borderColor: 'red'
    },
    ButtonsArea:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      marginTop: '3%',
    },
    Next: {
      width: '49%',
      alignItems: 'center',
      paddingHorizontal: 2,
      marginTop: 30,
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      backgroundColor: '#DDA04B',
      borderRadius: 5,
    },
    buttomText: {
      color: 'white',
      fontSize: 32,
    },
    text:{
        fontSize:16,
        marginTop: 10
    }
  });
  export default SecondStep