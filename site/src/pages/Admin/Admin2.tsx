import React, { useEffect, useState } from "react";
import styles from "./Admin2.module.scss";

import AdminProduct from "./components/AdminProduct";
import AdminUser from "./components/AdminUser";
import AdminCategory from "./components/AdminCategory";
import AdminFavourites from "./components/AdminFavourites";

const Admin2 = () => {
  const [section, setSection] = useState<"products" | "users" | "categories" | "favourites">("products");

  useEffect(() => {
    document.title = 'Click Buy - Admin';
  },[])

  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>AdminPanel</h2>
        <nav className={styles.nav}>
          <button
            className={`${styles.navItem} ${section === "products" ? styles.active : ""}`}
            onClick={() => setSection("products")}
          >
            Produtos
          </button>
          <button
            className={`${styles.navItem} ${section === "users" ? styles.active : ""}`}
            onClick={() => setSection("users")}
          >
            Usuários
          </button>
          <button
            className={`${styles.navItem} ${section === "categories" ? styles.active : ""}`}
            onClick={() => setSection("categories")}
          >
            Categorias
          </button>
          <button 
            className={`${styles.navItem} ${section === "favourites" ? styles.active : ""}`}
            onClick={() => setSection("favourites")}
          >
            Favoritos
          </button>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        {section === "products" && <AdminProduct />}
        {section === "users" && <AdminUser />}
        {section === "categories" && <AdminCategory />}
        {section === "favourites" && <AdminFavourites />}
      </main>
    </div>
  );
};

export default Admin2;
