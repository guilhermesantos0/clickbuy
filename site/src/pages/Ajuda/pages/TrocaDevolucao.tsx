import React, { useEffect, useRef } from 'react';
import styles from '../css/TrocaDevolucao.module.scss';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useUser } from 'contexts/UserContext';

// import EasyReturnIcon from '../../../assets/easy-return.png';
// import FastProcessIcon from '../../../assets/fast-process.png';
// import RefundIcon from '../../../assets/refund.png';
// import NoCostIcon from '../../../assets/no-cost.png';
// import SupportIcon from '../../../assets/support.png';
// import ChecklistIcon from '../../../assets/checklist.png';

const TrocaDevolucao: React.FC = () => {
  const { user } = useUser();
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      cardsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const trocaData = [
    {
      title: 'Devolução Simplificada',
      text: 'Processo simples e rápido para devoluções, sem complicações.',
      // icon: EasyReturnIcon,
    },
    {
      title: 'Troca Ágil',
      text: 'Realize trocas com rapidez e sem burocracia.',
      // icon: FastProcessIcon,
    },
    {
      title: 'Reembolso Garantido',
      text: 'Valor devolvido integralmente em caso de insatisfação.',
      // icon: RefundIcon,
    },
    {
      title: 'Sem Custos Extras',
      text: 'A ClickBuy cobre os custos de envio da troca ou devolução.',
      // icon: NoCostIcon,
    },
    {
      title: 'Atendimento Personalizado',
      text: 'Equipe pronta para te ajudar em todas as etapas.',
      // icon: SupportIcon,
    },
    {
      title: 'Regras Claras',
      text: 'Política transparente para que você saiba exatamente seus direitos.',
      // icon: ChecklistIcon,
    },
  ];

  return (
    <div className={styles.page}>
      <Header user={user} />

      <main className={styles.content}>
        <h1>Troca e Devoluções ClickBuy</h1>
        <p className={styles.intro}>
          Prezamos por sua satisfação em cada etapa. Por isso, garantimos uma política de troca e devolução prática, justa
          e pensada especialmente para você. Veja como funciona:
        </p>

        <div className={styles.cardGrid}>
          {trocaData.map((item, index) => (
            <div
              key={index}
              className={`${styles.card} ${styles.reveal}`}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            >
              <div className={styles.iconContainer}>
                {/* <img src={item.icon} alt={`Ícone ${item.title}`} /> */}
              </div>

              <div className={styles.textContent}>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrocaDevolucao;
