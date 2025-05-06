import { StyleSheet, } from 'react-native'
const styles = StyleSheet.create({
    Container:{
      width:'100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    ImageContainer: {
        marginTop: 30,
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      },
      
    Image:{
        resizeMode: 'contain',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'white'
    },
    IconOverlay: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 16,
        padding: 4,
      },
  });
  export default styles