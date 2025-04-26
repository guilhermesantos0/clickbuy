import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductsList from '../../components/ProductsList';

import Categorias from '../../components/Categorias';

import style from './Home.module.scss';

import banner from '../../assets/Home/banner.png';

const Home = () => {
    return (
        <div className={style.Container}>
            <Header />
            <div className={style.PageContent}>

                <img className={style.Banner} src={banner} alt="" />

                <Categorias/>

                <ProductsList title="Recomendados para você:" />
                <ProductsList title="Recomendados para você:" />

            </div>
            <Footer />
        </div>
    )
}

export default Home;
