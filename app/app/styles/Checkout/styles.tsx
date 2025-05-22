import ProductsList from '@/components/clickbuy/ProductList';
import { StyleSheet, } from 'react-native'
const styles = StyleSheet.create({
    Container:{
      width: '100%',
      height: '100%',
  
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
    Products:{
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10,
        backgroundColor: 'white',
        elevation:5,
        paddingHorizontal:10,
        marginTop:20
    },
    Title:{
        fontSize:25,
        color: '#DDA04B',
        fontWeight: 'bold'
    },
    ProductsList:{
        width:'100%',
        marginTop:30,
        borderBottomWidth:1,
        borderBottomColor: 'grey',

    },
    Product:{
        width:'100%',
        flexDirection:'row',
        paddingVertical:5
    },
    ProductName:{
        fontSize:15,
        fontWeight: 'bold',
        width:'80%'
    },
    Total:{
        fontSize:20,
        fontWeight: 'bold',
        width:'80%',
        marginVertical:20
    },
    Opcoes:{
        flexDirection: 'row',
        width:'100%',
        borderBottomWidth:1,
        borderBottomColor: 'grey'
    },
    Opcao:{
        width:'50%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical:10
    },
    OpcaoText:{
        fontSize:20,
        fontWeight: 'bold'
    },
    OpcaoTextSelecionado:{
        fontSize:20,
        fontWeight: 'bold',
        color: '#DDA04B'
    },
    Form:{
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
     Input2:{
      width: '49%',
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
    Scroll:{
        width: '100%'
    },
    CheckBox:{
        margin: 10,

    },
    Selecao:{
        flexDirection: 'row',
        alignItems: 'center'
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
    Text:{
        color:'white'
    },
    Qrcode:{
        width: 200,
        height: 200,
    },
    QrcodeArea:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
  });
  export default styles