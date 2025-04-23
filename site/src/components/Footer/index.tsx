import React from 'react';
import styles from './Footer.module.scss';


import whatsappIcon from '../../assets/whats.svg';
import facebookIcon from '../../assets/face.svg';
import instagramIcon from '../../assets/insta.svg';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        
        {}
        <div className={styles.footerLinks}>
          <button className={styles.linkButton}>Suporte</button>
          <button className={styles.linkButton}>Termos de Uso</button>
          <button className={styles.linkButton}>Política de Privacidade</button>
          <button className={styles.linkButton}>Redes Sociais</button>
        </div>
        {}

        <div className={styles.socialIcons}>
          <button className={styles.socialIcon}>
            <img src={whatsappIcon} alt="WhatsApp" />
          </button>
          <button className={styles.socialIcon}>
            <img src={facebookIcon} alt="Facebook" />
          </button>
          <button className={styles.socialIcon}>
            <img src={instagramIcon} alt="Instagram" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
