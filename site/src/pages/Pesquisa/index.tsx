import { useLocation, useParams } from "react-router-dom";

import Header from "components/Header";
import Footer from "components/Footer";

import { useUser } from "contexts/UserContext";
import { useEffect, useState } from "react";

import { Product as ProductType } from "@modules/Product";
import Product from "components/Product";

import style from '../Category/Category.module.scss';

import api from "services/api";
import { Category as CategoryType } from "@modules/Category";

import { useNavigate } from "react-router-dom";

interface LocationState {
    search?: string;
}

const SearchPage = () => {

    const {user} = useUser();

    const location = useLocation();
    const state = location.state as LocationState;
    const query = state?.search;
    
    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get(`/products?name=${query}`)
            setProducts(res.data);
        }

        fetchData();
    },[query])

    const [products, setProducts] = useState<ProductType[]>([]);

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortOption, setSortOption] = useState('relevance');
    const [filteredProducts, setFilteredProducts] = useState(products);

    const parseFormattedPrice = (formattedPrice: any) => {
        return Number(
          formattedPrice
            .replace('R$', '')
            .replace(/\./g, '')
            .replace(',', '.')
            .trim()
        );
    };

    useEffect(() => {
        let updatedProducts = [...products];
      
        if (minPrice) {
          updatedProducts = updatedProducts.filter(
            (product) => parseFormattedPrice(product.price) >= parseFloat(minPrice)
          );
        }
      
        if (maxPrice) {
          updatedProducts = updatedProducts.filter(
            (product) => parseFormattedPrice(product.price) <= parseFloat(maxPrice)
          );
        }
      
        switch (sortOption) {
          case 'highest':
            updatedProducts.sort(
              (a, b) => parseFormattedPrice(b.price) - parseFormattedPrice(a.price)
            );
            break;
          case 'lowest':
            updatedProducts.sort(
              (a, b) => parseFormattedPrice(a.price) - parseFormattedPrice(b.price)
            );
            break;
          case 'recent':
            updatedProducts.sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            break;
          default:
            break;
        }
      
        setFilteredProducts(updatedProducts);
      }, [minPrice, maxPrice, sortOption, products]);

    return (
        <div className={style.Container}>
            <Header user={user} />
            <h1 className={style.Title}>{query}</h1>
            <div className = {style.PageContent}>
                <aside className={style.Filter}>
                    <h2 className={style.FilterLabel}>Preço</h2>
                    <div>
                        R$
                        <input
                        className={style.Input}
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <span>até</span>
                        <input
                        className={style.Input}
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                    <h2 className={style.FilterLabel}>Ordenar Por</h2>
                    <ul className={style.FilterOptions}>
                    <li
                        className={style.FilterOption}
                        onClick={() => setSortOption('relevance')}
                    >
                        Mais relevante
                    </li>
                    <li
                        className={style.FilterOption}
                        onClick={() => setSortOption('highest')}
                    >
                        Maior Preço
                    </li>
                    <li
                        className={style.FilterOption}
                        onClick={() => setSortOption('lowest')}
                    >
                        Menor Preço
                    </li>
                    <li
                        className={style.FilterOption}
                        onClick={() => setSortOption('recent')}
                    >
                        Mais Recentes
                    </li>
                    </ul>
                </aside>
                <div className={style.ProductsArea}>
                {filteredProducts.map((product, idx) => (
                    <Product key={idx} product={product} favouriteOption />
                ))}
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default SearchPage