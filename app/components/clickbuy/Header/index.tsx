import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from '@/components/clickbuy/Header/styles'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { router } from 'expo-router'
import { useUser } from '@/contexts/UserContext'

interface Props {}

const Header: React.FC<Props> = () => {
  const [search, setSearch] = useState("")
  const {user, setUser} = useUser();

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/searchPage?query=${search}`)
    }
  }

  return (
    <View style={styles.Container}>
      <View style={styles.InputContainer}>
        <View style={styles.InputWithIcon}>
          <IconSymbol size={20} name='magnifyingglass' color='gray' />
          <TextInput
            style={styles.Input}
            value={search}
            onChangeText={text => setSearch(text)}
            autoCapitalize="none"
            placeholder="Pesquisar"
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
        </View>
        <TouchableOpacity
          style={styles.Cart}
          onPress={() => {
            if (!user){
              router.push('/(tabs)/login')
            }else{
              router.push('/cart')
            }
          }}>
          <IconSymbol size={50} name='cart.fill' color='white' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Header
