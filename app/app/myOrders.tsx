import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '@/services/api';
import { Product } from '@/types/Product';
import { useUser } from '@/contexts/UserContext';
import styles from './styles/myOrders/styles';
import OrdersList from '@/components/clickbuy/OrdersList';

const myOrders = () => {
    const { user } = useUser();
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if(user) {
                try {
                    const res = await api.get(`/user/${user?._id}/purchased`);
                    console.log(res)
                    setProducts(res.data);
                } catch (err) {
                    console.error("Erro ao buscar produtos comprados", err);
                }
            }
        };

        fetchData();
    }, [user]);
  return (
    <ScrollView style={styles.Scroll} contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.Container}>
      <View style={styles.myOrdersContainer}>
        <Text style={styles.Title}>Meus Pedidos</Text>
        <Text style={styles.Text}>Seus Pedidos: {products.length}</Text>
        <OrdersList products={products}/>
      </View>
    </View>
    </ScrollView>
  )
}

export default myOrders