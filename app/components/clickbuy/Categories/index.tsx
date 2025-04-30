import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from '../Categories/styles'

const eletronics = require('@/assets/ClickBuy/eletronicosImg.png');
const beauty = require('@/assets/ClickBuy/belezaImg.png');
const kitchen = require('@/assets/ClickBuy/cozinhaImg.png');
const decorations = require('@/assets/ClickBuy/decoracaoImg.png');
const fashion = require('@/assets/ClickBuy/modaImg.png');
const paper = require('@/assets/ClickBuy/papelariaImg.png');
const pets = require('@/assets/ClickBuy/petsImg.png');

const Categories = () => {
  return (
    <View style={styles.Container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.Botao} onPress={() => console.log('Eletrônicos')}>
          <Image style={styles.SliderImage} source={eletronics} />
          <Text>Eletrônicos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Botao} onPress={() => console.log('Beleza')}>
          <Image style={styles.SliderImage} source={beauty} />
          <Text>Beleza</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Botao} onPress={() => console.log('Cozinha')}>
          <Image style={styles.SliderImage} source={kitchen} />
          <Text>Cozinha</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Botao} onPress={() => console.log('Decoração')}>
          <Image style={styles.SliderImage} source={decorations} />
          <Text>Decoração</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Botao} onPress={() => console.log('Moda')}>
          <Image style={styles.SliderImage} source={fashion} />
          <Text>Moda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Botao} onPress={() => console.log('Papelaria')}>
          <Image style={styles.SliderImage} source={paper} />
          <Text>Papelaria</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Botao} onPress={() => console.log('Pets')}>
          <Image style={styles.SliderImage} source={pets} />
          <Text>Pets</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default Categories
