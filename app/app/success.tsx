import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles/Checkout/success'
import { Ionicons } from '@expo/vector-icons'
import { Product } from '@/types/Product'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router'

const Success = () => {
    const { id } = useLocalSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        const loadProducts = async () => {
            const data = await AsyncStorage.getItem('checkoutProducts');
            if (data) {
            setProducts(JSON.parse(data));
            }
        };

        loadProducts();
        }, []);
  return (
    <View style={styles.Container}>
      <Ionicons name="checkmark-circle" size={280} color="green" />
      <Text style={styles.Title}>Pagamento realizado com sucesso!</Text>
      <Text style={styles.Text}>ID do pagamento: {id}</Text>
      <Text style={styles.ProductsTitle}>📦 Produtos comprados:</Text>
      <View style={styles.Products}>
        {products.map((product, idx) => (
            <Text style={styles.ProductName} key={idx}>{product.name}</Text>
        ))}
      </View>
      <View style={styles.BotaoArea}>
        <TouchableOpacity onPress={() => router.push(`/(tabs)`)} style={styles.Botao}>
            <Text style={styles.Text2}>Continuar Comprando</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Success