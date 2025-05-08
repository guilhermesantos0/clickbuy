import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { IconSymbol } from '@/components/ui/IconSymbol';
import styles from './styles/myProducts/styles';
import { useRouter } from 'expo-router';

const MyProducts = () => {
  const router = useRouter();
  return (
    <View style={styles.Container}>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push('/addProduct')}
      >
        <IconSymbol size={45} name='plus' color='white' />
      </TouchableOpacity>
    </View>
  )
}

export default MyProducts
