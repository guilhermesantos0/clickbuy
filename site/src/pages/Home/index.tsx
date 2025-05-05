import { useUser } from 'contexts/UserContext';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductsList from '../../components/ProductsList';
import Categorias from '../../components/Categorias';
import Slider from '../../components/Slider'; // Importa o Slider

import style from './Home.module.scss';

import Bar from '../../components/Bar';

const Home = () => {
    const { user } = useUser();

    return (
        <div className={style.Container}>
            <Header user={user} />
            <div className={style.PageContent}>

                <Slider /> {/* Substitui o banner pelo slider */}

                <Categorias/>

                <ProductsList title="Recomendados para você:" />
                <ProductsList title="Recomendados para você:" />

            </div>
            <Bar selected={1} />
            <Footer />
        </div>
    );
}

export default Home;
