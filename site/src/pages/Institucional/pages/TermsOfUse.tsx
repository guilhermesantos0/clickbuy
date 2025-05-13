import React, { useEffect, useRef } from 'react';
import styles from '../css/TermsOfUse.module.scss';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

import { useUser } from 'contexts/UserContext';

const TermsOfUse: React.FC = () => {
  const { user } = useUser();
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll reveal effect
  useEffect(() => {
    const handleScroll = () => {
      cardsRef.current.forEach((card) => {
        if (card) {
          const top = card.getBoundingClientRect().top;
          const isVisible = top < window.innerHeight * 0.85;
          if (isVisible) {
            card.classList.add(styles.visible);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // check on load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.page}>
      <Header user={user} />

      <main className={styles.content}>
        <h1>Termos de Uso</h1>

        <div className={styles.cardGrid}>
          {[
            {
              title: '1. Aceitação dos Termos',
              text: 'Ao acessar e utilizar o ClickBuy, você aceita automaticamente os termos e condições aqui descritos. Caso não concorde, recomendamos que não utilize o site.'
            },
            {
              title: '2. Uso Permitido',
              text: 'O site é destinado exclusivamente para fins legais e pessoais. É proibido utilizá-lo para atividades ilícitas ou que violem direitos de terceiros.'
            },
            {
              title: '3. Propriedade Intelectual',
              text: 'Todo o conteúdo do site (textos, imagens, layout) pertence ao ClickBuy ou seus licenciadores, sendo protegido por direitos autorais.'
            },
            {
              title: '4. Alterações dos Termos',
              text: 'Os termos podem ser atualizados a qualquer momento sem aviso prévio. Recomendamos a consulta periódica desta página.'
            },
            {
              title: '5. Limitação de Responsabilidade',
              text: 'Não nos responsabilizamos por danos decorrentes do uso do site, incluindo interrupções, falhas técnicas ou conteúdo de terceiros.'
            },
            {
              title: '6. Contato',
              text: 'Em caso de dúvidas sobre estes termos, entre em contato conosco pela página "Fale Conosco".'
            }
          ].map((item, index) => (
            <div
              key={index}
              className={`${styles.card} ${styles.reveal}`}
                ref={(el) => {
                if (el) cardsRef.current[index] = el;
            }}

            >
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <p className={styles.disclaimer}>
          Ao continuar utilizando o ClickBuy, você declara estar ciente e de acordo com os nossos Termos de Uso.
        </p>

        <p className={styles.copyright}>© 2025 ClickBuy. Todos os direitos reservados.</p>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfUse;
