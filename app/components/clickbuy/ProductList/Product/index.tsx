import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '@/components/clickbuy/ProductList/Product/styles'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Product as ProductModel } from '@/types/Product';
import ip from '@/ip'
import { routeToScreen } from 'expo-router/build/useScreens';
import { router } from 'expo-router';
import { removeFromFavourites } from '@/services/favoriteService';
import { useUser } from '@/contexts/UserContext';
import { Ionicons } from '@expo/vector-icons';


interface Props {
    product: ProductModel
}

const Product: React.FC<Props> = ({ product }) => {
  const { user, setUser } = useUser();
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        }).format(price)
    }
  return (
    <TouchableOpacity
      style={styles.Container}
      onPress={() => router.push(`/productPage?id=${product._id}`)}
      disabled={product.sold}
    >
      <View style={styles.ImageContainer}>
        <Image
          source={{ uri: product.mainImage }}
          style={styles.Image}
          resizeMode="center"
        />

      </View>

      <View style={styles.ProductInfo}>
        <Text style={styles.price}>{product.price}</Text>
        <Text style={styles.Name} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.location}>
          <IconSymbol size={15} name="location" color="black" />
          <Text>{product.location}</Text>
        </View>
      </View>
        {product.sold && (
          <View style={styles.Overlay}>
            <Ionicons name='lock-closed' size={40} color={'white'} />
            <Text style={styles.TextSold}>Vendido</Text>
            <TouchableOpacity
              style={styles.RemoveButton}
              onPress={() => removeFromFavourites(user, setUser, product)}
            >
              <Text style={styles.RemoveButtonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
    </TouchableOpacity>
  )
}

export default Product