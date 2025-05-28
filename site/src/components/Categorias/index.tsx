import React, { useEffect, useState } from "react";
import styles from "./Categorias.module.scss";

import { Category } from "@modules/Category";
import { Link } from "react-router-dom";
import api from "services/api";

const Categorias: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/categories');
        const categoriesData = await response.data;

        setCategories(categoriesData);
      } catch (error) {
        console.error('Erro ao buscar categorias', error)
      }
    }

    fetchData();
  }, [])

  return (
    <div className={styles.categoriasContainer}>
      {categories.map((cat) => (
        <Link to={`/${cat.name}`} className={styles.categoriaItem} key={cat._id}>
          <img
            src={`${cat.icon}`}
            alt={cat.name}
            className={styles.categoriaIcon}
          />
          <span>{cat.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Categorias;
