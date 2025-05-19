import { useUser } from "contexts/UserContext";

import Header from "components/Header";
import Footer from "components/Footer";

import style from './Carrinho.module.scss';
import { useEffect } from "react";

const Cart = () => {

    const { user } = useUser();

    useEffect(() => {

        const fetchData = () => {
            
        }
    })

    return (
        <div className={style.Container}>
            <Header user={user} />
            { user?.cart && (
                <div>
                    {user.cart.map((i) => ( <span>{i}</span> ))}
                </div>
            )}
            <Footer />
        </div>
    )
}

export default Cart