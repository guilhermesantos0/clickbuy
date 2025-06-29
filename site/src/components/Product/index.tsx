import { ReactComponent as Pin } from '../../assets/Product/pin.svg';

import style from './Product.module.scss';
import { Product as ProductModel } from '@modules/Product';

import { Link } from 'react-router-dom';

import { HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { LockClosedIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from 'react';

import { addToFavourites, removeFromFavourites } from 'services/favouriteService';

import { useUser } from 'contexts/UserContext';
import { toast } from 'react-toastify';


interface Props {
    product: ProductModel,
    favouriteOption?: boolean,
    favourited?: boolean
}

const Product: React.FC<Props> = ({ product, favouriteOption, favourited }) => {
    const { user, setUser } = useUser();
    const [isFavourited, setIsFavourited] = useState(favourited);

    const toggleIsFavourited = async () => {

        try {
            if (isFavourited) {
                await removeFromFavourites(user, setUser, product);
                setIsFavourited(false)
            }else {
                await addToFavourites(user, setUser, product);
                setIsFavourited(true)
            }
        } catch (error) {
            if(error === 1) {
                toast.warn('Você precisa estar logado!')
            }else {
                toast.error('Erro ao adicionar aos favoritos!')
            }
        }
    }

    return (
        
        <div className={style.Container}>
            { product.sold ? (
                <div className={style.SoldProductArea}>
                    <div className={style.ImageContainer}>
                        <img className={style.Image} src={product.mainImage} alt={product.name} />
                    </div>

                    <div className={style.SoldOverlay}>
                        <LockClosedIcon className={style.LockIcon} width={50} height={50} />
                        <span>Vendido</span>
                        <div className={style.HoverOptions}>
                            {/* <Link to={`/${product.category}/${product._id}`} className={`${style.Button} ${style.View}`} >Visualizar</Link> */}
                            <button className={`${style.Button} ${style.Remove}`} onClick={toggleIsFavourited}>Remover</button>
                        </div>
                    </div>

                    <div className={style.ProductInfo}>
                        <div className={style.Price}>{product.price}</div>
                        <div className={style.Name}>{product.name}</div>
                        <div className={style.Location}><Pin className={style.Pin} />{product.location}</div>
                    </div>
                </div>
            ) : (
                <>
                    {favouriteOption && (
                    <div onClick={toggleIsFavourited} className={style.FavouriteOption}>
                    { 
                        !isFavourited ? (
                            <HeartIcon className={style.FavouriteIcon} />
                        ) : (
                            <HeartFilledIcon className={style.FavouritedIcon} />
                        )
                    }
                    </div>
                )}

                <Link to={`/${product.category}/${product._id}`} className={style.LinkArea}>
                    <div className={style.ImageContainer}>
                        <img className={style.Image} src={`${product.mainImage}`} alt="" />
                    </div>
                    <div className={style.ProductInfo}>
                        <div className={style.Price}>{product.price}</div>
                        <div className={style.Name}>{product.name}</div>
                        <div className={style.Location}><Pin className={style.Pin} />{product.location}</div>
                    </div>
                </Link>
                </>
            )}
            
        </div>

    )
}

export default Product;