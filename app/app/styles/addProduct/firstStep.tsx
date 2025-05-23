import { StyleSheet, } from 'react-native'
const firstStep = StyleSheet.create({
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
        backgroundColor: 'rgb(224, 224, 224)',
        paddingLeft:8,
        borderWidth: 0,
        borderRadius: 10,
        paddingVertical: 0,
        paddingHorizontal: '1%',
    },
    InvalidPassword:{
      borderWidth: 2,
      borderColor: 'red'
    },
    ButtonsArea:{
      display: 'flex',
      alignItems: 'center',
      justifyContent:  'flex-end',
      flexDirection: 'row',
      marginTop: '3%',
      
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
      marginBottom: 40
    },
    buttomText: {
      color: 'white',
      fontSize: 15,
    },
    text:{
        fontSize:16,
        marginTop: 10
    },
    TextArea: {
      width: '100%',
        height: 200,
        marginTop: 10,
        fontSize: 15,
        backgroundColor: 'rgb(224, 224, 224)',
        paddingLeft:8,
        borderWidth: 0,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: '1%',
        textAlignVertical: 'top',
    },
  });
  export default firstStep