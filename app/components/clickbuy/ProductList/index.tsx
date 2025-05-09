import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Product from '@/components/clickbuy/ProductList/Product/index'
import styles from '@/components/clickbuy/ProductList/styles'
import { Product as ProductModel } from '@/types/Product';
import ip from '@/ip'


interface Props {
    title: string
}


const ProductsList: React.FC<Props> = ({ title }) => {
    const [products, setProducts] = useState<ProductModel[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://${ip}:5000/products`);
                const productData = await response.json();

                setProducts(productData.products.slice(0, 10));
            } catch (error) {
                console.log('Erro ao buscar produtos', error);
            }
        };

        fetchData();
    }, []);

    const [dupla, setStep] = useState(1)
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        }).format(price)
    }
  return (
    <View style={styles.Container}>
        <View style={styles.TitleFrame}>
            <Text style={styles.Title}>{title}</Text>
        </View>
        {products.map((_, index) => {
            if (index % 2 !== 0) return null; 

            const pairIndex = index / 2;
            const isEvenPair = pairIndex % 2 === 0;

            return (
                <View
                    key={index}
                    style={[
                        styles.Duplas,
                        { backgroundColor: isEvenPair ? 'rgb(242, 242, 242)' : '#ffffff' }
                    ]}
                >
                    <Product product={products[index]} />
                    {products[index + 1] && <Product product={products[index + 1]} />}
                </View>
            );
        })}


        
    </View>
  )
}

export default ProductsList