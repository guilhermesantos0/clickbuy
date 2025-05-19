import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IconSymbol } from '@/components/ui/IconSymbol';
import styles from './styles/myProducts/styles';
import { useRouter } from 'expo-router';
import fourthStep from './styles/Cadastro/fourthStep';
import { useUser } from '@/contexts/UserContext';
import { Product } from '@/types/Product';
import api from '@/services/api';
import ip from '@/ip';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

const MyProducts = () => {
  const { user } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!user?._id) return;
      try {
        const response = await api.get(`/products/user/${user._id}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchData();
  }, [user]);

  const handleDeleteProduct = async (productId: string) => {
    const response = await api.delete(`/products/${productId}`)
        if(response.status == 200) {
          Toast.show({
                  type: 'success',
                  text1: 'Produto deletado com sucesso!',
                });
            setProducts((prev) => prev?.filter((p) => p._id !== productId));
        } else {
          Toast.show({
                  type: 'error',
                  text1: 'Erro ao deletar produto',
                });
        }
  };
  const confirmDeleteProduct = (productId: string, name: string) => {
  Alert.alert(
    'Remover Produto',
    `Tem certeza que deseja remover ${name}?\n\nEsta ação é irreversível!`,
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: () => handleDeleteProduct(productId),
      },
    ]
  );
};


  return (
    <View style={styles.Container}>
      <ScrollView style={fourthStep.Scroll} contentContainerStyle={{ flexGrow: 1 }}>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product, index) => (
            <TouchableOpacity onPress={() => router.push(`/productPage?id=${product._id}`)} key={product._id} style={index%2 === 0 ? styles.Product : styles.Product2}>
              <Image
                source={{ uri: product.mainImage}}
                style={styles.ProductImage}
                resizeMode="center"
              />
              <View style={styles.ProductInfo}>
                <Text style={styles.ProductName}>{product.name}</Text>
                <Text style={styles.ProductPrice}>{product.price}</Text>
                <Text numberOfLines={2}>{product.description}</Text>
              </View>
              <View style={styles.Icons}>
                <TouchableOpacity onPress={() => router.push(`/editProduct?id=${product._id}`)} style={styles.Icon}>
                  <Ionicons name="pencil" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.Icon} onPress={() => confirmDeleteProduct(product._id, product.name)}>
                  <Ionicons name="trash" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>Você não possui produtos</Text>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push('/addProduct')}
      >
        <IconSymbol size={45} name='plus' color='white' />
      </TouchableOpacity>
    </View>
  );
};

export default MyProducts;
