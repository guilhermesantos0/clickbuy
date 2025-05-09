import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '@/components/clickbuy/ProductList/Product/styles'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Product as ProductModel } from '@/types/Product';
import ip from '@/ip'


interface Props {
    product: ProductModel
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
          source={{ uri: `http://${ip}:5000${product.mainImage}`}}
          style={styles.Image}
          resizeMode="center"
        />
      </View>
      <View style={styles.ProductInfo}>
        <Text style={styles.price}>{product.price}</Text>
        <Text style={styles.Name} numberOfLines={2}>{product.name}</Text>
        <View style={styles.location}>
          <IconSymbol size={15} name='location' color='black' />
          <Text>{product.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Product