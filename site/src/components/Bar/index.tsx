import style from './Bar.module.scss';

import { ReactComponent as Home } from '../../assets/Bar/home.svg';
import { ReactComponent as Search } from '../../assets/Bar/search.svg';
import { ReactComponent as Plus } from '../../assets/Bar/plus.svg';
import { ReactComponent as Menu } from '../../assets/Bar/menu.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
    selected: number;
}

const Bar:React.FC<Props> = ({ selected }) => {

    return (
        <div className={style.Container}>
            <Link to='/' className={style.Option}><Home fill={selected == 1 ? '#DDA04B' : ''} className={style.Icon} /><span>Início</span></Link>
            <Link to='/buscar' className={style.Option}><Search fill={selected == 2 ? '#DDA04B' : ''} className={style.Icon} /><span>Buscar</span></Link>
            <Link to='/anunciar' className={style.Option}><Plus fill={selected == 3 ? '#DDA04B' : ''} className={style.Icon} /><span>Anunciar</span></Link>
            <div className={style.Option}><Menu fill={selected == 4 ? '#DDA04B' : ''} className={style.Icon} /><span>Menu</span></div>
        </div>
    )    
}

export default Bar;