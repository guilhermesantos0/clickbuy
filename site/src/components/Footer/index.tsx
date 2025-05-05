import React from 'react';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

import whatsappIcon from '../../assets/Footer/whats.svg';
import facebookIcon from '../../assets/Footer/face.svg';
import instagramIcon from '../../assets/Footer/insta.svg';
import visaIcon from '../../assets/Footer/visa.svg';
import mastercardIcon from '../../assets/Footer/mastercard.svg';
import pixIcon from '../../assets/Footer/pix.svg';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>

        <div className={styles.section}>
          <h4>Institucional</h4>
          <ul>
            <Link to='/institucional/sobrenos'>Sobre Nós</Link>
            <Link to='/institucional/contato'>Contato</Link>
            <Link to='/institucional/termos-de-uso'>Termos de Uso</Link>
            <Link to='/institucional/politica-de-privacidade'>Política de Privacidade</Link>
          </ul>
        </div>

        <div className={styles.section}>
          <h4>Minha Conta</h4>
          <ul>
            <li>Meus Pedidos</li>
            <li>Favoritos</li>
            <li>Cadastro</li>
            <li>Login</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h4>Ajuda</h4>
          <ul>
            <li>Frete e Entrega</li>
            <li>Trocas e Devoluções</li>
            <li>Garantia</li>
            <li>Central de Suporte</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h4>Redes Sociais</h4>
          <div className={styles.socialIcons}>
            <img src={whatsappIcon} alt="WhatsApp" />
            <img src={facebookIcon} alt="Facebook" />
            <img src={instagramIcon} alt="Instagram" />
          </div>

          <h4>Pagamentos</h4>
          <div className={styles.paymentIcons}>
            <img src={visaIcon} alt="Visa" />
            <img src={mastercardIcon} alt="MasterCard" />
            <img src={pixIcon} alt="Pix" />
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} ClickBuy. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
