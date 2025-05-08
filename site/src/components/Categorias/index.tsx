import React, { useEffect, useState } from "react";
import styles from "./Categorias.module.scss";

import { Category } from "@modules/Category";
import { Link } from "react-router-dom";

const Categorias: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/categories');

        const categoriesData = await response.json();

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
            src={`http://localhost:5000${cat.icon}`}
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
