import { useUser } from "contexts/UserContext";

import Header from "components/Header";
import Footer from "components/Footer";

import style from './Carrinho.module.scss';
import { useEffect, useState } from "react";

import { Product } from "@modules/Product";
import api from "services/api";
import { Link } from "react-router-dom";

import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { ReactComponent as Card } from 'assets/card.svg';

import RemoveButtom from "./components/RemoveButtom";

import { removeFromCart } from "services/cartService";
import { toast } from "react-toastify";

import emptyCart from 'assets/empty-cart.svg';

const Cart = () => {

    const { user, setUser } = useUser();
    const [userCart, setUserCart] = useState<Product[]>();
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if(!user) return

            const response = await api.get(`/user/${user?._id}/cart`);
            setUserCart(response.data);
        }

        fetchData();
    }, [user])

    const toggleProductSelection = (productId: string) => {
        setSelectedProducts((prev) =>
        prev.includes(productId)
            ? prev.filter((id) => id !== productId)
            : [...prev, productId]
        );
    };

    const handleRemoveSelected = () => {
        setSelectedProducts([])
    };

    const handleRemove = async (product: Product) => {
        try {
            if(product) {
                await removeFromCart(user, setUser, product);
                toast.success(`${product.name} Removido do carrinho!`)
            }
        } catch {
            toast.error("Erro ao adicionar ao carrinho!");
        }
    }

    const handleChekout = () => {
        
    }

    return (
        <div className={style.Container}>
            <Header user={user} />
            { Array.isArray(userCart) && userCart.length > 0 ? (
                <div className={style.PageContent}>
                    <h1>Meu Carrinho</h1>
                    {userCart.map((product, idx) => ( 
                        <div className={style.ProductContainer} key={idx}>
                            <Link to={`/users/${product.announcer._id}`} className={style.Announcer} > <h3>{product.announcer.personalData.name}</h3> </Link>
                            <div className={style.Product} >
                                <div>
                                    <input
                                    className={style.CheckBox}
                                    type="checkbox"
                                    checked={selectedProducts.includes(product._id)}
                                    onChange={() => toggleProductSelection(product._id)}
                                    />
                                </div>
                                <img className={style.Image} src={product.mainImage} alt="" />
                                <div className={style.ProductDescription}>
                                    <Link to={`/${product.category}/${product._id}`} className={style.ProductName}><h2>{product.name}</h2></Link>
                                    <h3>{product.price}</h3>
                                </div>
                                <RemoveButtom product={product.name} onConfirm={() => handleRemove(product)} optionClassName={style.Remove} iconClassName={style.Icon} />
                            </div>
                        </div>
                    ))}
                    <div className={style.ButtonsArea}>
                        <button className={`${style.Button} ${style.RemoveSelection}`} onClick={handleRemoveSelected} ><CircleBackslashIcon className={style.Icon} />Remover seleção</button>
                        <button className={`${style.Button} ${style.Checkout}`} onClick={handleChekout}><Card className={`${style.Icon} ${style.Card}`} />Comprar</button>
                    </div>
                </div>
            ) : (
                <div className={style.EmptyCart}>
                    <img 
                        src={emptyCart}
                        alt="Carrinho vazio" 
                        className={style.EmptyImage}
                    />
                    <h2>Seu carrinho está vazio</h2>
                    <p>Que tal explorar os produtos disponíveis e encontrar algo interessante? 😄</p>
                    <Link to="/" className={style.GoShoppingButton}>Ver produtos</Link>
                </div>
            )}
            <Footer />
        </div>
    )
}

export default Cart