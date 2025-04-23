import { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Lupa } from '../../assets/lupa.svg';

import logo from '../../assets/logo.png';
import style from './Header.module.scss';

const Header: React.FC<{ account: object }> = ({ account }) => {
  const [user, setUser] = useState(null);

  return (
    <div className={style.Container}>
      <div className={style.Left}>
        <img src={logo} alt="Click Buy" />
      </div>

      <div className={style.Center}>
        <input className={style.Input} type="text" placeholder="Buscar..." />
        <Lupa className={style.SearchImage} />
      </div>

      <div className={style.Right}>
        <button className={style.actionButton}>Anunciar</button>
        {user ? (
          <div>
            <img src="" alt="User" />
          </div>
        ) : (
          <Link to="/login" className={style.actionButton}>Entrar</Link>
        )}
      </div>

    </div>
  );
};

export default Header;
