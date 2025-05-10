import { View, Text, ScrollView, TouchableOpacity, Animated, Dimensions, StyleSheet, TextInput } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ProductsList from '@/components/clickbuy/ProductList';
import { useEffect, useState, useRef } from 'react';
import { Product as ProductModel } from '@/types/Product';
import ip from '@/ip';
import fourthStep from './styles/Cadastro/fourthStep';
import { Ionicons } from '@expo/vector-icons';
import styles from '@/app/styles/category/styles'

const screenWidth = Dimensions.get('window').width;

const Category = () => {
  const { categoria } = useLocalSearchParams();
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(screenWidth)).current;
  const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortOption, setSortOption] = useState('relevance');
    const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://${ip}:5000/products?category=${categoria}`);
      const result = await response.json();
      setProducts(result.products);
    };
    fetchData();
  }, [categoria]);

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
      <TouchableOpacity style={styles.filterButton} onPress={openFilter}>
        <Ionicons name="funnel" size={24} color="white" />
      </TouchableOpacity>

      <ScrollView style={fourthStep.Scroll} contentContainerStyle={{ flexGrow: 1 }}>
        <ProductsList title={`${categoria}`} products={filteredProducts} />
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


export default Category;
