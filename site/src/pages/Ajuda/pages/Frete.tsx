import React, { useEffect, useRef } from 'react';
import styles from '../css/Frete.module.scss';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useUser } from 'contexts/UserContext';

import DeliveryMan from '../../../assets/delivery-man.png';
import Free from '../../../assets/free.png';
import Delivery from '../../../assets/delivery.png';
import Lorry from '../../../assets/lorry.png';
import Box from '../../../assets/box.png';
import Customer from '../../../assets/customer-service (1).png';

const Frete: React.FC = () => {
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

  const freteData = [
    {
      title: 'Envio Imediato',
      text: 'Todos os pedidos são processados e enviados em até 24h após a confirmação de pagamento.',
      icon: DeliveryMan,
    },
    {
      title: 'Frete Grátis',
      text: 'Oferecemos frete grátis para todo o Brasil em compras acima de R$150,00.',
      icon: Free,
    },
    {
      title: 'Rastreamento em Tempo Real',
      text: 'Acompanhe o status da sua entrega com atualizações em tempo real.',
      icon: Delivery,
    },
    {
      title: 'Parcerias com Transportadoras',
      text: 'Trabalhamos com as melhores transportadoras para garantir agilidade e segurança.',
      icon: Lorry,
    },
    {
      title: 'Embalagem Segura',
      text: 'Todos os produtos são embalados com materiais resistentes para evitar danos no transporte.',
      icon: Box,
    },
    {
      title: 'Atendimento Especializado',
      text: 'Nossa equipe está pronta para tirar dúvidas sobre prazos e modalidades de entrega.',
      icon: Customer,
    },
  ];

  return (
    <div className={styles.page}>
      <Header user={user} />

      <main className={styles.content}>
        <h1>Frete & Entregas ClickBuy</h1>
        <p className={styles.intro}>
          Na ClickBuy, garantimos uma experiência de entrega eficiente, segura e transparente. Confira os diferenciais que preparamos para você:
        </p>

        <div className={styles.cardGrid}>
          {freteData.map((item, index) => (
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

export default Frete;
