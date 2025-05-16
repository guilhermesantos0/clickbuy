import Header from "components/Header"
import Footer from "components/Footer"
import Product from "./components/Product";

import style from "./UserProducts.module.scss";

import { useUser } from "contexts/UserContext";

import { Product as ProductType } from "types/Product";

import api from "services/api";
import { useEffect, useState } from "react";

const UserProducts = () => {
    const { user } = useUser();
    const [products, setProducts] = useState<ProductType[]>();

    useEffect(() => {
        const fetchData = async () => {
            if (!user?._id) return;

            const response = await api.get(`/products/user/${user._id}`);
            setProducts(response.data);
        };

        fetchData();
    }, [user]);

    const handleDeleteProduct = (productId: string) => {
        setProducts((prev) => prev?.filter((p) => p._id !== productId))
    }

    return (
        <div className={style.Container}>
            <Header user={user}></Header>
            <div className={style.PageContent}>
                <h1>Meus Produtos</h1>
                {Array.isArray(products) && products.length > 0 ? (
                    products.map((product, idx) => (
                        <Product key={idx} product={product} onDelete={handleDeleteProduct} />
                    ))
                ) : (
                    <div>Você não tem nenhum produto</div>
                )}
            </div>
            <Footer></Footer>
        </div>
    )
}

export default UserProducts