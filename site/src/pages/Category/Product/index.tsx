import { useParams } from "react-router-dom";

import Header from "components/Header";
import Footer from "components/Footer";

import { useUser } from "contexts/UserContext";
import { useEffect, useState } from "react";

import { Product as ProductType } from "@modules/Product";
import Product from "components/Product";

const ProductPage = () => {
    const { user } = useUser();
    const { category, id } = useParams<{ category: string, id: string }>();

    return (
        <div>
            <Header user={user} />
            <h1>Produto Id: {id}</h1>
            <p>Categoria: {category}</p>
            <Footer />
        </div>
    )
}

export default ProductPage;