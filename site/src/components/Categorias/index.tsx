import React from "react";
import styles from "./Categorias.module.scss";


import eletronicosImg from "../../assets/eletronicosImg.svg";
import cozinhaImg from "../../assets/cozinhaImg.svg";
import modaImg from "../../assets/modaImg.svg";
import decoracaoImg from "../../assets/decoracaoImg.svg";
import belezaImg from "../../assets/belezaImg.svg";
import petsImg from "../../assets/petsImg.svg";
import papelariaImg from "../../assets/papelariaImg.svg";

const categorias = [
  { nome: "Eletrônicos", icon: eletronicosImg },
  { nome: "Cozinha", icon: cozinhaImg },
  { nome: "Moda", icon: modaImg },
  { nome: "Decoração", icon: decoracaoImg },
  { nome: "Beleza", icon: belezaImg },
  { nome: "Pets", icon: petsImg },
  { nome: "Papelaria", icon: papelariaImg },
];

const Categorias: React.FC = () => {
  return (
    <div className={styles.categoriasContainer}>
      {categorias.map((cat, idx) => (
        <button className={styles.categoriaItem} key={idx}>
          <img
            src={cat.icon}
            alt={cat.nome}
            className={styles.categoriaIcon}
          />
          <span>{cat.nome}</span>
        </button>
      ))}
    </div>
  );
};

export default Categorias;
