import { StyleSheet, } from 'react-native'
const styles = StyleSheet.create({
    Container:{
      width: '100%',
      height: '100%',
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    SliderContainer:{
        width: '100%',
        height: 400,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    Slider:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    SliderImage:{
        width:'100%',
        height:'90%',
        objectFit: 'cover',
        aspectRatio: 1, 
    },
    navButton: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.45)',
      zIndex: 1,
      paddingHorizontal: 10,
      
    },
    Prev: {
      left: 0,
    },
    Next: {
      right: 0,
    },    
    arrow: {
        fontSize: 32,
        color: '#00000'
      },
    MainImage:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover', 
        borderWidth: 3,
        borderColor: '#DDA04B',
  },
  Image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: 'black',

  },
  ImageContainer:{
    width: 80,
    height: 80,
    margin: 10,
    borderRadius: 3,
  },
  ImageRow:{
      display: 'flex',
      flexDirection: 'row',
      width: '95%',
      height: '100%',
      overflow: 'hidden'

    },
    Row:{
        height: 90
    },
    Text:{
        marginHorizontal:10,
      fontSize: 35,
      marginTop:30,
    },
    ProductInfo:{
        backgroundColor: 'white',
        marginTop:10,
        height: 400
    },
    Price:{
        marginHorizontal:10,
      fontSize: 30,
      color:'#DDA04B',
      marginTop:20,
      fontWeight: 'bold',
    },
    Buy: {
        width: '80%',
      backgroundColor: '#DDA04B',
      paddingVertical: 10,
      borderRadius: 5,
       display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    ButtonText: {
      color: 'white',
      fontSize: 25,
    },
    ButtomArea:{
        width: '100%',
        height: 80,
        marginTop: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    InfoRow:{
        width:'100%',
        height: '20%',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginTop:30,
        marginBottom:10
    },
    IconsArea:{
        display: 'flex',
        flexDirection: 'row',
        marginStart:20,
        height:45,
        justifyContent:'flex-start',
        width: '40%',



    },
    filterButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
    elevation: 5,
    marginEnd:10,
  },
  Date:{
    display: 'flex',
        flexDirection: 'row',
        height:45,
        alignItems: 'center',
        justifyContent:'flex-end',
        width: '50%',
  },
  Announcer:{
    display: 'flex',
    flexDirection: 'column',
    height:45,
    marginBottom:60,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%'
  },
  NameIcon:{
    display: 'flex',
    flexDirection: 'row',
    width: 'auto',
    height: '100%',
    alignItems: 'center',
    marginTop: 25
  },
  AnnouncerIcon:{
    resizeMode: 'cover',
        width: 80,
        height: 80
  },
  AnnouncerName:{
    fontSize: 25
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:20,
    marginHorizontal:10
  },
  TextTitle:{
        marginHorizontal:10,
      fontSize: 23,
      fontWeight: 'bold',
      marginTop:30,
    },
    Description:{
      fontSize: 15,
      marginHorizontal:10,
      marginTop:15
    },
    ProductDescription:{
        marginTop:10,
        height: 450
    },
    Details:{
      display: 'flex',
      marginTop: 15,
      flexDirection: 'row',

    },
    TitleDetails:{
      fontSize: 19,
      fontWeight: 'bold',
      color: '#DDA04B',
    },
    Arrow:{
      marginTop:3
    }
  });
  export default styles