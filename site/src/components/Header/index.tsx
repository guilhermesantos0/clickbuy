import { useState, useRef, useEffect } from 'react';

import { Link, useNavigate } from "react-router-dom";

import { ReactComponent as Lupa } from '../../assets/lupa.svg';

import style from './Header.module.scss';

import { User } from '@modules/User';

import { useUser } from 'contexts/UserContext';

import { MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons';
import { toast } from 'react-toastify';

interface Props {
    user: User | null,
    hideOptions?: boolean
}

const Header: React.FC<Props> = ({ user, hideOptions }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const genericPhoto = "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"

    const toggleMenu = () => setMenuOpen(prev => !prev);

    const navigate = useNavigate();

    const { setUser } = useUser();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if(menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])

    const handleLogout = () => {
        setUser(null)
        navigate('/');
    }

    const handleAnnounce = () => {
        if(user) {
            navigate('/anunciar');
        } else {
            navigate('/login');
            toast.warn('Você precisa estar logado para anunciar!');
        }
    }

    return (
        <div className={style.Container}>
            <div className={style.Left}>
                <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Click Buy" className={style.LeftImage} onClick={() => navigate('/')} />
            </div>
            {
                !hideOptions && (
                    <div className={style.Center}>
                         <div className={style.SearchBar}>
                            <MagnifyingGlassIcon className={style.SearchIcon} />
                            <input
                                type="text"
                                placeholder="Pesquisar produtos, categorias..."
                                className={style.SearchInput}
                            />
                        </div>
                        {/* <div className={style.Center}>
                            <input className={style.Input} type="text" />
                            <Lupa className={style.SearchImage} />
                        </div> */}
                    </div>
                )
            }
            <div className={style.Right}>
            {/* <Link className={style.Announce} to='/anunciar'>Anunciar</Link> */}
            <div onClick={handleAnnounce} className={style.AnnounceButton}>
                <PlusIcon className={style.PlusIcon} />
                Anunciar
            </div>
                { 
                    user ? 
                    <div className={style.ProfileContainer} ref={menuRef}>
                        <img 
                            className={style.ProfileImage} 
                            src={user?.profilePic ? `${user.profilePic}` : genericPhoto} 
                            alt=""
                            onClick={toggleMenu}
                        />
                        { menuOpen && (
                            <div className={style.MenuContainer}>
                                <Link to="/editar-perfil">Editar Perfil</Link>
                                <Link to='/carrinho'>Carrinho</Link>
                                <Link to="/meus-produtos">Meus Produtos</Link>
                                <Link to="/meus-pedidos">Meus Pedidos</Link>
                                <Link to="/favoritos">Favoritos</Link>
                                <span onClick={handleLogout}>Sair</span>
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

