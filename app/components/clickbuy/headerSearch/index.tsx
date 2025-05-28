import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from '@/components/clickbuy/headerSearch/styles'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

interface Props {}

const HeaderSearch: React.FC<Props> = () => {
  const [search, setSearch] = useState("")

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/searchPage?query=${search}`)
    }
  }

  return (
    <View style={styles.Container}>
      <View style={styles.InputContainer}>
        <TouchableOpacity
          style={styles.Cart}
          onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={30} color='white'/>
        </TouchableOpacity>
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
      </View>
    </View>
  )
}

export default HeaderSearch
