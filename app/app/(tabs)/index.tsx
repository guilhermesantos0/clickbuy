import { View, Text, Button, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '@/components/clickbuy/Header';
import { useUser } from '@/contexts/UserContext';
import Slider from '@/components/clickbuy/Slider';
import fourthStep from '../styles/Cadastro/fourthStep';
import Categories from '@/components/clickbuy/Categories';

export default function TelaPrincipal() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView style={fourthStep.Scroll} contentContainerStyle={{ flexGrow: 1 }}>
        <Slider/>
        <Categories/>
      </ScrollView>
    </View>
  );
}
