import { StyleSheet, } from 'react-native'
const styles = StyleSheet.create({
    Container:{
      width: '100%',
      height: '100%',
  
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
    Input:{
      width: '100%',
      height: 45,
      marginTop: 10,
      fontSize: 15,
      backgroundColor: 'rgb(224, 224, 224)',
    paddingLeft:8,
      borderWidth: 0,
      borderRadius: 10,
      paddingVertical: 0,
      paddingHorizontal: '1%',
    },
    text:{
      fontSize:16,
      marginTop:20,
      color: '#DDA04B'
  },
    Form: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    Tabs:{
        width:'100%',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    TabOption:{
        width: '33%',
        height: '100%',
        display: 'flex',
      alignItems: 'center',
        justifyContent: 'center'

    },
    selected:{
        color: '#DDA04B'
    },
    ButtomArea:{
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end'
    },
    Save: {
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
    Scroll:{
    width: '80%',
  }
  });
  export default styles