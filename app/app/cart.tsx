import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@/contexts/UserContext';
import { Product } from '@/types/Product';
import api from '@/services/api';
import styles from './styles/Cart/styles';
import Checkbox from 'expo-checkbox';
import { removeFromCart } from '@/services/cartService';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
const emptyCart = require('@/assets/ClickBuy/empty-cart.png');

const Cart = () => {
    const { user, setUser } = useUser();
    const [userCart, setUserCart] = useState<Product[]>();
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if(!user) return

            const response = await api.get(`/user/${user?._id}/cart`);
            setUserCart(response.data);
        }

        fetchData();
    }, [user])
    const toggleProductSelection = (productId: string) => {
        setSelectedProducts((prev) =>
        prev.includes(productId)
            ? prev.filter((id) => id !== productId)
            : [...prev, productId]
        );
    };
    const confirmDeleteProduct = (product: Product) => {
      Alert.alert(
        'Remover Produto',
        `Tem certeza que deseja remover ${product.name}?\n\nEsta ação é irreversível!`,
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Remover',
            style: 'destructive',
            onPress: () => handleRemove(product),
          },
        ]
      );
    };
    const handleRemove = async (product: Product) => {
        try {
            if(product) {
                await removeFromCart(user, setUser, product);
                Toast.show({
                                  type: 'success',
                                  text1: `${product.name} Removido do carrinho!`,
                                });
            }
        } catch {
            Toast.show({
                                  type: 'error',
                                  text1: `Erro ao adicionar ao carrinho!`,
                                });
        }
    }
     const handleSelectAll = () => {
        if(!userCart) return
        const allIds = userCart.map((prod) => (prod._id));
        setSelectedProducts(allIds)
    }

    const handleRemoveSelected = () => {
        setSelectedProducts([])
    };
    const handleCheckout = async () => {
        if (!userCart || selectedProducts.length === 0) {
            alert("Selecione ao menos um produto para continuar.");
            return;
        }

        const productsToBuy = userCart.filter(product =>
            selectedProducts.includes(product._id)
        );

        if (productsToBuy.length === 0) {
            alert("Nenhum produto válido selecionado.");
            return;
        }
        await AsyncStorage.setItem('checkoutProducts', JSON.stringify(productsToBuy));
        router.push('/checkout');
    };
  return (
    <View style={styles.Container}>
      {Array.isArray(userCart) && userCart.length > 0 ? (
        <ScrollView style={styles.Scroll} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.Carrinho}>
                <Text style={styles.Text}>Meu Carrinho</Text>
                {userCart.map((product, idx) => (
                    <View key={idx} style={styles.Product}>
                        <TouchableOpacity style={styles.Anunciante} onPress={() => router.push(`/userPage?id=${product?.announcer?._id}`)}>
                            <Text style={styles.Nome}>{product.announcer.personalData.name}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleProductSelection(product._id)} style={styles.ProductCart}>   
                            <Checkbox
                            style={styles.CheckBox}
                            value={selectedProducts.includes(product._id)}
                            onValueChange={() => toggleProductSelection(product._id)}
                            color={selectedProducts.includes(product._id) ? '#DDA04B' : undefined}
                            />
                            <Image
                                source={{ uri: product.mainImage}}
                                style={styles.ProductImage}
                                resizeMode="center"
                            />
                            <TouchableOpacity onPress={() => router.push(`/productPage?id=${product._id}`)} style={styles.ProductInfo}>
                                <Text style={styles.ProductName} numberOfLines={2}>{product.name}</Text>
                                <Text style={styles.ProductPrice}>{product.price}</Text>
                            </TouchableOpacity>
                            <View style={styles.BotaoArea}>
                                <TouchableOpacity onPress={() => confirmDeleteProduct(product)} style={styles.Botao}>
                                    <Text style={styles.Remover}>Remover</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
                <View style={styles.BotoesCart}>
                    <TouchableOpacity onPress={handleSelectAll} style={styles.Botao2}>
                        <Text style={styles.Text2}>Selecionar Todos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleRemoveSelected} style={styles.Botao3}>
                        <Text style={styles.Text2}>Remover Seleção</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCheckout} style={styles.Botao4}>
                        <Text style={styles.Text3}>Comprar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
      ):(
        <View style={styles.CarrinhoVazio}>
            <Image
                                source={emptyCart}
                                style={styles.Cart}
                                resizeMode="center"
                            />
            <Text style={styles.Text}>Seu carrinho está vazio</Text>
            <Text style={styles.Text5}>Que tal explorar os produtos disponíveis e encontrar algo interessante? 😄</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)')} style={styles.Botao4}>
                        <Text style={styles.Text6}>Ver Produtos</Text>
                    </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default Cart