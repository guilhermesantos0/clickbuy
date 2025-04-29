import React, { useEffect, useState } from "react";
import styles from "./Slider.module.scss";

import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = [banner1, banner2, banner3];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.sliderContainer}>
      <button className={`${styles.navButton} ${styles.prev}`} onClick={prevSlide}>
        &#10094;
      </button>

      <div className={styles.slider}>
        <img
          src={banners[currentSlide]}
          alt={`Banner ${currentSlide + 1}`}
          className={styles.sliderImage}
        />
      </div>

      <button className={`${styles.navButton} ${styles.next}`} onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Slider;
