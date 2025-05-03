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
    NavButton:{
        position: 'absolute',
        top: '50%',
        transform: [{ translateY: -15 }],
    },
    navButton: {
        position: 'absolute',
        justifyContent: 'center',
        height: '100%',
        transform: [{ translateY: -15 }],
        backgroundColor: 'transparent',
        zIndex: 1,
        paddingHorizontal: 10,
      },
      arrow: {
        fontSize: 32,
        color: 'white',
      },
      Prev :{
        left:10
      },
      Next:{
        right: 10
      }
  });
  export default styles