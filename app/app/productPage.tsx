import { View, Text, TouchableOpacity, Image, ScrollView, Modal, Share } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
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
import modal from './styles/productPage/modal';
import api from '@/services/api';
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
    const [soldDate, setSoldDate] = useState<Date>();
    const [modalVisible, setModalVisible] = useState(false);

    
    
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
            
            const productResponse = await api.get(`/products/${id}`);
            const productResult = await productResponse.data;

            if(user && user.favourites && product){
                setIsFavourited(user?.favourites?.includes(product))
            }

            setProduct(productResult);
            setCreatedDate(new Date(productResult.createdAt))

            if(productResult.sold) {
                setSoldDate(new Date(productResult.updatedAt))
            }
            
            const userResponse = await fetch(`http://${ip}:5000/user/${productResult.announcer}`)
            const userResult = await userResponse.json();

            setAnnouncer(userResult)
        }

        fetchData();
    },[id])
    useEffect(() => {
        if (!user || !Array.isArray(user.favourites) || !product || !product._id) return;

        const isAlreadyFavourited = user.favourites.some((fav) =>
            String(fav._id) === String(product._id)
        );

        setIsFavourited(isAlreadyFavourited);
    }, [user, product]);


 
    const toggleIsFavourited = async () => {
        if(!product || !user){
            Toast.show({
                              type: 'error',
                              text1: 'Faça login para adicionar aos favoritos!',
                            });
            return
        }

        try {
            if (isFavourited) {
                await removeFromFavourites(user, setUser, product);
                setIsFavourited(false);
            }else {
                await addToFavourites(user, setUser, product);
                setIsFavourited(true);
            }
        } catch (error) {
            if(error === 1) {
                Toast.show({
                              type: 'warn',
                              text1: 'Você precisa estar logado!',
                            });
            }else {
                Toast.show({
                              type: 'error',
                              text1: 'Erro ao adicionar aos favoritos!',
                            });
            }
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
                setModalVisible(true);
            }
        } catch {
            Toast.show({
                              type: 'error',
                              text1: "Erro ao adicionar ao carrinho!",
                            });
        }
    }
    const handleShare = async () => {
  try {
    const result = await Share.share({
      message: `http://clickbuy-pii.s3-website-sa-east-1.amazonaws.com/${product?.category}/${product?._id}`,
      url: `http://clickbuy-pii.s3-website-sa-east-1.amazonaws.com/${product?.category}/${product?._id}`,
      title: product?.name
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log('Compartilhado via:', result.activityType);
      } else {
        console.log('Compartilhado!');
      }
    } else if (result.action === Share.dismissedAction) {
      console.log('Compartilhamento cancelado');
    }
  } catch (error) {
    console.error('Erro ao compartilhar:', error);
    Toast.show({
      type: 'error',
      text1: 'Erro ao compartilhar o produto!',
    });
  }
};

  return (
    <View style={styles.Container}>
        <Modal
            transparent={true}
            animationType="fade"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={modal.Container}>
                <View style={modal.Modal}>
                    <Text style={modal.Title}>
                        Produto adicionado ao carrinho!
                    </Text>
                    <Text style={modal.Text}>
                        O que você deseja fazer agora?
                    </Text>
                    <View style={modal.ButtonArea}>
                        <TouchableOpacity
                            style={modal.CartButton}
                            onPress={() => {
                                setModalVisible(false);
                                router.push('/cart')
                            }}
                        >
                            <Text style={modal.Text2}>Ir para o carrinho</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={modal.ContinueButton}
                            onPress={() => {
                                setModalVisible(false);
                                router.push('/(tabs)')
                            }}
                        >
                            <Text>Continuar comprando</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>

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
                {product?.sold ? (
                    <View style={styles.ButtomArea}>
                        <View style={styles.Sold}>
                            <Text style={styles.ButtonText}>Produto Vendido</Text>
                        </View>
                    </View>
                ) : user ? (
                    user._id !== product?.announcer._id ? (
                        <View style={styles.ButtomArea}>
                            <TouchableOpacity onPress={handleAddToCart} style={styles.Buy}>
                                <Text style={styles.ButtonText}>Adicionar ao Carrinho</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null
                ) : (
                    <View style={styles.ButtomArea}>
                        <TouchableOpacity onPress={() => router.push(`/login`)} style={styles.Buy}>
                            <Text style={styles.ButtonText}>Faça Login para comprar</Text>
                        </TouchableOpacity>
                    </View>
                )}


                {product?.sold ? (
                    <View style={styles.InfoRow}>
                        <View style={styles.IconsArea}>
                        </View>
                        <View style={styles.Date}>
                        <Text>{`${createdDate ? `${formatZero(createdDate.getDate())}/${formatZero(createdDate.getMonth() + 1)} às ${formatZero(createdDate.getHours())}:${formatZero(createdDate.getMinutes())}` : 'Data não disponível'}`}</Text>
                        </View>
                    </View>
                ) : (
                    <View style={styles.InfoRow}>
                        <View style={styles.IconsArea}>
                                <TouchableOpacity style={styles.filterButton} onPress={toggleIsFavourited}>
                                    <Ionicons name="heart" size={24} color={isFavourited? "red" : "black"} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.filterButton} onPress={handleShare}>
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
                )}
            </View>
            {product?.sold ? (
                <View style={styles.Announcer}>
                    <Text style={styles.Buyer}>Comprado por:</Text>
                <TouchableOpacity onPress={() => router.push(`/userPage?id=${product?.announcer?._id}`)} style={styles.NameIcon}>
                    <Image
                        style={styles.AnnouncerIcon}
                        source={product?.buyer?.profilePic ? { uri: product?.buyer.profilePic } : genericPhoto }
                        />
                    <Text style={styles.AnnouncerName}>{product?.buyer?.personalData.name}</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', marginBottom:40}}>
                    <View style={styles.location}>
                        <IconSymbol size={15} name='location' color='black' />
                        <Text>{`${product?.buyer?.personalData.address.city}, ${product?.buyer?.personalData.address.state} - ${product?.buyer?.personalData.address.zip}`}</Text>
                    </View>
                    <View style={styles.Date}>
                            <Text>{`${soldDate ? `${formatZero(soldDate.getDate())}/${formatZero(soldDate.getMonth() + 1)} às ${formatZero(soldDate.getHours())}:${formatZero(soldDate.getMinutes())}` : 'Data não disponível'}`}</Text>
                    </View>
                </View>
                </View>
            ): (
                <View style={styles.Announcer}>
                    <Text style={styles.Buyer}>Informações do anunciante:</Text>
                <TouchableOpacity onPress={() => router.push(`/userPage?id=${product?.announcer?._id}`)} style={styles.NameIcon}>
                    <Image
                        style={styles.AnnouncerIcon}
                        source={product?.announcer.profilePic ? { uri: product?.announcer.profilePic } : genericPhoto }
                        />
                    <Text style={styles.AnnouncerName}>{product?.announcer.personalData.name}</Text>
                </TouchableOpacity>
                <View style={styles.location}>
                    <IconSymbol size={15} name='location' color='black' />
                    <Text>{`${product?.announcer?.personalData.address.city}, ${product?.announcer?.personalData.address.state} - ${product?.announcer?.personalData.address.zip}`}</Text>
                </View>
            </View>
            )}
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