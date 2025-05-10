import { StyleSheet, } from 'react-native'
const styles = StyleSheet.create({
    filterButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: '#DDA04B',
    padding: 10,
    borderRadius: 25,
    elevation: 5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 5,
  },
  filterMenu: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 250,
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
    zIndex: 10,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  filterTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  filterOption: {
    paddingVertical: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    color: '#DDA04B'
  },
  priceInput: {
  height: 40,
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 8,
  paddingHorizontal: 10,
  marginBottom: 10,
  backgroundColor: 'white',
},

filterLabel: {
  fontWeight: 'bold',
  marginTop: 10,
  marginBottom: 4,
  color: '#DDA04B',
},
  });
  export default styles