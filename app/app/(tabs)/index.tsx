import { View, Text, Button, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '@/components/clickbuy/Header';
import { useUser } from '@/contexts/UserContext';
import Slider from '@/components/clickbuy/Slider';
import fourthStep from '../styles/Cadastro/fourthStep';
import Categories from '@/components/clickbuy/Categories';
import ProductsList from '@/components/clickbuy/ProductList';
import Product from '@/components/clickbuy/ProductList/Product';

export default function TelaPrincipal() {
  const { user } = useUser();
  const sampleProduct = {
    name: 'Tênis Esportivo',
    image: 'https://img.olx.com.br/images/54/546580515113727.webp',
    price: 249.90,
    location: 'São Paulo, SP'
  }
  const router = useRouter();

  return (
    <View style={{ flex: 1}}>
      <Header/>
      <ScrollView style={fourthStep.Scroll} contentContainerStyle={{ flexGrow: 1 }}>
        <Slider/>
        <Categories/>
        <ProductsList title={'Mais Vendidos:'}/>
        <ProductsList title={'Recomendados para você:'}/>
      </ScrollView>
    </View>
  );
}
