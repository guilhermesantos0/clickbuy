import { StyleSheet, } from 'react-native'
const styles = StyleSheet.create({
    Container:{
      width: '100%',
      marginTop: 40,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    Duplas:{
        display: 'flex',
        width:'100%',
        flexDirection: 'row',
        justifyContent:'flex-start',
    },
    Title:{
        fontSize:25,
        color:'#DDA04B',
    },
    TitleFrame:{
        width: '100%',
        alignItems: 'flex-start',
        paddingHorizontal: 15,
        marginBottom: 12, 
    }
    
  });
  export default styles