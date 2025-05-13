import { useParams, Link } from "react-router-dom";

import Header from "components/Header";
import Footer from "components/Footer";
import ImageGallery from "components/ImageGallery";

import { useUser } from "contexts/UserContext";
import { useEffect, useState } from "react";

import { Product } from "@modules/Product";
import { User } from "@modules/User";

import style from './Product.module.scss';

import { ReactComponent as Pin } from '../../../assets/Product/pin.svg';

import { HeartIcon, HeartFilledIcon, Share1Icon, TokensIcon } from "@radix-ui/react-icons";
import { ReactComponent as Report } from 'assets/Product/flag.svg';

import { addToFavourites, removeFromFavourites } from "services/favouriteService";
import { toast } from "react-toastify";

const ProductPage = () => {
    const { user, setUser } = useUser();
    const { category, id } = useParams<{ category: string, id: string }>();
    const [product, setProduct] = useState<Product>();
    const [announcer, setAnnouncer] = useState<User>();
    const [isFavourited, setIsFavourited] = useState<boolean>();
    const [createdDate, setCreatedDate] = useState<Date>();
    
    const genericPhoto = "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
    
    useEffect(() => {
        const fetchData = async () => {
            const productResponse = await fetch(`http://localhost:5000/products/${id}`);
            const productResult = await productResponse.json();
            
            if(user && user.favourites){
                setIsFavourited(user?.favourites?.includes(product?._id))
            }

            setProduct(productResult);
            setCreatedDate(new Date(productResult.createdAt))
            
            const userResponse = await fetch(`http://localhost:5000/user/${productResult.announcer}`)
            const userResult = await userResponse.json();
            
            setAnnouncer(userResult)
        }

        fetchData();
    },[id])

    useEffect(() => {
        console.log(user?.favourites, product?._id)
        if (!user || !user?.favourites || !product) return;

        const isAlreadyFavourited = user.favourites.some(
            (fav) => fav === product._id
        );

        setIsFavourited(isAlreadyFavourited);
    });


    
    const toggleIsFavourited = async () => {
        console.log(isFavourited)
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
            toast.error('Erro ao adicionar aos favoritos!')
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
                            
                            <ImageGallery images={product?.images} mainImage={product?.mainImage} />

                            <div className={style.ProductDetails}>
                                <div className={style.DetailsTop}>
                                    <span className={style.TopInfos}>
                                        <h1 className={style.Title}>{product?.name}</h1> 
                                        { 
                                            createdDate && (
                                                <p className={style.CreatedAt}>{formatZero(createdDate?.getDate())}/{formatZero(createdDate?.getMonth())} ás {formatZero(createdDate?.getHours())}:{formatZero(createdDate?.getMinutes())}</p>
                                            )
                                        }
                                    </span>
                                    <h2 className={style.Price}>{product?.price}</h2>
                                    <button className={style.Buy}>COMPRAR</button>
                                </div>
                                {
                                    announcer && (
                                        <div className={style.DetailsBottom}>
                                            <h3>Informações do anunciante</h3>
                                            <Link to={`/users/${announcer?._id}`} className={style.AnnonucerMain}>
                                                    <img 
                                                        className={style.ProfileImage} 
                                                        src={announcer?.profilePic ? announcer.profilePic : genericPhoto} 
                                                        alt=""
                                                    />
                                                    <h4>{announcer?.personalData.name}</h4>
                                            </Link>
                                            <div className={style.Location}><Pin className={style.Pin} />{`${announcer?.personalData.address.city}, ${announcer?.personalData.address.state} - ${announcer?.personalData.address.zip}`}</div>
                                        </div>
                                    )
                                }
                                <div className={style.OptionsArea}>
                                    <div className={style.Option}>{isFavourited ? <HeartFilledIcon onClick={toggleIsFavourited} className={`${style.Icon} ${style.FavouritedIcon}`} /> : <HeartIcon onClick={toggleIsFavourited} className={style.Icon} /> }</div>
                                    <div className={style.Option}><Share1Icon className={style.Icon} /></div>
                                    <div className={style.Option}><Report className={style.Icon} /></div>
                                </div>
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