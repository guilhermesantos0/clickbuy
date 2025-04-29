import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, Button } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/UserContext';
import Toast from 'react-native-toast-message';
const Login = () => {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const router = useRouter();

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
          Toast.show({
            type: 'success',
            text1: 'Login realizado com sucesso!',
          });

            setUser( {
                _id: result.user._id,
                name: result.user.name,
                email: result.user.email,
                profilePic: result.user.profilePic || ""
            })
            router.push('/(tabs)')
        } else {
            Toast.show({
              type: 'error',
              text1: result.message,
            });
        }
    } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Erro de conexão com o servidor',
        });
    }
}
  const [isFocused, setIsFocused] = useState(false);
  
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
        <TouchableOpacity onPress={() => router.push('/(tabs)/login') }>
          <Text style={styles.Recovery}>Esqueci minha senha</Text>
        </TouchableOpacity>
        <View style={styles.ButtonsArea}>
        <TouchableOpacity
            style={styles.Login}
            onPress={handleLogin}>
            <Text style={styles.ButtonText}>ENTRAR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.SignUP}
            onPress={() => router.push('../cadastro') }>
            <Text style={styles.ButtonText2}>CADASTRE-SE</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop:80,
    width: '80%',
    height: '100%',

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
    backgroundColor: 'rgb(224, 224, 224)',
    paddingLeft:8,
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
    paddingBottom: 0,
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
    marginRight:25,
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