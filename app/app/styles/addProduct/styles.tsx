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
    Page: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    Title:{
      marginTop: 30,
      color: '#DDA04B',
      fontSize: 32,
    },
    Form:{
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
      ButtonsArea:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginTop: '3%',
      },
      ImageButton:{
        width: '80%',
        height: '60%',
        borderWidth: 2,
        borderColor: 'grey',
        borderStyle: 'dashed',
        borderRadius: 10,
        backgroundColor: 'lightgray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      ImageForm:{
        width: '80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    ImageRow:{
      display: 'flex',
      flexDirection: 'row',
      width: '95%',
      height: 80,
      overflow: 'hidden'

    },
    Image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', 

  },
  deleteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  ImageContainer:{
    width: 120,
    height: 120,
    margin: 10,
    borderRadius: 3,
  },
  MainImage:{
    width: '100%',
    height: '100%',
    resizeMode: 'cover', 
    borderWidth: 3,
    borderColor: '#DDA04B',
  },
  PickerArea:{
    borderRadius: 10,
    overflow:'hidden'
  },
  Picker:{
    backgroundColor:'rgb(224, 224, 224)',
  },
  });
  export default styles