import Header from '../../components/Header';
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

const Home = () => {
    return (
        <div className={style.Container}>
            <Header />
            <div className={style.PageContent}>
                <nav className={style.NavBar}>
                    <li className={style.Category} ><Eletronicos /><span>Eletrônicos</span></li>
                    <li className={style.Category} ><Cozinha /><span>Cozinha</span></li>
                    <li className={style.Category} ><Moda /><span>Moda</span></li>
                    <li className={style.Category} ><Decoracao /><span>Decoração</span></li>
                    <li className={style.Category} ><Beleza /><span>Beleza</span></li>
                    <li className={style.Category} ><Pets /><span>Pets</span></li>
                    <li className={style.Category} ><Papelaria /><span>Papelaria</span></li>
                </nav>

                <div className={style.ShopArea}>
                    <img className={style.Banner} src={banner} alt="" />
                    <div className={style.ProductsArea}> 
                        <ProductsList title='Recomendados para Você:'/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home;