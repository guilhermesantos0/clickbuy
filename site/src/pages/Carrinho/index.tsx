import { useUser } from "contexts/UserContext";

import Header from "components/Header";
import Footer from "components/Footer";

import style from './Carrinho.module.scss';
import { useEffect, useState } from "react";

import { Product } from "@modules/Product";
import api from "services/api";

const Cart = () => {

    const { user } = useUser();
    const [userCart, setUserCart] = useState<Product[]>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(`/user/${user?._id}/cart`);
            console.log(response.data)
            setUserCart(response.data);
        }

        fetchData();
    }, [user])

    return (
        <div className={style.Container}>
            <Header user={user} />
            { Array.isArray(userCart) && userCart.length > 0 ? (
                <div className={style.PageContent}>
                    {userCart.map((product) => ( 
                        <>
                            <div>{product.name}</div>
                            <div>{product.announcer.email}</div>
                        </>
                    ))}
                </div>
            ) : (
                <span>AAAAAAAAAAAA</span>
            )}
            <Footer />
        </div>
    )
}

export default Cart