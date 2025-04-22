import {useState} from "react"
import { Link } from "react-router-dom";

import { ReactComponent as Lupa } from '../../assets/lupa.svg';

import style from './Header.module.scss';

const Header: React.FC<{ account: object }> = (props) => {

    const [user, setUser] = useState(null)

    return (
        <div className={style.Container}>
            <div className={style.Left}>
                <img src="/favicon.ico" alt="Click Buy" />
            </div>
            <div className={style.Center}>
                <input className={style.Input} type="text" />
                <Lupa className={style.SearchImage} />
            </div>
            <div className={style.Right}>
                <button>Anunciar</button>
                { 
                    user ? 
                    <div>
                        <img src="" alt="" />
                    </div>
                    :
                    <Link to="/login">Entrar</Link>
                }
            </div>
        </div>
    )
}

export default Header;