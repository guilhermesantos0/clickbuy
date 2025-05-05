import React from 'react';
import styles from '../css/PrivacyPolicy.module.scss';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

import { useUser } from 'contexts/UserContext';

const PrivacyPolicy: React.FC = () => {
    const { user } = useUser();

    return (
        <div className={styles.page}>
        <Header user={user} />

        <main className={styles.content}>
            <h1>Política de Privacidade</h1>
            <p>Sua privacidade é importante para nós. Leia abaixo como tratamos os seus dados:</p>

            <section>
            <h2>1. Coleta de Informações</h2>
            <p>Coletamos informações fornecidas diretamente por você, como nome, email e endereço.</p>
            </section>

            <section>
            <h2>2. Uso das Informações</h2>
            <p>As informações coletadas são usadas para melhorar nossos serviços e oferecer uma melhor experiência.</p>
            </section>

            <section>
            <h2>3. Compartilhamento</h2>
            <p>Não compartilhamos suas informações pessoais com terceiros sem seu consentimento.</p>
            </section>

            <section>
            <h2>4. Segurança</h2>
            <p>Adotamos medidas para proteger seus dados contra acessos não autorizados.</p>
            </section>
        </main>

        <Footer />
    </div>
  );
};

export default PrivacyPolicy;
