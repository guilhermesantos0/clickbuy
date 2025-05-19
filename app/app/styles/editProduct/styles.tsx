import { StyleSheet, } from 'react-native'
const styles = StyleSheet.create({
    Container:{
      width: '100%',
      height: '100%',
  
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
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
    text:{
      fontSize:16,
      marginTop:20,
      color: '#DDA04B'
  },
    Form: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    Tabs:{
        width:'100%',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    TabOption:{
        width: '33%',
        height: '100%',
        display: 'flex',
      alignItems: 'center',
        justifyContent: 'center'

    },
    selected:{
        color: '#DDA04B'
    },
    ButtomArea:{
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end'
    },
    Save: {
      width: '49%',
      marginHorizontal: 5,
      alignItems: 'center',
      paddingHorizontal: 2,
      marginTop: 30,
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      backgroundColor: '#DDA04B',
      borderRadius: 5,
      paddingVertical: 10,
      marginBottom: 40
    },
    buttomText: {
      color: 'white',
      fontSize: 15,
    },
    Scroll:{
    width: '80%',
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
      TextArea: {
      width: '100%',
        height: 200,
        marginTop: 10,
        fontSize: 15,
        backgroundColor: 'rgb(224, 224, 224)',
        paddingLeft:8,
        borderWidth: 0,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: '1%',
        textAlignVertical: 'top',
    },
  });
  export default styles