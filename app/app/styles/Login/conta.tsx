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
    Button:{
        marginTop: 2,
        width:'100%',
        backgroundColor: 'white',
        height: 80,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    Option:{
        width: '100%',
        height: '100%',
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    Text:{
        fontSize: 20,
        marginLeft:20,
        color: 'rgb(101, 101, 101)'
    },
    TextExit:{
        fontSize: 20,
        marginLeft:20,
        color: 'red'
    },
  });
  export default styles