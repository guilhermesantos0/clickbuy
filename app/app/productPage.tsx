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
import { addToFavourites, getUserFavouriteProducts, removeFromFavourites } from '@/services/favoriteService';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { addToCart } from '@/services/cartService';
const genericPhoto = require('@/assets/ClickBuy/iconeGenerico.png');

const productPage = () => {
    const { id } = useLocalSearchParams();
    const { user, setUser } = useUser();
    const [product, setProduct] = useState<Product>();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [favourites, setFavourites] = useState<Product[]>();
    const [announcer, setAnnouncer] = useState<User>();
    const [isFavourited, setIsFavourited] = useState<boolean>();
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
            
            if(user && user.favourites){
                setIsFavourited(user?.favourites?.includes(product?._id))
            }

            setProduct(productResult);
            setCreatedDate(new Date(productResult.createdAt))
            
            const userResponse = await fetch(`http://${ip}:5000/user/${productResult.announcer._id}`)
            const userResult = await userResponse.json();

            setAnnouncer(userResult)
        }

        fetchData();
    },[id])

    useEffect(() => {
        if (!user || !user?.favourites || !product) return;

        const isAlreadyFavourited = user.favourites.some(
            (fav) => fav === product._id
        );

        setIsFavourited(isAlreadyFavourited);
    });
 
    const toggleIsFavourited = async () => {
        if(!product || !user) return

        try {
            if (isFavourited) {
                const updatedFavourites = (user?.favourites || []).filter(
                    (fav) => fav !== product._id
                );
                
                setUser({ ...user!, favourites: updatedFavourites });
                await removeFromFavourites(user?._id, product?._id);
                setIsFavourited(false)
            }else {
                await addToFavourites(user?._id, product?._id);
                const favourites = [...(user?.favourites || []), product?._id];
                setUser({ ...user!, favourites});
                setIsFavourited(true)
            }
        } catch {
            Toast.show({
                              type: 'error',
                              text1: 'Erro ao adicionar aos favoritos!',
                            });
        }
    }

    const formatZero = (number: number) => {
        const res = number > 9 ? number : '0' + number
        return res
    }
    const handleAddToCart = async () => {
        try {
            if(product) {
                await addToCart(user, setUser, product);
                Toast.show({
                              type: 'success',
                              text1: `${product.name} Adicionado ao carrinho!`,
                            });
            }
        } catch {
            Toast.show({
                              type: 'error',
                              text1: "Erro ao adicionar ao carrinho!",
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
                source={{ uri: String(product?.images[currentSlide]) }}
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
                                            source={{ uri: String(product.images[index]) }}
                                            style={styles.MainImage}
                                            resizeMode="center"
                                        />
                                        ) : (
                                        <Image
                                            source={{ uri: String(product.images[index]) }}
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
                    <TouchableOpacity style={styles.Buy} onPress={handleAddToCart}>
                        <Text style={styles.ButtonText}>Adicionar ao Carrinho</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.InfoRow}>
                    <View style={styles.IconsArea}>
                            <TouchableOpacity style={styles.filterButton} onPress={toggleIsFavourited}>
                                <Ionicons name="heart" size={24} color={isFavourited? "red" : "black"} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.filterButton}>
                                <Ionicons name="share-social" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.filterButton}>
                                <Ionicons name="flag" size={24} color="black" />
                            </TouchableOpacity>
                    </View>
                    <View style={styles.Date}>
                       <Text>{`${createdDate ? `${formatZero(createdDate.getDate())}/${formatZero(createdDate.getMonth() + 1)} às ${formatZero(createdDate.getHours())}:${formatZero(createdDate.getMinutes())}` : 'Data não disponível'}`}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.Announcer}>
                <TouchableOpacity style={styles.NameIcon}>
                    <Image
                        style={styles.AnnouncerIcon}
                        source={announcer?.profilePic ? { uri: announcer.profilePic } : genericPhoto }
                        />
                    <Text style={styles.AnnouncerName}>{announcer?.personalData.name}</Text>
                </TouchableOpacity>
                <View style={styles.location}>
                    <IconSymbol size={15} name='location' color='black' />
                    <Text>{`${product?.announcer?.personalData.address.city}, ${product?.announcer?.personalData.address.state} - ${product?.announcer?.personalData.address.zip}`}</Text>
                </View>
            </View>
            <View style={styles.ProductDescription}>
                <Text style={styles.TextTitle}>Descrição do produto</Text>
                <Text style={styles.Description}>{product?.description}</Text>
                <Text style={styles.TextTitle}>Detalhes</Text>
                <View style={styles.Details}>
                    <Ionicons style={styles.Arrow} name='chevron-forward' size={20} color={'#DDA04B'} />
                    <View>
                        <Text style={styles.TitleDetails}>Categoria</Text>
                        <Text>{product?.category}</Text>
                    </View>
                </View>
                <View style={styles.Details}>
                    <Ionicons style={styles.Arrow} name='chevron-forward' size={20} color={'#DDA04B'} />
                    <View>
                        <Text style={styles.TitleDetails}>Localização</Text>
                        <Text>{product?.location}</Text>
                    </View>
                </View>
                <View style={styles.Details}>
                    <Ionicons style={styles.Arrow} name='chevron-forward' size={20} color={'#DDA04B'} />
                    <View>
                        <Text style={styles.TitleDetails}>Qualidade</Text>
                        <Text>{product?.condition.quality}</Text>
                    </View>
                </View>
                <View style={styles.Details}>
                    <Ionicons style={styles.Arrow} name='chevron-forward' size={20} color={'#DDA04B'} />
                    <View>
                        <Text style={styles.TitleDetails}>Usado?</Text>
                        <Text>{product?.condition.used ? 'Sim' : 'Não'}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    </View>
  )
}

export default productPage