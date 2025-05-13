import React, { useEffect, useRef } from 'react';
import styles from '../css/Garantia.module.scss';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useUser } from 'contexts/UserContext';

import ShieldIcon from '../../../assets/shield.png';
import ExchangeIcon from '../../../assets/exchange.png';
import CostumerServiceIcon from '../../../assets/customer-service.png';
import PoliceManIcon from '../../../assets/policeman.png';
import HighQualityIcon from '../../../assets/high-quality.png';
import TrackingIcon from '../../../assets/tracking.png';


const Garantia: React.FC = () => {
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

  const garantiaData = [
    {
      title: 'Garantia Estendida',
      text: 'Todos os produtos possuem garantia adicional contra defeitos de fabricação.',
      icon: ShieldIcon,
    },
    {
      title: 'Devolução Facilitada',
      text: 'Caso algo não esteja conforme, você pode devolver sem burocracia.',
      icon: ExchangeIcon,
    },
    {
      title: 'Suporte Dedicado',
      text: 'Nossa equipe está pronta para te ajudar em qualquer etapa da sua compra.',
      icon: CostumerServiceIcon,
    },
    {
      title: 'Segurança Total',
      text: 'Sua compra é protegida com criptografia e métodos de pagamento seguros.',
      icon: PoliceManIcon,
    },
    {
      title: 'Qualidade Comprovada',
      text: 'Selecionamos apenas produtos que passam por rigorosos testes de qualidade.',
      icon: HighQualityIcon,
    },
    {
      title: 'Rastreamento Online',
      text: 'Acompanhe cada etapa da entrega com nosso sistema de rastreio integrado.',
      icon: TrackingIcon,
    },
  ];

  return (
    <div className={styles.page}>
      <Header user={user} />

      <main className={styles.content}>
        <h1>Garantia ClickBuy</h1>
        <p className={styles.intro}>
          Aqui na ClickBuy, sua satisfação é prioridade. Por isso, criamos uma política de garantia transparente,
          confiável e focada em você. Confira nossos pilares:
        </p>

        <div className={styles.cardGrid}>
          {garantiaData.map((item, index) => (
            <div
              key={index}
              className={`${styles.card} ${styles.reveal}`}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            >
              <div className={styles.iconContainer}>
                <img src={item.icon} alt={`Ícone de ${item.title}`} />
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

export default Garantia;
