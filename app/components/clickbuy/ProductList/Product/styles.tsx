import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  Container: {
    width: screenWidth * 0.5,
    borderRadius: 10,
    marginVertical: 10,
    overflow: 'hidden',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  ImageContainer: {
    width: '90%',
    height: 200,
    overflow: 'hidden',
    borderTopRightRadius: 10,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  Image: {
    width: '100%',
    height: 'auto', 
    aspectRatio: 1, 
    resizeMode: 'cover', 
  },
  
  
  
  
  ProductInfo: {
    paddingLeft: 15,
    width: '90%',
  },
  Name: {
    fontSize: 18,
    marginBottom: 5,
    height: 64,
    overflow: 'hidden',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pin: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default styles;
