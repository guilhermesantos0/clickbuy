import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, Button } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';

const Login = () => {
  const handleLogin = () => {
    router.push('/')
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
const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  Form:{
    width: '80%',
    height: '60%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '3%'
  },
  Title:{
    color:'#DDA04B',
    fontSize: 32
  },
  InputContainer:{
    paddingVertical: 10,
    width: '85%',

    display: 'flex',
    flexDirection: 'column',
  },
  Input:{
    height: 60,
    marginTop: 10,
    fontSize: 15,
    backgroundColor: 'rgb(188, 188, 188)',
    outline: 'none',
    borderWidth: 0,
    borderRadius: 10,
    paddingVertical: 0,
    paddingHorizontal: '1%',
  },
  InputFocused: {
    borderRadius: 5,
  },
  Texto: {
    fontSize: 20,
  },
  Recovery: {
    fontSize:20,
    paddingBottom: 50,
    color: 'black',
    textDecorationLine: 'underline',
  },
  ButtonsArea:{
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  Login: {
    backgroundColor: '#DDA04B',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  ButtonText: {
    color: 'white',
  },
  ButtonText2: {
    color: '#DDA04B',
  },
  SignUP: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DDA04B',
  },


});
export default Login