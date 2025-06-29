import { useParams, Link } from "react-router-dom";

import Header from "components/Header";
import Footer from "components/Footer";
import ImageGallery from "components/ImageGallery";
import ShareDropdown from './components/ShareDropdown';

import { useUser } from "contexts/UserContext";
import { useEffect, useState } from "react";

import { addToCart } from "services/cartService";

import { Product } from "@modules/Product";
import { User } from "@modules/User";

import style from './Product.module.scss';

import { ReactComponent as Pin } from '../../../assets/Product/pin.svg';

import { HeartIcon, HeartFilledIcon, Share1Icon, TokensIcon } from "@radix-ui/react-icons";
import { ReactComponent as Report } from 'assets/Product/flag.svg';

import { addToFavourites, removeFromFavourites } from "services/favouriteService";
import { toast } from "react-toastify";

import AddToCartButton from "./components/AddToCartButton";

import { formatCEP } from "utils/formatters";
import api from "services/api";

const ProductPage = () => {
    const { user, setUser } = useUser();
    const { category, id } = useParams<{ category: string, id: string }>();
    const [product, setProduct] = useState<Product>();
    const [isFavourited, setIsFavourited] = useState<boolean>();
    const [createdDate, setCreatedDate] = useState<Date>();
    const [soldDate, setSoldDate] = useState<Date>();

    const genericPhoto = "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
    
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
        }

        fetchData();
    },[id])

    useEffect(() => {
        if (!user || !user?.favourites || !product) return;

        const isAlreadyFavourited = user.favourites.some(
            (fav) => fav._id === product._id
        );

        setIsFavourited(isAlreadyFavourited);
    });
 
    const toggleIsFavourited = async () => {
        console.log(isFavourited)
        if(!product || !user) return

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
                toast.warn('Você precisa estar logado!')
            }else {
                toast.error('Erro ao adicionar aos favoritos!')
            }
        }
    }

    const formatZero = (number: number) => {
        const res = number > 9 ? number : '0' + number
        return res
    }

    return (
        <div className={style.Container}>
            <Header user={user} />
            {
                product && (
                    <>
                        <div className={style.TopSection}>
                            
                            <ImageGallery images={product.images} mainImage={product.mainImage} />

                            <div className={style.ProductDetails}>
                                <div className={style.DetailsTop}>
                                    <span className={style.TopInfos}>
                                        <h1 className={style.Title} title={product.name}>{product.name}</h1> 
                                        { 
                                            createdDate && (
                                                <p className={style.CreatedAt}>{formatZero(createdDate?.getDate())}/{formatZero(createdDate?.getMonth())} ás {formatZero(createdDate?.getHours())}:{formatZero(createdDate?.getMinutes())}</p>
                                            )
                                        }
                                    </span>
                                    <h2 className={style.Price}>{product?.price}</h2>
                                    {
                                        product.sold ? (
                                            <div className={style.SoldInfo}>Produto Vendido</div>
                                        ) : (
                                            <>
                                                {
                                                    !user ? (
                                                        <div className={style.SoldInfo}>Entre para adicionar ao carrinho!</div>
                                                    ) : (
                                                        <>
                                                            {
                                                                product.announcer._id !== user?._id && (
                                                                    <AddToCartButton product={product} />
                                                                )    
                                                            }
                                                        </>
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                </div>
                                {
                                    product.sold ? (
                                        <div className={style.DetailsBottom}>
                                            <h3>Informações do Comprador</h3>
                                            <div className={style.BuyerTop}>
                                                <Link to={`/users/${product.buyer?._id}`} className={style.AnnonucerMain}>
                                                        <img 
                                                            className={style.ProfileImage} 
                                                            src={product.buyer?.profilePic ? `${product.buyer.profilePic}` : genericPhoto} 
                                                            alt=""
                                                        />
                                                        <h4>{product.buyer?.personalData.name}</h4>
                                                        
                                                </Link>
                                                { soldDate && (
                                                    <p className={style.SoldAt}>{formatZero(soldDate?.getDate())}/{formatZero(soldDate?.getMonth())} ás {formatZero(soldDate?.getHours())}:{formatZero(soldDate?.getMinutes())}</p>
                                                )}
                                            </div>
                                            <div className={style.Location}><Pin className={style.Pin} />{`${product.buyer?.personalData.address.city}, ${product.buyer?.personalData.address.state}`}</div>
                                        </div>
                                    ) : (
                                        <div className={style.DetailsBottom}>
                                            <h3>Informações do anunciante</h3>
                                            <Link to={`/users/${product.announcer?._id}`} className={style.AnnonucerMain}>
                                                <img 
                                                    className={style.ProfileImage} 
                                                    src={product.announcer?.profilePic ? `${product.announcer.profilePic}` : genericPhoto} 
                                                    alt=""
                                                />
                                                <h4>{product.announcer?.personalData.name}</h4>
                                            </Link>
                                            <div className={style.Location}><Pin className={style.Pin} />{`${product.announcer?.personalData.address.city}, ${product.announcer?.personalData.address.state} - ${formatCEP(product.announcer?.personalData.address.zip)}`}</div>
                                        </div>
                                    )
                                }
                                {
                                    !product.sold && (
                                        <div className={style.OptionsArea}>
                                            <div className={style.Option}>{isFavourited ? <HeartFilledIcon onClick={toggleIsFavourited} className={`${style.Icon} ${style.FavouritedIcon}`} /> : <HeartIcon onClick={toggleIsFavourited} className={style.Icon} /> }</div>
                                            <div className={style.Option}> <ShareDropdown product={product.name} /></div>
                                            <div className={style.Option}><Report className={style.Icon} /></div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className={style.BottomSection}>
                            <div className={style.Description}>
                                <h2>Descrição do produto</h2>
                                <p>{product?.description}</p>
                            </div>
                            <div className={style.DetailsSection}>
                                <h2>Detalhes</h2>
                                <div className={style.DetailsWrapper}>
                                    <div className={`${style.Detail} ${style.Category}`}>
                                        <TokensIcon className={style.Icon} />
                                        <div>
                                            <h3 className={style.Title} >Categoria</h3>
                                            <h4 className={style.Desc}>{product.category}</h4>
                                        </div>
                                    </div>
                                    <div className={`${style.Detail} ${style.Location}`}>
                                        <TokensIcon className={style.Icon} />
                                        <div>
                                            <h3 className={style.Title} >Localização</h3>
                                            <h4 className={style.Desc}>{product.location}</h4>
                                        </div>
                                    </div>
                                    <div className={`${style.Detail} ${style.Quality}`}>
                                        <TokensIcon className={style.Icon} />
                                        <div>
                                            <h3 className={style.Title} >Qualidade</h3>
                                            <h4 className={style.Desc}>{product.condition.quality}</h4>
                                        </div>
                                    </div>
                                    <div className={`${style.Detail} ${style.Esed}`}>
                                        <TokensIcon className={style.Icon} />
                                        <div>
                                            <h3 className={style.Title} >Usado?</h3>
                                            <h4 className={style.Desc}>{product.condition.used ? 'Sim' : 'Não'}</h4>   
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
            <Footer />
        </div>
    )
}

export default ProductPage;