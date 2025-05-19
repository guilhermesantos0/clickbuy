import { StyleSheet, } from 'react-native'
const styles = StyleSheet.create({
    Container:{
      width: '100%',
      height: '100%',
  
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    floatingButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      width: 80,
      height: 80,
      backgroundColor: '#DDA04B',
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 5,
      elevation: 5,
    },
    Product:{
      width: '100%',
      height: 160,
      paddingHorizontal: 10,
      flexDirection: 'row',
      backgroundColor: 'rgba(255, 255, 255, 0.45)',
    },
    Product2:{
      width: '100%',
      height: 160,
      paddingHorizontal: 10,
      flexDirection: 'row',
      backgroundColor: 'white',
    },
    ProductImage: {
      width: '30%',
      height: '100%'
    },
    ProductInfo:{
      height: '100%',
      width: '50%',
      flexDirection: 'column',
      display: 'flex',
      paddingHorizontal: 10,
      paddingTop: 20

    },
    ProductName:{
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10
    },
    ProductPrice:{
      fontSize: 16,
      color: '#DDA04B',
      fontWeight: 'bold'
    },
    Icons:{
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end',
      marginStart: 30
    },
    Icon: {
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    padding: 10,
    borderRadius: 25,
    elevation: 5,
    marginEnd:10,
    marginBottom: 20
  },
  });
  export default styles