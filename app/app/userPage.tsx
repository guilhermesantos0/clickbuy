import { View, Text, ScrollView, Image, Animated, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import styles from './styles/userPage/styles'
import { useUser } from '@/contexts/UserContext';
import { useParams } from 'react-router-dom';
import { User } from '@/types/User';
import { Category } from '@/types/Category';
import { Product } from '@/types/Product';
import { useLocalSearchParams } from 'expo-router';
import api from '@/services/api';
import { Ionicons } from '@expo/vector-icons';
import ProductsList from '@/components/clickbuy/ProductList';
import { Picker } from '@react-native-picker/picker';
const genericPhoto = require('@/assets/ClickBuy/iconeGenerico.png');
const screenWidth = Dimensions.get('window').width;
const userPage = () => {
    const { user } = useUser();
    const { id } = useLocalSearchParams();
    const [userProfile, setUserProfile] = useState<User>();
    const [userProducts, setUserProducts] = useState<Product[]>();
    const [soldProducts, setSoldProducts] = useState<number>();

    const [categories, setCategories] = useState<Category[]>([]);

    const [categoryFilter, setCategoryFilter] = useState();
    const [filter, setFilter] = useState<'recent' | 'price'>();
    const [filteredProducts, setFilteredProducts] = useState(userProducts);
    const slideAnim = useRef(new Animated.Value(screenWidth)).current;
    const [filterVisible, setFilterVisible] = useState(false);
    const openFilter = () => {
        setFilterVisible(true);
        Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        }).start();
    };

    const closeFilter = () => {
        Animated.timing(slideAnim, {
        toValue: screenWidth,
        duration: 300,
        useNativeDriver: true,
        }).start(() => {
        setFilterVisible(false);
        });
    };
    const parseFormattedPrice = (formattedPrice: any) => {
        return Number(
          formattedPrice
            .replace('R$', '')
            .replace(/\./g, '')
            .replace(',', '.')
            .trim()
        );
    };
    const filterOptions = [
        {
            label: 'Mais Recentes',
            value: 'recent'
        },
        {
            label: 'Menor Preço',
            value: 'price'
        }
    ]
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Erro ao buscar categorias', error)
            }
        }

        fetchData();
    }, [])
    useEffect(() => {
        const fetchData = async() => {
            if(id && user) {
                const userResponse = await api.get(`/user/${id}`);
                setUserProfile(userResponse.data);

                const productsResponse = await api.get(`/user/${id}/products`);
                const products: Product[] = productsResponse.data;
                setUserProducts(products)
                setFilteredProducts(products)

                const soldProductsArr = products?.filter((product) => product.sold === true);
                setSoldProducts(soldProductsArr?.length)
            }
        }

        fetchData();
    },[id, user])
    const getCategoryName= (id: number) => {
        const category = categories.filter(cat => cat._id == id);
        return category[0].name
    }
    useEffect(() => {
        if(userProducts) {
            let updatedProducts = [...userProducts];
          
            if(categoryFilter && categoryFilter !== "-1") {
                const categoryName = getCategoryName(categoryFilter);
                updatedProducts = updatedProducts.filter(product => product.category === categoryName);
            }

            switch (filter) {
                case 'price':
                    updatedProducts.sort(
                        (a, b) => parseFormattedPrice(a.price) - parseFormattedPrice(b.price)
                    );
                    break;
                case 'recent':
                    updatedProducts.sort(
                        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    );
                    break;
                default:
                    break;
            }
          
            setFilteredProducts(updatedProducts);
        }
      }, [filter, categoryFilter]);
  return (
        <View style={styles.Container}>
            <TouchableOpacity style={styles.filterButton} onPress={openFilter}>
                <Ionicons name="funnel" size={24} color="white" />
            </TouchableOpacity>
        <ScrollView style={styles.Scroll} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.Container}>
                <View style={styles.UserContainer}>
                <View style={styles.User}>
                    <Image
                        style={styles.AnnouncerIcon}
                        source={userProfile?.profilePic ? { uri: userProfile?.profilePic } : genericPhoto }
                        />
                    <Text style={styles.AnnouncerName}>{userProfile?.personalData.name}</Text>
                </View>
                <View style={styles.UserInfo}>
                    <Text style={styles.Title}>Informações de Contato</Text>
                    <Text style={styles.InfoTitle}>Telefone:</Text>
                    <Text>{userProfile?.personalData.phone}</Text>
                    <Text style={styles.InfoTitle}>Email:</Text>
                    <Text>{userProfile?.email}</Text>
                </View>
            </View>
            <View style={styles.Anuncios}>
                <Text style={styles.AnnouncerName}>Anúncios</Text>
                <View style={styles.AnunciosContainer}>
                    <View style={styles.TituloAnuncio}>
                        <Ionicons name="time" size={24} color="black" />
                        <Text style={styles.Title}>Histórico</Text>
                    </View>
                    <Text>{userProducts?.length} Produtos anunciados</Text>
                    <Text>{soldProducts} Vendidos</Text>
                </View>
            </View>
            <ProductsList title={"Produtos:"} products={filteredProducts?  filteredProducts: []} />

            </View>
    </ScrollView>
    {filterVisible && (
            <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closeFilter} />
        )}

        {filterVisible && (
            <Animated.View
                style={[
                    styles.filterMenu,
                    {
                    transform: [{ translateX: slideAnim }],
                    },
                ]}
                >
                <Text style={styles.filterTitle}>Filtrar por:</Text>
                <TouchableOpacity onPress={() => setFilter('price')}>
                    <Text style={styles.filterOption}>Menor Preço</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('recent')} >
                    <Text style={styles.filterOption}>Mais Recentes</Text>
                </TouchableOpacity>
                <View style={styles.PickerArea}>
                    <Picker
                        style={styles.Picker}
                        selectedValue={categoryFilter}
                        onValueChange={(itemValue, itemIndex) => {
                            setCategoryFilter(itemValue)
                        }}
                        >
                            <Picker.Item label="Todas" value={null} />
                        {categories.map((cat) => (
                            <Picker.Item key={cat._id} label={cat.name} value={cat._id} />
                        ))}
                        </Picker>
                </View>
                
                </Animated.View>

        )}
            </View>
  )
}

export default userPage