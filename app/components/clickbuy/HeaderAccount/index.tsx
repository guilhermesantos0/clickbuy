import { View, Image, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '@/components/clickbuy/HeaderAccount/styles'
import { User } from '@/types/User'
import { useUser } from '@/contexts/UserContext';
import ip from '@/ip';
const genericPhoto = require('@/assets/ClickBuy/iconeGenerico.png');
interface Props {
    user: User,
}
const HeaderAccount: React.FC<Props> = ({user}) => {
  const [profileImage, setProfileImage] = useState(
      user.profilePic ? `http://${ip}:5000${user?.profilePic}` : genericPhoto
    );
    useEffect(() => {
    setProfileImage(user.profilePic ? user.profilePic : genericPhoto)
  }, [user.profilePic])
  return (
    <View style={styles.Container}>
      <View style={styles.ImageContainer}>
        <Image
          style={styles.Image}
          source={typeof profileImage === 'string' ? { uri: profileImage } : profileImage}
        />
        <Text style={styles.Name} numberOfLines={2}>{user.personalData.name}</Text>
      </View>
    </View>
  )
}

export default HeaderAccount