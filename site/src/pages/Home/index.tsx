// src/pages/Home/index.tsx
import React from "react";
import Header from "../../components/Header";
import Slider from "../../components/Slider";
import Categorias from "../../components/Categorias";
import "./css.scss"; // ou Home.module.scss se preferir
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <div>
      <Header account={{}} />

      <div className="Slider">
        <Slider/>
      </div>

      <div className="categorias">
        <Categorias />
      </div>

      <div className="footer">
        <Footer />
      </div>
      
    </div>
  );
};

export default Home;
