import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Product from '@/components/clickbuy/ProductList/Product/index'
import styles from '@/components/clickbuy/OrdersList/styles'
import { Product as ProductModel } from '@/types/Product';
import ip from '@/ip'
import Order from './Order';


interface Props {
    products: ProductModel[]
}


const OrdersList: React.FC<Props> = ({ products }) => {

  return (
    <View style={styles.Container}>
        {products.map((_, index) => {
            if (index % 2 !== 0) return null; 

            const pairIndex = index / 2;
            const isEvenPair = pairIndex % 2 === 0;

            return (
                <View
                    key={index}
                    style={[
                        styles.Duplas,
                        { backgroundColor: 'white'}
                    ]}
                >
                    <Order product={products[index]} />
                    {products[index + 1] && <Order product={products[index + 1]} />}
                </View>
            );
        })}


        
    </View>
  )
}

export default OrdersList