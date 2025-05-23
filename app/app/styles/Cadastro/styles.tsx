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
    Form: {
      width: '80%',
      height: '75%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '3%'
    },
    Title:{
      color: '#DDA04B',
      fontSize: 32,
    },
    Error:{
      color:'red'
    },
    Recovery: {
      fontSize:20,
      color: 'black',
      textDecorationLine: 'underline',
    },
    dropdownButtonStyle: {
        width: '100%',
        height: 60,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 3,
      },
      dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
      },
      dropdownButtonArrowStyle: {
        fontSize: 28,
      },
      dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
      },
      dropdownMenuStyle: {
        height:'20%' ,
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
      },
      dropdownMenuStyle2: {
        height:'13%' ,
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
      },
      dropdownMenuStyle3: {
        height:'10%' ,
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
      },
      dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
      },
      dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
      },
  });
  export default styles