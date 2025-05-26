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
    Scroll:{
        width:'100%'
    },
    UserContainer:{
        width: '90%',
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        marginTop: 20
    },
    User:{
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    AnnouncerIcon:{
    resizeMode: 'cover',
        width: 80,
        height: 80,
        borderRadius:40,
        marginHorizontal:10
  },
  AnnouncerName:{
    fontSize: 25,
    fontWeight: 'bold'
  },
  Title:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  UserInfo:{
    padding: 20
  },
  InfoTitle:{
    marginVertical: 10,
    fontSize: 15,
    fontWeight: 'bold'
  },
  Anuncios:{
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '90%',
    marginTop: 20
  },
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
AnunciosContainer:{
    padding: 10,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        marginTop: 20
    },
    TituloAnuncio:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    PickerArea:{
        borderRadius: 10,
        overflow:'hidden',
        marginTop:10
    },
    Picker:{
        backgroundColor:'rgb(224, 224, 224)',
    },
  });
  export default styles