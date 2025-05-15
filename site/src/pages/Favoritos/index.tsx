import Header from "components/Header"
import Footer from "components/Footer"

import { useUser } from "contexts/UserContext"
import { useState, useEffect } from "react";

import { getUserFavouriteProducts } from "services/favouriteService";

import Product from "components/Product";
import SelectMenu from "components/SelectMenu";

import { Product as ProductModel } from "@modules/Product";

import style from './Favoritos.module.scss';

const Favoritos = () => {
    const { user } = useUser();

    const [favourites, setFavourites] = useState<ProductModel[]>();
    const [filter, setFilter] = useState('recent');

    const filterOptions = [
        {
            label: 'Mais Recentes',
            value: 'recent'
        },
        {
            label: 'Menor Preço',
            value: 'price'
        }
    ]

    useEffect(() => {
        const fetchData = async () => {
            const userFavourites = await getUserFavouriteProducts(user?._id);
            setFavourites(userFavourites)
        }

        fetchData();
    })

    return (
        <div className={style.Container}>
            <Header user={user}></Header>
            <div className={style.Favourites}>
                <div className={style.TopSection}>
                    <h1>Meus Favoritos</h1>
                    {Array.isArray(favourites) && favourites.length > 0 ? <SelectMenu value={filter} onValueChange={setFilter} options={filterOptions} type="favFilter" /> : <></>}
                    
                </div>
                <div className={style.ProductsArea}>
                    {Array.isArray(favourites) && favourites.length > 0 ? (
                        favourites.map((fav, idx) => (
                            <Product key={idx} product={fav} favouriteOption />
                        ))
                    ) : (
                        <div>Você não tem nenhum favorito</div>
                    )}
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Favoritos