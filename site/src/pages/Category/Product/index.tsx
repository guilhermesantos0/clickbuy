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

const ProductPage = () => {
    const { user } = useUser();
    const { category, id } = useParams<{ category: string, id: string }>();
    const [product, setProduct] = useState<Product>();
    const [announcer, setAnnouncer] = useState<User>();

    const genericPhoto = "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"

    useEffect(() => {
        const fetchData = async () => {
            const productResponse = await fetch(`http://localhost:5000/products/${id}`);
            const productResult = await productResponse.json();

            setProduct(productResult);

            const userResponse = await fetch(`http://localhost:5000/user/${productResult.announcer}`)
            const userResult = await userResponse.json();

            setAnnouncer(userResult)
        }

        fetchData();
    },[id])

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
                                    <h1 className={style.Title}>{product?.name}</h1>
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
                            </div>
                        </div>
                        <div>
                            <h2>Descrição do produto</h2>
                            <p>{product?.description}</p>
                        </div>
                    </>
                )
            }
            <Footer />
        </div>
    )
}

export default ProductPage;