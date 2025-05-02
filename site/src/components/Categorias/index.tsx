import React, { useEffect, useState } from "react";
import styles from "./Categorias.module.scss";

interface Category {
  _id: number,
  name: string,
  icon: string
}

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
  })

  return (
    <div className={styles.categoriasContainer}>
      {categories.map((cat) => (
        <button className={styles.categoriaItem} key={cat._id}>
          <img
            src={`http://localhost:5000${cat.icon}`}
            alt={cat.name}
            className={styles.categoriaIcon}
          />
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
};

export default Categorias;
