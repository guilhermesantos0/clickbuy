import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { useUser } from '@/contexts/UserContext';
import { Product } from '@/types/Product';
import { User } from '@/types/User';
import ip from '@/ip';
import styles from './styles/productPage/styles';
import fourthStep from './styles/Cadastro/fourthStep';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { addToFavourites, removeFromFavourites } from '@/services/favoriteService';

const productPage = () => {
  const { id } = useLocalSearchParams();
  const { user } = useUser();
    const [product, setProduct] = useState<Product>();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [announcer, setAnnouncer] = useState<User>();
    const [isFavourited, setIsFavourited] = useState<boolean>(false);
    const [createdDate, setCreatedDate] = useState<Date>();
    const nextSlide = () => {
        if (!product?.images?.length) return;
        setCurrentSlide((prev) => (prev + 1) % product.images.length);
    };


  const prevSlide = () => {
    if (!product?.images?.length) return;
    setCurrentSlide((prev) => (prev - 1 + product.images.length) % product.images.length);
  };
  useEffect(() => {
        const fetchData = async () => {
            const productResponse = await fetch(`http://${ip}:5000/products/${id}`);
            const productResult = await productResponse.json();
            setProduct(productResult);

            setCreatedDate(new Date(productResult.createdAt))

            const userResponse = await fetch(`http://${ip}:5000/user/${productResult.announcer}`)
            const userResult = await userResponse.json();

            setAnnouncer(userResult)
        }

        fetchData();
    },[id])
    const toggleIsFavourited = async () => {
        try {
            if (isFavourited) {
                await removeFromFavourites(user?._id, product?._id);
            }else {
                await addToFavourites(user?._id, product?._id);
            }
            
            setIsFavourited(prev => !prev)
        } catch {
            Toast.show({
                          type: 'error',
                          text1: 'Erro ao adicionar aos favoritos!',
                        });
        }
    }
  return (
    <View style={styles.Container}>
        <ScrollView style={fourthStep.Scroll} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.SliderContainer}>
            <TouchableOpacity style={[styles.navButton, styles.Prev]} onPress={prevSlide}>
                <Text style={styles.arrow}>&#10094;</Text>
            </TouchableOpacity>
            <Image
                source={{ uri: `http://${ip}:5000${product?.images[currentSlide]}` }}
                style={styles.SliderImage}
                resizeMode="cover"
            />
            <TouchableOpacity style={[styles.navButton, styles.Next]} onPress={nextSlide}>
                <Text style={styles.arrow}>&#10095;</Text>
            </TouchableOpacity>
        </View>
            <View style={styles.Row}>
                <ScrollView style={styles.ImageRow} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {product?.images.length != undefined && product.images.map((img, index) => (
                                <TouchableOpacity key={index} style={styles.ImageContainer} onPress={() => setCurrentSlide(index)}>
                                    {index === currentSlide ? (
                                        <Image
                                            source={{ uri: `http://${ip}:5000${product?.images[index]}` }}
                                            style={styles.MainImage}
                                            resizeMode="center"
                                        />
                                        ) : (
                                        <Image
                                            source={{ uri: `http://${ip}:5000${product?.images[index]}` }}
                                            style={styles.Image}
                                            resizeMode="cover"
                                        />
                                        )}        
                                </TouchableOpacity>
                            ))}
                </ScrollView>
            </View>
            <View style={styles.ProductInfo}>
                <Text style={styles.Text} numberOfLines={2}>{product?.name}</Text>
                <Text style={styles.Price} >{product?.price}</Text>
                <View style={styles.ButtomArea}>
                    <TouchableOpacity style={styles.Buy} onPress={() => console.log("comprei")}>
                        <Text style={styles.ButtonText}>Comprar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.InfoRow}>
                    <View style={styles.IconsArea}>
                            <TouchableOpacity style={styles.filterButton} onPress={() => setIsFavourited(prev => !prev)}>
                                <Ionicons name="heart" size={24} color={isFavourited? "red" : "black"} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.filterButton}>
                                <Ionicons name="share-social" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.filterButton}>
                                <Ionicons name="flag" size={24} color="black" />
                            </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    </View>
  )
}

export default productPage