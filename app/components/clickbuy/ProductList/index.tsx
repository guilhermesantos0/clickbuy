import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Product from '@/components/clickbuy/ProductList/Product/index'
import styles from '@/components/clickbuy/ProductList/styles'

interface Props {
    title: string
}

const list = [
    { 
        name: 'Geladeira', 
        image: 'https://img.olx.com.br/images/39/399570516451915.webp', 
        price: 500, 
        location: "São Paulo, SP" 
    },
    {
        name: 'Corsa Hatch 2012',
        image: 'https://img.olx.com.br/images/52/529505241549257.webp',
        price: 28900,
        location: "São Paulo, SP"
    },
    {
        name: 'Tênis Nike Air Max 90',
        image: 'https://img.olx.com.br/images/54/546580515113727.webp',
        price: 170,
        location: 'Poá, SP'
    },
    {
        name: 'Transbike EqMax + Rack de teto',
        image: 'https://img.olx.com.br/images/42/428551378518656.webp',
        price: 400,
        location: 'Marinique, SP'
    },
    {
        name: 'Celular iPhone 15 Pro Max 256gb',
        image: 'https://img.olx.com.br/images/45/450564507497954.webp',
        price: 6100,
        location: 'Belém, PA'
    },
    {
        name: 'Panela de Pressão Alusol 2,5 Litros - Nova!',
        image: 'https://img.olx.com.br/images/19/190457201189583.webp',
        price: 110,
        location: 'São Caetano do Sul, SP'
    },
]

const ProductsList: React.FC<Props> = ({ title }) => {
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
        {list.map((_, index) => {
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
                    <Product product={list[index]} />
                    {list[index + 1] && <Product product={list[index + 1]} />}
                </View>
            );
        })}


        
    </View>
  )
}

export default ProductsList