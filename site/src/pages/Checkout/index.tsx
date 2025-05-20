import { useLocation, Navigate } from "react-router-dom";
import { Product } from "@modules/Product";
import { useEffect, useState } from "react";

import style from './CheckoutPage.module.scss';

import Header from "components/Header";
import Footer from "components/Footer";

import { useUser } from "contexts/UserContext";

interface LocationState {
    products?: Product[];
}

const CheckoutPage = () => {
    const location = useLocation();
    const state = location.state as LocationState;
    const products = state?.products;

    const { user } = useUser();

    const [useAccountAddress, setUseAccountAddress] = useState(true);
    const [address, setAddress] = useState({
        road: '',
        number: '',
        city: '',
        state: '',
        zip: '',
        complement: '',
        neighborhood: ''
    });

    const [cardForm, setCardForm] = useState({
        number: '',
        name: '',
        expireDate: '',
        cvv: ''
    })

    if (!products || products.length === 0) {
        return <Navigate to="/carrinho" replace />;
    }

    const total = products.reduce((sum, p) => {
        const numeric = parseFloat(p.price.replace(/[R$\.,]/g, '').replace(/(\d{2})$/, '.$1'));
        return sum + numeric;
    }, 0);

    const totalFormatted = total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    return (
        <div className={style.Container}>
            <Header user={user} hideOptions />
            <div className={style.PageContent}>
                <div className={style.Summary}>
                    <h2>Resumo da compra</h2>
                    <div className={style.ProductsContainer}>
                        { products.map((product) => (
                            <div className={style.Product}>
                                <h4>{product.name}</h4>
                                <p>{product.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <form className={style.PaymentForm}>
                    <input className={`${style.Input} ${style.CardNumber}`} placeholder="Número do Cartão" type="text" value={cardForm.number} onChange={e => setCardForm({ ...cardForm, number: e.target.value })} />
                    <input className={`${style.Input} ${style.CardName}`} placeholder="Nome no Cartão" type="text" value={cardForm.name} onChange={e => setCardForm({ ...cardForm, name: e.target.value })} />
                    <input className={`${style.Input} ${style.CardExpire}`} placeholder="Validade" type="text" value={cardForm.expireDate} onChange={e => setCardForm({ ...cardForm, expireDate: e.target.value })} />
                    <input className={`${style.Input} ${style.CardCVV}`} placeholder="CVV" type="text" value={cardForm.cvv} onChange={e => setCardForm({ ...cardForm, cvv: e.target.value })} />                    
                    <button type="submit">Realizar Pagamento</button>
                    <span></span>
                    
                </form>
            </div> 
            <Footer />
        </div>
    );
};

    export default CheckoutPage;
