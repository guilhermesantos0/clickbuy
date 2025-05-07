import { StyleSheet, } from 'react-native'
const styles = StyleSheet.create({
    Container:{
      width:'100%',
      height: 250,
      zIndex: 99999,
      display: 'flex',
      paddingTop: 0,
      justifyContent: 'space-between',
      backgroundColor:'#DDA04B',
      top: 0,
      left: 0,
    },
    ImageContainer:{
        marginTop: 30,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    Image:{
        resizeMode: 'cover',
        width: 100,
        height: 100
    },
    Name: {
        fontSize: 30,
        marginTop: 10,
        height: 64,
        overflow: 'hidden',
      },
  });
  export default styles