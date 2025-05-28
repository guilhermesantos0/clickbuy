import { View, Text, ScrollView, TouchableOpacity, Animated, Dimensions, StyleSheet, TextInput } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ProductsList from '@/components/clickbuy/ProductList';
import { useEffect, useState, useRef } from 'react';
import { Product, Product as ProductModel } from '@/types/Product';
import ip from '@/ip';
import fourthStep from './styles/Cadastro/fourthStep';
import { Ionicons } from '@expo/vector-icons';
import styles from '@/app/styles/category/styles'
import { useUser } from '@/contexts/UserContext';
import api from '@/services/api';
import HeaderSearch from '@/components/clickbuy/headerSearch';

const screenWidth = Dimensions.get('window').width;

const SearchPage = () => {
    const {user} = useUser();
    const { query } = useLocalSearchParams();
    
    
    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get(`/products?name=${query}`)
            setProducts(res.data);
        }

        fetchData();
    },[query])
  const [filterVisible, setFilterVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(screenWidth)).current;
   const [products, setProducts] = useState<Product[]>([]);

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortOption, setSortOption] = useState('relevance');
    const [filteredProducts, setFilteredProducts] = useState(products);

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

    useEffect(() => {
        let updatedProducts = [...products];
      
        if (minPrice) {
          updatedProducts = updatedProducts.filter(
            (product) => parseFormattedPrice(product.price) >= parseFloat(minPrice)
          );
        }
      
        if (maxPrice) {
          updatedProducts = updatedProducts.filter(
            (product) => parseFormattedPrice(product.price) <= parseFloat(maxPrice)
          );
        }
      
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
      }, [minPrice, maxPrice, sortOption, products]);

  return (
    <View style={{ flex: 1 }}>
      <HeaderSearch/>
      <TouchableOpacity style={[styles.filterButton, { top: 150 }]} onPress={openFilter}>
        <Ionicons name="funnel" size={24} color="white" />
      </TouchableOpacity>

      <ScrollView style={fourthStep.Scroll} contentContainerStyle={{ flexGrow: 1 }}>
        {filteredProducts.length === 0 ? (
          <ProductsList title={`Não foi encontrado nenhum resultado para: ${query}`} products={filteredProducts} />
        ):(
          <ProductsList title={`Resultados para: "${query}"`} products={filteredProducts} />
        )}
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
            <Text style={[styles.filterTitle, {marginTop: 120}]}>Filtrar por:</Text>


            <TouchableOpacity onPress={() => setSortOption('relevance')}>
                <Text style={styles.filterOption}>Mais Relevantes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSortOption('highest')}>
                <Text style={styles.filterOption}>Maior Preço</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSortOption('lowest')}>
                <Text style={styles.filterOption}>Menor Preço</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSortOption('recent')}>
                <Text style={styles.filterOption}>Mais Recentes</Text>
            </TouchableOpacity>
            <Text style={styles.filterLabel}>Preço mínimo (R$)</Text>
            <TextInput
                style={styles.priceInput}
                keyboardType="numeric"
                placeholder="Ex: 10"
                value={minPrice}
                onChangeText={setMinPrice}
            />

            <Text style={styles.filterLabel}>Preço máximo (R$)</Text>
            <TextInput
                style={styles.priceInput}
                keyboardType="numeric"
                placeholder="Ex: 100"
                value={maxPrice}
                onChangeText={setMaxPrice}
            />
            </Animated.View>

      )}
    </View>
  );
};


export default SearchPage;
