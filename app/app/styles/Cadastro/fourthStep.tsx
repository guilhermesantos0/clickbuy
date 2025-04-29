import { StyleSheet, } from 'react-native'
const fourthStep = StyleSheet.create({
    InputContainer:{
      width: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    InputArea: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
  
    },
    InputGroup:{
      width: '100%',
    },
    Input:{
      width: '100%',
      height: 45,
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
    InputFocused: {
      borderRadius: 5,
    },
    text:{
      fontSize:16,
  },
  ButtonsArea:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop:15
  },
  Next: {
    width: '49%',
    alignItems: 'center',
    paddingHorizontal: 2,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    backgroundColor: '#DDA04B',
    borderRadius: 5,
  },
  Scroll:{
    width: '100%'
  }
  });
  export default fourthStep