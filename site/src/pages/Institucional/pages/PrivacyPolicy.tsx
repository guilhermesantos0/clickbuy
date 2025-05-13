import React, { useEffect, useRef } from 'react';
import styles from '../css/PrivacyPolicy.module.scss';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

import { useUser } from 'contexts/UserContext';

const PrivacyPolicy: React.FC = () => {
  const { user } = useUser();
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (isIntersecting) {
            target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const sections = [
    {
      title: '1. Coleta de Informações',
      text: 'Coletamos dados como nome, e-mail e endereço com o único objetivo de melhorar sua experiência dentro da plataforma.'
    },
    {
      title: '2. Uso dos Dados',
      text: 'Utilizamos as informações para fornecer suporte, recomendações personalizadas e garantir o bom funcionamento do site.'
    },
    {
      title: '3. Consentimento',
      text: 'Ao utilizar nossa plataforma, você consente com a coleta e uso das informações conforme esta política.'
    },
    {
      title: '4. Compartilhamento de Dados',
      text: 'Seus dados nunca serão vendidos ou compartilhados com terceiros sem sua autorização, exceto em casos legais.'
    },
    {
      title: '5. Segurança e Armazenamento',
      text: 'Adotamos medidas técnicas e administrativas para proteger suas informações contra acessos não autorizados.'
    },
    {
      title: '6. Direitos do Usuário',
      text: 'Você pode acessar, corrigir ou excluir seus dados pessoais a qualquer momento, conforme previsto pela LGPD.'
    }
  ];

  return (
    <div className={styles.page}>
      <Header user={user} />

      <main className={styles.content}>
        <h1>Política de Privacidade</h1>
        <p className={styles.intro}>
          A sua privacidade é nossa prioridade. Esta política esclarece como seus dados são tratados, protegidos e utilizados em nossa plataforma.
        </p>

        <div className={styles.cardSection}>
          {sections.map((section, index) => (
            <div
              key={index}
              className={`${styles.card} ${styles.reveal}`}
              ref={(el) => {
                if (el) sectionsRef.current[index] = el;
              }}
            >
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </div>
          ))}
        </div>
      </main>
        <p className={styles.disclaimer}>
          Ao continuar utilizando o ClickBuy, você declara estar ciente e de acordo com os nossos Política de Privacidade.
        </p>

        <p className={styles.copyright}>© 2025 ClickBuy. Todos os direitos reservados.</p>
      <Footer />

    </div>
  );
};

export default PrivacyPolicy;
