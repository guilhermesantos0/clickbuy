import ProductsList from '@/components/clickbuy/ProductList';
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
    Title:{
        fontSize: 22,
        color: 'green',
        fontWeight: 'bold'
    },
    Text:{
        fontSize:18
    },
    ProductsTitle:{
        marginTop: 20,
        fontSize: 22,
        fontWeight: 'bold'
    },
    Products:{
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        marginVertical:20,
        padding:20
    },
    ProductName:{
        fontSize:18,
        fontWeight: 'bold'
    },
    BotaoArea:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Botao:{
        width: '50%',
        backgroundColor: '#DDA04B',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20
    },
    Text2:{
        color:'white'
    },
  });
  export default styles