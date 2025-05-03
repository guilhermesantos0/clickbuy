import { useState, useRef, useEffect } from 'react';

import { Link } from "react-router-dom";

import { ReactComponent as Lupa } from '../../assets/lupa.svg';
import style from './Header.module.scss';

import { User } from '@modules/User';

interface Props {
    user: User | null
}

const Header: React.FC<Props> = ({ user }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const genericPhoto = "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"

    const toggleMenu = () => setMenuOpen(prev => !prev);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if(menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])

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
                <Link className={style.Announce} to='/anunciar'>Anunciar</Link>
                { 
                    user ? 
                    <div className={style.ProfileContainer} ref={menuRef}>
                        <img 
                            className={style.ProfileImage} 
                            src={user?.profilePic ? user.profilePic : genericPhoto} 
                            alt=""
                            onClick={toggleMenu}
                        />
                        { menuOpen && (
                            <div className={style.MenuContainer}>
                                <Link to="/editar-perfil">Editar Perfil</Link>
                                <Link to="/meus-produtos">Meus Produtos</Link>
                                <Link to="/favoritos">Favoritos</Link>
                                <Link to="/logout">Sair</Link>
                            </div>
                        )}
                    </div>
                    :
                    <Link className={style.Login} to="/login">Entrar</Link>
                }
            </div>
        </div>
    )
}

export default Header;