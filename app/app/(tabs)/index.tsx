import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '@/components/clickbuy/Header';
import { useUser } from '@/contexts/UserContext';

export default function TelaPrincipal() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    </View>
  );
}
