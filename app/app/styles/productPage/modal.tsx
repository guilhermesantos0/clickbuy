import { StyleSheet, } from 'react-native'
const modal = StyleSheet.create({
    Container:{
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center'
    },
    Modal:{
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center'
    },
    Title:{
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 10
    },
    Text:{
        fontSize: 16,
         marginBottom: 20
    },
    ButtonArea:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%' 
    },
    CartButton:{
        backgroundColor: '#DDA04B',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
        alignItems: 'center'
    },
    ContinueButton:{
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center'
    },
    Text2:{
        color: 'white'
    }
  });
  export default modal