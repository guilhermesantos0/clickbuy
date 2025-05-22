import { StyleSheet, } from 'react-native'
const styles = StyleSheet.create({
    Container:{
      width: '100%',
      height: '100%',
  
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
    Carrinho:{
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        marginTop:30

    },
    Text:{
        fontSize: 32,
        fontWeight: 'bold'
    },
    Product:{
        width:'95%',
        height: 150,
        elevation: 5,
        borderRadius: 5,
        backgroundColor: 'white',
        overflow: 'hidden',
        flexDirection: 'column',
        marginVertical:10,
    },
    Anunciante:{
        borderBottomWidth:1,
        borderBottomColor: 'grey'

    },
    Nome: {
        fontSize: 18,
        padding: 5,
    },
    ProductCart:{
        width: '100%',
        height: '80%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    CheckBox:{
        marginHorizontal: 10,

    },
    ProductImage: {
      width: '30%',
      height: '100%',
    },
    Scroll:{
        width: '100%',
    },
    ProductInfo:{
        width: '40%',
        height: '100%',
        justifyContent: 'center',
        marginLeft:5
    },
    ProductName:{
        fontSize: 18,
        fontWeight: 'bold'
    },
    ProductPrice:{
        fontSize:15,
        fontWeight: 'bold'
    },
    Botao:{
        backgroundColor: 'red',
        borderRadius: 10,
        marginBottom:10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Remover:{
        color: 'white',
        padding:5
    },
    BotaoArea:{
        width: '20%',
        height: '100%',
        justifyContent: 'flex-end'
    
    },
    BotoesCart:{
        flexDirection: 'row',
        marginVertical:20
    },
    Botao2:{
        backgroundColor: 'white',
        borderWidth:2,
        borderColor: '#DDA04B',
        borderRadius: 10,
        marginBottom:10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Botao3:{
        backgroundColor: 'rgb(224, 224, 224)',
        borderRadius: 10,
        borderWidth:2,
        borderColor: '#DDA04B',
        marginBottom:10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Botao4:{
        backgroundColor: '#DDA04B',
        borderRadius: 10,
        marginBottom:10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Text2:{
        color: '#DDA04B',
        padding:5,
        fontSize:15
    },
    Text3:{
        color: 'white',
        padding:5,
        fontSize:15
    },
    Cart: {
      width: 200,
      height: 200,
      marginVertical:20
    },
    Text5:{
        fontSize:18,
        marginVertical:20
    },
    CarrinhoVazio:{
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        marginTop:30

    },
    Text6:{
        color: 'white',
        padding:5,
        fontSize:20
    },
  });
  export default styles