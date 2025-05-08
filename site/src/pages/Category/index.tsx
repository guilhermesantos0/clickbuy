import { useParams } from "react-router-dom";

import Header from "components/Header";
import Footer from "components/Footer";

import { useUser } from "contexts/UserContext";
import { useEffect, useState } from "react";

import { Product as ProductType } from "@modules/Product";
import Product from "components/Product";

import style from './Category.module.scss';

const Category = () => {

    const { category } = useParams<{ category: string }>();
    const {user} = useUser();

    const [products, setProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/products?category=${category}`);
            const result = await response.json();

            setProducts(result.products)
        }
        fetchData();
    }, [])

    return (
        <div className={style.Container}>
            <Header user={user} />
            <h1 className={style.Title}>{category}</h1>
            <div className = {style.PageContent}>
                <aside className={style.Filter}>
                    <h2 className={style.FilterLabel}>Preço</h2>
                    <div>
                        R$
                        <input className={style.Input} type="number" />
                        <span>até</span>
                        <input className={style.Input} type="number" />
                    </div>
                    <h2 className={style.FilterLabel}>Ordenar Por</h2>
                    <ul className={style.FilterOptions}>
                        <li className={style.FilterOption} >Mais relevante</li>
                        <li className={style.FilterOption} >Maior Preço</li>
                        <li className={style.FilterOption} >Menor Preço</li>
                        <li className={style.FilterOption} >Mais Recentes</li>
                    </ul>
                </aside>
                <div className={style.ProductsArea}>
                    {
                        products.map((product) => (
                            <Product product={product} favouriteOption />
                        ))
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default Category