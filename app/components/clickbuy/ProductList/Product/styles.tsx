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
    height: '100%', 
    resizeMode: 'cover', 
  },
  
  
  
  
  ProductInfo: {
    width: '90%',
  },
  Name: {
    fontSize: 18,
    marginBottom: 5,
    height: 64,
    overflow: 'hidden',
    fontWeight: 'bold'
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
  },
  pin: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  Overlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(0,0,0,0.9)',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
  zIndex: 1,
},

RemoveButton: {
  marginTop: 10,
  paddingHorizontal: 12,
  paddingVertical: 6,
  backgroundColor: '#DDA04B',
  borderRadius: 6,
},

RemoveButtonText: {
  color: '#fff',
  fontWeight: 'bold',
},
TextSold:{
  fontSize: 20,
  color: 'white',
  fontWeight: 'bold',
  marginTop:10
}

});

export default styles;
