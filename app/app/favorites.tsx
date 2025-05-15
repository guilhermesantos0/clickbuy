import { View, Text, ScrollView, TouchableOpacity, Animated, Dimensions, StyleSheet, TextInput } from 'react-native';
import ProductsList from '@/components/clickbuy/ProductList';
import { useEffect, useState, useRef } from 'react';
import { Product as ProductModel } from '@/types/Product';
import ip from '@/ip';

import fourthStep from './styles/Cadastro/fourthStep';
import { Ionicons } from '@expo/vector-icons';
import styles from '@/app/styles/category/styles'
import { getUserFavouriteProducts } from '@/services/favoriteService';
import { useUser } from '@/contexts/UserContext';


const screenWidth = Dimensions.get('window').width;

const Category = () => {
  const { user } = useUser();
  const [favourites, setFavourites] = useState<ProductModel[]>();
  const [filterVisible, setFilterVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(screenWidth)).current;
    const [sortOption, setSortOption] = useState('relevance');
    const [filteredProducts, setFilteredProducts] = useState(favourites);
    useEffect(() => {
        const fetchData = async () => {
            const userFavourites = await getUserFavouriteProducts(user?._id);
            setFavourites(userFavourites)
        }

        fetchData();
    })

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
  const parseFormattedPrice = (formattedPrice: any): number => {
  if (typeof formattedPrice === 'number') {
    return formattedPrice;
  }

  if (typeof formattedPrice === 'string') {
    if (formattedPrice.includes('R$') || formattedPrice.includes(',')) {
      return Number(
        formattedPrice
          .replace('R$', '')
          .replace(/\./g, '')
          .replace(',', '.')
          .trim()
      );
    } else {
      return Number(formattedPrice);
    }
  }

  return 0;
};


  useEffect(() => {
        let updatedProducts = [...(favourites ?? [])];
        switch (sortOption) {
          case 'highest':
            updatedProducts.sort(
              (a, b) => parseFormattedPrice(b.price) - parseFormattedPrice(a.price)
            );
            break;
          case 'lowest':
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
      }, [sortOption, favourites]);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.filterButton} onPress={openFilter}>
        <Ionicons name="funnel" size={24} color="white" />
      </TouchableOpacity>

      <ScrollView style={fourthStep.Scroll} contentContainerStyle={{ flexGrow: 1 }}>
        <ProductsList title={'Favoritos'} products={filteredProducts ?? []} />
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
            <TouchableOpacity onPress={() => setSortOption('highest')}>
                <Text style={styles.filterOption}>Maior Preço</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSortOption('lowest')}>
                <Text style={styles.filterOption}>Menor Preço</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSortOption('recent')}>
                <Text style={styles.filterOption}>Mais Recentes</Text>
            </TouchableOpacity>
            </Animated.View>

      )}
    </View>
  );
};


export default Category;
