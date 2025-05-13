import React from 'react';
import styles from '../css/AboutUs.module.scss';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

import { useUser } from 'contexts/UserContext';

const AboutUs: React.FC = () => {
  const { user } = useUser();

  return (
    <div className={styles.aboutUsPage}>
      <Header user={user} />

      <main className={styles.content}>
        <h1>Sobre Nós</h1>
        <p>
          Este site foi desenvolvido como parte do Projeto Integrador Disciplinar do curso de
          Ciência da Computação no Instituto Mauá de Tecnologia. Nosso objetivo é aplicar os
          conhecimentos adquiridos ao longo do curso em um projeto prático e funcional,
          utilizando tecnologias modernas e seguindo boas práticas de desenvolvimento.
        </p>

        <p>
          O projeto consiste em um e-commerce fictício, onde exploramos o desenvolvimento de
          interfaces intuitivas com React, estilização modular com SCSS e organização de
          componentes reutilizáveis. Essa experiência permite aos alunos vivenciarem o ciclo
          completo de desenvolvimento de software, desde a concepção até a entrega.
        </p>

        <p>
          Além da parte técnica, focamos na experiência do usuário (UX) e na performance do site,
          buscando simular ao máximo um ambiente profissional de desenvolvimento full stack. Essa
          vivência também nos proporcionou o trabalho em equipe, versionamento de código com Git e
          integração contínua.
        </p>

        <p>
          Agradecemos ao Instituto Mauá de Tecnologia pela oportunidade e suporte neste desafio
          enriquecedor. Este projeto representa não apenas nosso crescimento técnico, mas também
          pessoal e colaborativo dentro da área de tecnologia.
        </p>

      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
