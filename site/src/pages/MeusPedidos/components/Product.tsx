import { Product as ProductType } from "@modules/Product";
import { Link } from "react-router-dom";

import style from './Product.module.scss';

import { ReactComponent as Pin } from 'assets/Product/pin.svg';

interface Props {
    product: ProductType
}

const Product:React.FC<Props> = ({ product }) => {
    return (
        <div className={style.Container}>
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
            <span className={style.Separator}></span>
            <Link className={style.AnnouncerData} to={`/user/${product.announcer._id}`}>
                <img className={style.ProfileImage} src={product.announcer.profilePic} alt="" />
                <span>{product.announcer.personalData.name}</span>
            </Link>
        </div>
    )
}

export default Product