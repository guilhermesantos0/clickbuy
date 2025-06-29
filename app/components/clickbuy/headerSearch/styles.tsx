import { StyleSheet, } from 'react-native'
const styles = StyleSheet.create({
    Container:{
      width:'100%',
      height: 130,
      zIndex: 99999,
      display: 'flex',
      paddingTop: 0,
      justifyContent: 'space-between',
      backgroundColor:'#DDA04B',
      top: 0,
      left: 0,
    },
    InputContainer:{
      paddingVertical: 15,
      marginTop: 40,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      height: '70%'
    },
    InputWithIcon: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 8,
      paddingHorizontal: 10,
      flex: 1,
      marginRight:10
    },
    Input: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 8,
      color: '#000',
    },    
    Cart:{
      marginTop: 5,
      display:'flex',
      width: '20%',
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  export default styles