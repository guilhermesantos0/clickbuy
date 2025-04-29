import { Link } from "react-router-dom";

import { ReactComponent as Lupa } from '../../assets/lupa.svg';
import logo from "../../assets/logo.png";
import style from './Header.module.scss';

import { User } from '@modules/User';

interface Props {
    user: User | null
}

const Header: React.FC<Props> = ({ user }) => {

    return (
        <div className={style.Container}>
            <div className={style.Left}>
                <img className={style.LeftImage} src="/" alt="Click Buy" />
            </div>
            <div className={style.Center}>
                <input className={style.Input} type="text" />
                <Lupa className={style.SearchImage} />
            </div>
            <div className={style.Right}>
                <button className={style.Announce}>Anunciar</button>
                { 
                    user ? 
                    <img className={style.ProfileImage} src={user?.profilePic} alt="" />
                    :
                    <Link className={style.Login} to="/login">Entrar</Link>
                }
            </div>
        </div>
    )
}

export default Header;