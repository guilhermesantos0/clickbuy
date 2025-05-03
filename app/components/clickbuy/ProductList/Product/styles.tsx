import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  Container: {
    width: screenWidth * 0.5,
    borderRadius: 10,
    alignItems: 'flex-start',
    marginVertical: 10,
    overflow: 'hidden',
  },
  ImageContainer: {
    width: '100%',
    aspectRatio: 1.0,
    borderTopRightRadius: 10,
    alignItems: 'center'
  },
  Image: {
    width: '90%',
    height: '90%',
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
