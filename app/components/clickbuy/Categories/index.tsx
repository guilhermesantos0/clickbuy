import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../Categories/styles'
import { router } from 'expo-router';
import { Category } from '@/types/Category';
import ip from '@/ip';

const eletronics = require('@/assets/ClickBuy/eletronicosImg.png');
const beauty = require('@/assets/ClickBuy/belezaImg.png');
const kitchen = require('@/assets/ClickBuy/cozinhaImg.png');
const decorations = require('@/assets/ClickBuy/decoracaoImg.png');
const fashion = require('@/assets/ClickBuy/modaImg.png');
const paper = require('@/assets/ClickBuy/papelariaImg.png');
const pets = require('@/assets/ClickBuy/petsImg.png');

interface Props {
}

const Categories: React.FC<Props> = () => {
    const images = [
      eletronics,
      kitchen,
      fashion,
      decorations,
      beauty,
      pets,
      paper,
    ];
   const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${ip}:5000/categories`);

        const categoriesData = await response.json();

        setCategories(categoriesData);
      } catch (error) {
        console.error('Erro ao buscar categorias', error)
      }
    }

    fetchData();
  }, [])
  return (
    <View style={styles.Container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {categories.map((cat, index) => (
          <TouchableOpacity key={index} style={styles.Botao} onPress={() => router.push(`/category?categoria=${cat.name}`)}>
            <Image style={styles.SliderImage} source={images[index]} />
            <Text>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default Categories
