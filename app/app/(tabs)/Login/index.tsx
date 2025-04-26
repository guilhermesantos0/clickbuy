import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, Button } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import styles from '@/app/(tabs)/Login/styles'

const Login = () => {
  const handleLogin = async () => {
    try {
        const response = await fetch("http://localhost:5000/login", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                email, 
                password
            })
        })

        const result = await response.json();

        if(response.ok) {
            alert("Login realizado com sucesso!");
            console.log("Usuário logado: ", result.user)
            router.push('/')
        } else {
            alert(result.message || "Erro ao fazer login")
        }
    } catch (error) {
        alert("Erro de conexão com o servidor.");
        console.error("Login error:", error)
    }
  }
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  return (
    <View style ={styles.Container}>
      <View style = {styles.Form}>
        <Text style ={styles.Title}>Entre para comprar!</Text>
        <View style={styles.InputContainer}>
          <Text style={styles.Texto}>Email</Text>
          <TextInput
            style={[styles.Input, isFocused && styles.InputFocused]}
            value={email}
            onChangeText={text => setEmail(text)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
          />
        </View>
        <View style={styles.InputContainer}>
          <Text style={styles.Texto} >Senha</Text>
            <TextInput
              style={[styles.Input, isFocused && styles.InputFocused]}
              value={password}
              onChangeText={text => setPassword(text)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoCapitalize="none"
              placeholder="Digite sua senha"
              secureTextEntry
            />
        </View>
        <TouchableOpacity onPress={() => router.push('/Login') }>
          <Text style={styles.Recovery}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ButtonsArea}>
        <TouchableOpacity
          style={styles.Login}
          onPress={() => handleLogin()}>
          <Text style={styles.ButtonText}>ENTRAR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.SignUP}
          onPress={() => router.push('../Cadastro') }>
          <Text style={styles.ButtonText2}>CADASTRE-SE</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login