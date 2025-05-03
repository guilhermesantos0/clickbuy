import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '@/components/clickbuy/ProductList/Product/styles'

interface ProductCard {
    name: string,
    image: string,
    price: number,
    location: string
}

interface Props {
    product: ProductCard
}

const Product: React.FC<Props> = ({ product }) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        }).format(price)
    }
  return (
    <TouchableOpacity style={styles.Container} onPress={() => console.log(product.name)}>
      <View style={styles.ImageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.Image}
          resizeMode="center"
        />
      </View>
      <View style={styles.ProductInfo}>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <Text style={styles.Name} numberOfLines={2}>{product.name}</Text>
        <View style={styles.location}>
          <Text>{product.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Product