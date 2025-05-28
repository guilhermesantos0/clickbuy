import { useUser } from 'contexts/UserContext';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductsList from '../../components/ProductsList';
import Categorias from '../../components/Categorias';
import Slider from '../../components/Slider'; // Importa o Slider

import style from './Home.module.scss';

import Bar from '../../components/Bar';
import { useEffect, useState } from 'react';
import api from 'services/api';

import { Category } from 'types/Category';

const Home = () => {
    const { user } = useUser();
    const [selectedCategories, setSelectedCategories] = useState<Category[]>();

    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get('/categories');
            const rawCategories = res.data;

            const shuffledCategories = [...rawCategories].sort(() => 0.5 - Math.random());
            setSelectedCategories(shuffledCategories.slice(0, 3));

            console.log(selectedCategories)
        }

        fetchData()
    },[])

    return (
        <div className={style.Container}>
            <Header user={user} />
            <div className={style.PageContent}>

                <Slider />

                <Categorias/>

                <ProductsList title="Recomendados para você:" />
                {
                    selectedCategories && (
                        <>
                            {
                                selectedCategories.map((category) => (
                                    <ProductsList title={`Recomendados em ${category.name}:`} />
                                ))
                            }
                        </>
                    )
                }

            </div>
            <Bar selected={1} />
            <Footer />
        </div>
    );
}

export default Home;
