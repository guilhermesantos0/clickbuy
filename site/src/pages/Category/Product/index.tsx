import { useParams } from "react-router-dom";

import Header from "components/Header";
import Footer from "components/Footer";
import ImageGallery from "components/ImageGallery";

import { useUser } from "contexts/UserContext";
import { useEffect, useState } from "react";

import { Product } from "@modules/Product";

import style from './Product.module.scss';

const ProductPage = () => {
    const { user } = useUser();
    const { category, id } = useParams<{ category: string, id: string }>();
    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/products/${id}`);
            const result = await response.json();

            setProduct(result);
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
                                <h1>{product?.name}</h1>
                                <h2>{product?.price}</h2>
                                <button>COMPRAR</button>
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