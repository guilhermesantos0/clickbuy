import { useParams } from "react-router-dom";

import Header from "components/Header";
import Footer from "components/Footer";

import { useUser } from "contexts/UserContext";
import { useEffect, useState } from "react";

import { Product } from "@modules/Product";

const Category = () => {

    const { category } = useParams<{ category: string }>();
    const {user} = useUser();

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/products?category=${category}`);
            const result = await response.json();

            setProducts(result.products)

        }
    }, [])

    return (
        <div>
            <Header user={user} />
            <div>
                <h1></h1>
                <aside>
                    <h2>Preço</h2>
                    <div>
                        <input type="number" />
                        <span>até</span>
                        <input type="number" />
                    </div>
                    <h2>Ordenar Por</h2>
                    <ul>
                        <li>Mais relevante</li>
                        <li>Maior Preço</li>
                        <li>Menor Preço</li>
                        <li>Mais Recentes</li>
                    </ul>
                </aside>

            </div>
            <Footer />
        </div>
    )
};

export default Category