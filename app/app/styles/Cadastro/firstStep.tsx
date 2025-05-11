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
    ButtonsArea:{
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent:  'flex-end',
      flexDirection: 'row',
      marginTop: '3%',
      
    },
    Input:{
      width: '100%',
      height: 60,
      marginTop: 10,
      fontSize: 15,
      backgroundColor: 'rgb(224, 224, 224)',
      paddingLeft:8,
      borderWidth: 0,
      borderRadius: 10,
      paddingVertical: 0,
      paddingHorizontal: '1%',
    },
    Next: {
      width: '49%',
      marginHorizontal: 5,
      alignItems: 'center',
      paddingHorizontal: 2,
      marginTop: 30,
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      backgroundColor: '#DDA04B',
      borderRadius: 5,
      paddingVertical: 10,
    },
    buttomText: {
      color: 'white',
      fontSize: 15,
    },
    text:{
        fontSize:16,
        marginTop: 10
    }
  });
  export default firstStep