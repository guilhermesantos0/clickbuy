import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import style from './Comprar.module.scss';

import api from 'services/api';

import Header from 'components/Header';
import Footer from 'components/Footer';

import { useUser } from 'contexts/UserContext';

import { Product } from 'types/Product';

const CheckoutPage = () => {
    const { category, id } = useParams();
    const { user } = useUser();

    const [product, setProduct] = useState<Product>();
    const [formData, setFormData] = useState({
        name: '',
        cardNumber: '',
        expireDate: '',
        cvv: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(`/products/${id}`);
            setProduct(response.data)
        }

        fetchData();
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui você pode implementar a lógica de envio dos dados para a API
        alert('Pagamento processado com sucesso!');
    };

    return (
        <div className={style.Container}>
            <Header user={user} hideOptions />
            <div className={style.PageContent}>
                <div className={style.LeftSection}>
                    <h1>Resumo da Compra</h1>
                    { product ? (
                    <div className={style.Product} >
                        <img src={`http://localhost:5000${product.mainImage}`} alt="" />
                        <div className={style.ProductDescription}>
                            <h2>{product.name}</h2>
                        </div>
                    </div>
                    ) : (
                        <span>Nenhum produto encontrado</span>
                    )}
                    <h2>Total: {product?.price}</h2>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default CheckoutPage;
