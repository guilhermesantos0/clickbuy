import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../Slider/styles'
const banner1 = require('@/assets/ClickBuy/banner_1.png');
const banner2 = require('@/assets/ClickBuy/banner_2.png');
const banner3 = require('@/assets/ClickBuy/banner3.jpg');
interface Props {
}
const Slider: React.FC<Props> = () => {
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
    <View style={styles.SliderContainer}>
      <TouchableOpacity style={[styles.navButton, styles.Prev]} onPress={prevSlide}>
        <Text style={styles.arrow}>&#10094;</Text>
      </TouchableOpacity>
      <Image
        source={banners[currentSlide]}
        style={styles.SliderImage}
        resizeMode="cover"
      />
      <TouchableOpacity style={[styles.navButton, styles.Next]} onPress={nextSlide}>
        <Text style={styles.arrow}>&#10095;</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Slider