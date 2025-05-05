import React from 'react';
import styles from '../css/TermsOfUse.module.scss';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

import { useUser } from 'contexts/UserContext';

const TermsOfUse: React.FC = () => {
    const { user } = useUser();

    return (
        <div className={styles.page}>
        <Header user={user} />

        <main className={styles.content}>
            <h1>Termos de Uso</h1>
            <p>Bem-vindo ao nosso site! Ao utilizar nossos serviços, você concorda com os termos abaixo:</p>

            <section>
            <h2>1. Aceitação</h2>
            <p>O uso deste site implica na aceitação integral dos termos e condições aqui descritos.</p>
            </section>

            <section>
            <h2>2. Uso Permitido</h2>
            <p>Você concorda em utilizar este site apenas para fins lícitos e de maneira que não infrinja direitos de terceiros.</p>
            </section>

            <section>
            <h2>3. Propriedade Intelectual</h2>
            <p>Todo o conteúdo presente neste site é protegido por direitos autorais e não pode ser reproduzido sem autorização.</p>
            </section>

            <section>
            <h2>4. Modificações</h2>
            <p>Reservamo-nos o direito de alterar estes termos a qualquer momento sem aviso prévio.</p>
            </section>
        </main>

        <Footer />
    </div>
  );
};

export default TermsOfUse;
