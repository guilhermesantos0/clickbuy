import { View, Image, Text } from 'react-native'
import React, { useState } from 'react'
import styles from '@/components/clickbuy/HeaderAccount/styles'
import { User } from '@/types/User'
import { useUser } from '@/contexts/UserContext';
const genericPhoto = require('@/assets/ClickBuy/iconeGenerico.png');
interface Props {
    user: User,
}

const HeaderAccount: React.FC<Props> = ({user}) => {
  return (
    <View style={styles.Container}>
      <View style={styles.ImageContainer}>
        <Image style={styles.Image} source={user.profilePic ? { uri: user.profilePic } : genericPhoto }  />
        <Text style={styles.Name} numberOfLines={2}>{user.personalData.name}</Text>
      </View>
    </View>
  )
}

export default HeaderAccount