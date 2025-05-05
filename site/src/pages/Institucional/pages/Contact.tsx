import React from 'react';
import styles from '../css/Contact.module.scss';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

import { useUser } from 'contexts/UserContext';

const Contact: React.FC = () => {
    const { user } = useUser();

    return (
        <div className={styles.contactPage}>
        <Header user={user}/>

        <main className={styles.content}>
            <h1>Fale Conosco</h1>
            <p>
            Tem alguma dúvida, sugestão ou deseja entrar em contato com nossa equipe? Preencha o
            formulário abaixo e responderemos o mais breve possível.
            </p>

            <form className={styles.form}>
            <div className={styles.inputGroup}>
                <label htmlFor="name">Nome</label>
                <input type="text" id="name" placeholder="Seu nome completo" />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="seuemail@exemplo.com" />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="message">Mensagem</label>
                <textarea id="message" placeholder="Escreva sua mensagem..." rows={6} />
            </div>

            <button type="submit">Enviar</button>
            </form>
        </main>

        <Footer />
    </div>
  );
};

export default Contact;
