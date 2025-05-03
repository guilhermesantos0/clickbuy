import { ReactComponent as Pin } from '../../../assets/Product/pin.svg';

import style from './Product.module.scss';
import { Product as ProductModel } from '@modules/Product';

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
        <div className={style.Container}>
            <div className={style.ImageContainer}>
                <img className={style.Image} src={product.mainImage} alt="" />
            </div>
            <div className={style.ProductInfo}>
                <div className={style.Price}>{formatPrice(product.price)}</div>
                <div className={style.Name}>{product.name}</div>
                <div className={style.Location}><Pin className={style.Pin} />{product.location}</div>
            </div>
        </div>
    )
}

export default Product;