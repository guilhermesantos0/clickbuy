import { StyleSheet, Dimensions } from 'react-native';
import { State } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  Container: {
    width: screenWidth * 0.43,
    borderRadius: 10,
    marginVertical: 10,
    overflow: 'hidden',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  ImageContainer: {
    width: '90%',
    height: 150,
    overflow: 'hidden',
    borderTopRightRadius: 10,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  Image: {
    width: '100%',
    height: '100%', 
    resizeMode: 'cover', 
  },
  
  
  
  
  ProductInfo: {
    width: '90%',
  },
  Name: {
    fontSize: 18,
    height: 50,
    overflow: 'hidden',
    fontWeight: 'bold'
  },
  State: {
    fontSize: 18,
    height: 30,
    overflow: 'hidden',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#DDA04B',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1
  },
  pin: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  AnnouncerIcon:{
    resizeMode: 'cover',
        width: 20,
        height: 20,
        borderRadius:10,
        marginRight:10
  },
  AnnouncerName:{

  },
  NameIcon:{
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: 5
  },
});

export default styles;
