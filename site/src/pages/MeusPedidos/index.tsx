import Header from "components/Header";
import Footer from "components/Footer";
import Product from "./components/Product";

import { useUser } from "contexts/UserContext";
import { useEffect, useState } from "react";

import { Product as ProductType } from "@modules/Product";
import api from "services/api";


import style from './MeusPedidos.module.scss';

const MeusPedidos = () => {
    const { user } = useUser();
    const [products, setProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if(user) {
                try {
                    const res = await api.get(`/user/${user?._id}/purchased`);
                    console.log(res)
                    setProducts(res.data);
                } catch (err) {
                    console.error("Erro ao buscar produtos comprados", err);
                }
            }
        };

        fetchData();
    }, [user]);


    return (
        <div className={style.Container}>
            <Header user={user} />
            <div className={style.PageContent}>
                <h1>Meus Pedidos</h1>
                <div>
                    <h3>Seus Pedidos: {products.length}</h3>
                </div>
                <div className={style.ProductsList}>
                    {
                        products.map((product) => (
                            <Product product={product} />
                        ))
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MeusPedidos