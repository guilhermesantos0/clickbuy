import { View, Text } from 'react-native'
import React from 'react'
import { User } from '../../../types/User';
import styles from '@/components/clickbuy/Header'
interface Props {
    user?: User
}
const Header: React.FC<Props> = ({ user }) => {
  return (
    <View>
      <Text>Header</Text>
    </View>
  )
}

export default Header