import { StyleSheet, } from 'react-native'
const styles = StyleSheet.create({
    Container:{
        top: 350,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: 100,
        overflow: 'hidden',
    },
    Scroll:{
        display: 'flex',
        flexDirection: 'row',
    },
    Botao: {
        alignItems: 'center',
        backgroundColor: 'rgb(224, 224, 224)',
        justifyContent: 'center',
        borderWidth: 0,
        borderRadius: 10,
        marginHorizontal: 10,
        width: 90
      },
    SliderImage: {
        height: 30,  
        resizeMode: 'contain', 
        marginHorizontal: 8, 
      }      
  });
  export default styles