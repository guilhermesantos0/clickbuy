import { ReactComponent as Pin } from '../../../assets/Product/pin.svg';

import style from './Product.module.scss';

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
        
    }

    return (
        <div className={style.Container}>
            <div className={style.ImageContainer}>
                <img className={style.Image} src={product.image} alt="" />
            </div>
            <div className={style.ProductInfo}>
                <div className={style.Price}>R$ {product.price}</div>
                <div className={style.Name}>{product.name}</div>
                <div className={style.Location}><Pin className={style.Pin} />{product.location}</div>
            </div>
        </div>
    )
}

export default Product;