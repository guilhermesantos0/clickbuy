import Header from "components/Header"
import Footer from "components/Footer"
import Product from "./components/Product";
import SelectMenu from "components/SelectMenu";

import { useUser } from "contexts/UserContext"
import { useParams } from "react-router-dom";

import { ReactComponent as History } from 'assets/history.svg'

import { User } from "types/User";
import { useEffect, useState } from "react";
import api from "services/api";

import { Product as ProductType } from "@modules/Product";
import { Category } from "@modules/Category";

import style from './User.module.scss';

const UserPage = () => {
    const { user } = useUser();
    const { id } = useParams<{ id: string }>();
    const [userProfile, setUserProfile] = useState<User>();
    const [userProducts, setUserProducts] = useState<ProductType[]>();
    const [soldProducts, setSoldProducts] = useState<number>();

    const [categories, setCategories] = useState<Category[]>([]);

    const [categoryFilter, setCategoryFilter] = useState();
    const [filter, setFilter] = useState();

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
            try {
                const response = await api.get('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Erro ao buscar categorias', error)
            }
        }

        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async() => {
            if(id && user) {
                const userResponse = await api.get(`/user/${id}`);
                setUserProfile(userResponse.data);

                const productsResponse = await api.get(`/user/${id}/products`);
                const products: ProductType[] = productsResponse.data;
                setUserProducts(products)

                const soldProductsArr = products?.filter((product) => product.sold === true);
                setSoldProducts(soldProductsArr?.length)
            }
        }

        fetchData();
    },[id, user])

    return (
        <div className={style.Container}>
            <Header user={user} hideOptions />
            { userProfile && (
                <div className={style.PageContent}>
                    <div className={style.UserDetails}>
                        <div className={style.UserTop}>
                            <img className={style.Image} src={userProfile.profilePic} alt="Foto de perfil" />
                            <h1 className={style.Name}>{userProfile.personalData.name}</h1>
                        </div>
                        <span className={style.Separator}></span>
                        <div className={style.UserBottom}>
                            <h2>Informações de Contato</h2>
                            <div className={style.DataContainer}>
                                <span className={style.Data}><h3>Telefone: </h3>{userProfile.personalData.phone}</span>
                                <span className={style.Data}><h3>Email: </h3>{userProfile.email}</span>
                            </div>
                        </div>
                    </div>
                    <div className={style.Announces}>
                        <h1>Anúncios</h1>
                        <div className={style.AnnounceHistory}>
                            <h3 className={style.Title} ><History className={style.Icon} /> Histórico</h3>
                            <span>{userProducts?.length} Produtos anunciados</span>
                            <span>{soldProducts} Vendidos</span>
                        </div>
                        <div>
                            <div className={style.FilterContainer}>
                                <div>
                                    <label htmlFor="category">Categoria</label>
                                    <SelectMenu 
                                    value={categoryFilter} 
                                    onValueChange={setCategoryFilter} 
                                    options={categories} 
                                    type="category" />
                                </div>
                                <div>
                                    <label htmlFor="">Ordenar por</label>
                                    <SelectMenu 
                                    value={filter} 
                                    onValueChange={setFilter} 
                                    options={filterOptions} 
                                    type="favFilter" />
                                </div>
                            </div>
                            <div className={style.ProductsContainer}>
                                { userProducts?.map((product) => (
                                    <>
                                        {
                                            user?._id == userProfile._id ? (
                                                <>
                                                    <Product product={product} />
                                                </>
                                            ) : (
                                                <>
                                                    {
                                                        !product.sold && (
                                                            <Product product={product} />
                                                        )
                                                    }
                                                </>
                                            )
                                        }
                                    </>
                                )) }
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    )
}

export default UserPage