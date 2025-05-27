import { View, Text, Button, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '@/components/clickbuy/Header';
import { useUser } from '@/contexts/UserContext';
import Slider from '@/components/clickbuy/Slider';
import fourthStep from '../styles/Cadastro/fourthStep';
import Categories from '@/components/clickbuy/Categories';
import ProductsList from '@/components/clickbuy/ProductList';
import Product from '@/components/clickbuy/ProductList/Product';
import { Product as ProductModel } from '@/types/Product';
import { useEffect, useState } from 'react';
import ip from '@/ip';

export default function TelaPrincipal() {
  const { user,  loadUserFavourites  } = useUser();
  const [products, setProducts] = useState<ProductModel[]>([]);
    useEffect(() => {
      loadUserFavourites()
        const fetchData = async () => {
            try {
                const response = await fetch(`http://${ip}:5000/products`);
                const productData = await response.json();

                setProducts(productData.slice(0,10));
            } catch (error) {
                console.log('Erro ao buscar produtos', error)
            }
        }

        fetchData();
    }, [])
  const router = useRouter();
  return (
    <View style={{ flex: 1}}>
      <Header/>
      <ScrollView style={fourthStep.Scroll} contentContainerStyle={{ flexGrow: 1 }}>
        <Slider/>
        <Categories/>
        <ProductsList title={'Mais Vendidos:'} products={products}/>
        <ProductsList title={'Recomendados para você:'} products={products}/>
      </ScrollView>
    </View>
  );
}
