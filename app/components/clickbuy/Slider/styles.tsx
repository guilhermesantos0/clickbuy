import { StyleSheet, } from 'react-native'
const styles = StyleSheet.create({
    SliderContainer:{
        width: '100%',
        height: 200,
        overflow: 'hidden',
    },
    Slider:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    SliderImage:{
        width:'100%',
        height:'100%',
        objectFit: 'cover'
    },
    navButton: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.45)',
      zIndex: 1,
      paddingHorizontal: 10,
      
    },
    Prev: {
      left: 0,
    },
    Next: {
      right: 0,
    },    
    arrow: {
        fontSize: 32,
        color: '#00000'
      },
  });
  export default styles