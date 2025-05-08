import { ReactComponent as Pin } from '../../assets/Product/pin.svg';

import style from './Product.module.scss';
import { Product as ProductModel } from '@modules/Product';

import { Link } from 'react-router-dom';

import { HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

interface Props {
    product: ProductModel,
    favouriteOption?: boolean,
    favourited?: boolean
}

const Product: React.FC<Props> = ({ product, favouriteOption, favourited }) => {
    const [isFavourited, setIsFavourited] = useState(favourited);

    const toggleIsFavourited = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFavourited(prev => !prev)
    }

    return (
        <div className={style.Container}>
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
                    <img className={style.Image} src={`http://localhost:5000${product.mainImage}`} alt="" />
                </div>
                <div className={style.ProductInfo}>
                    <div className={style.Price}>{product.price}</div>
                    <div className={style.Name}>{product.name}</div>
                    <div className={style.Location}><Pin className={style.Pin} />{product.location}</div>
                </div>
            </Link>
        </div>

    )
}

export default Product;