import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductsList from '../../components/ProductsList';

import style from './Home.module.scss';

import { ReactComponent as Eletronicos } from '../../assets/Home/eletronicos.svg';
import { ReactComponent as Cozinha } from '../../assets/Home/cozinha.svg';
import { ReactComponent as Moda } from '../../assets/Home/moda.svg';
import { ReactComponent as Decoracao } from '../../assets/Home/decoracao.svg';
import { ReactComponent as Beleza } from '../../assets/Home/beleza.svg';
import { ReactComponent as Pets } from '../../assets/Home/pets.svg';
import { ReactComponent as Papelaria } from '../../assets/Home/papelaria.svg';

import banner from '../../assets/Home/banner.png';

const categories = [
    { name: "Eletrônicos", item: <Eletronicos /> },
    { name: "Cozinha", item: <Cozinha /> },
    { name: "Moda", item: <Moda /> },
    { name: "Decoração", item: <Decoracao /> },
    { name: "Beleza", item: <Beleza /> },
    { name: "Pets", item: <Pets /> },
    { name: "Papelaria", item: <Papelaria /> }
]

const Home = () => {
    return (
        <div className={style.Container}>
            <Header />
            <div className={style.PageContent}>

                <img className={style.Banner} src={banner} alt="" />

                <nav className={style.NavBar}>
                    { categories.map((category, item) => (
                        <li className={style.Category} >{category.item}<span>{category.name}</span></li>
                    )) }
                </nav>

                <div className={style.ShopArea}>
                    <div className={style.ProductsArea}> 
                        <ProductsList title='Recomendados para Você:'/>
                        <ProductsList title='Recomendados para Você:'/>
                    </div>
                </div>
                <Footer />

            </div>
        </div>
    )
}

export default Home;
