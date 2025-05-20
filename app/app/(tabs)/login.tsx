import { View, Text, StyleSheet, TextInput, TouchableOpacity,Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/UserContext';
import Toast from 'react-native-toast-message';
import ip from '@/ip'
import styles from '../styles/Login/styles';
import conta from '../styles/Login/conta';
import HeaderAccount from '@/components/clickbuy/HeaderAccount';
import { IconSymbol } from '@/components/ui/IconSymbol';
import fourthStep from '../styles/Cadastro/fourthStep';
import { getUserFavouriteProducts } from '@/services/favoriteService';
const Login = () => {
  const {user, setUser} = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const router = useRouter();

  const handleLogin = async () => {
        try {
            const response = await fetch(`http://${ip}:5000/login`, {
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
                setUser( result.user )
                router.push('/');
            } else {
                Toast.show({
                type: 'error',
                text1: result.message || 'Falha no login',
              });
            }
        } catch (error) {
            Toast.show({
            type: 'error',
            text1: `Erro de conexão com o servidor$`,
          });
          console.log(error)
        }
    }
  const handleLogout = () => {
        setUser( null )
        router.push('/');
        setEmail("")
        setPassword("")
    }

  
  
  return (
    user ? (
      <View>
        <ScrollView style={fourthStep.Scroll} contentContainerStyle={{ flexGrow: 1 }}>
          <HeaderAccount user={user}/>
          <View>
            <TouchableOpacity style={conta.Button} onPress={() => router.push('/editAccount')}>
              <View style={conta.Option}>
                <IconSymbol size={45} name='person.fill' color='rgb(101, 101, 101)' />
                <Text style={conta.Text}>Meu Perfil</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={conta.Button} onPress={() => router.push('/favorites')}>
              <View style={conta.Option}>
                <IconSymbol size={45} name='heart.fill' color='rgb(101, 101, 101)' />
                <Text style={conta.Text}>Favoritos</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={conta.Button} onPress={() => console.log('oi')}>
              <View style={conta.Option}>
                <IconSymbol size={45} name='basket.fill' color='rgb(101, 101, 101)' />
                <Text style={conta.Text}>Meus Pedidos</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={conta.Button} onPress={() => console.log('oi')}>
              <View style={conta.Option}>
                <IconSymbol size={45} name='cart.fill' color='rgb(101, 101, 101)' />
                <Text style={conta.Text}>Carrinho</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={conta.Button} onPress={() => router.push('/myProducts')}>
              <View style={conta.Option}>
                <IconSymbol size={45} name='tag.fill' color='rgb(101, 101, 101)' />
                <Text style={conta.Text}>Meus Produtos</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={conta.Button} onPress={() => console.log('oi')}>
              <View style={conta.Option}>
                <IconSymbol size={45} name='questionmark.circle.fill' color='rgb(101, 101, 101)' />
                <Text style={conta.Text}>Ajuda</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={conta.Button} onPress={() => console.log('oi')}>
              <View style={conta.Option}>
                <IconSymbol size={45} name='info.circle.fill' color='rgb(101, 101, 101)' />
                <Text style={conta.Text}>Sobre nós</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={conta.Button} onPress={handleLogout}>
              <View style={conta.Option}>
                <IconSymbol size={45} name='arrow.right.square' color='red' />
                <Text style={conta.TextExit}>Sair</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    ) : (
      <View style={styles.Container}>
        <View style={styles.Form}>
          <Text style={styles.Title}>Entre para comprar!</Text>

          <View style={styles.InputContainer}>
            <Text style={styles.Texto}>Email</Text>
            <TextInput
              style={[styles.Input]}
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Digite seu e-mail"
            />
          </View>

          <View style={styles.InputContainer}>
            <Text style={styles.Texto}>Senha</Text>
            <TextInput
              style={[styles.Input]}
              value={password}
              onChangeText={text => setPassword(text)}
              autoCapitalize="none"
              placeholder="Digite sua senha"
              secureTextEntry
            />
          </View>

          <TouchableOpacity onPress={() => router.push('/(tabs)/login')}>
            <Text style={styles.Recovery}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <View style={styles.ButtonsArea}>
            <TouchableOpacity style={styles.Login} onPress={handleLogin}>
              <Text style={styles.ButtonText}>ENTRAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.SignUP} onPress={() => router.push('../cadastro')}>
              <Text style={styles.ButtonText2}>CADASTRE-SE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  );

}

export default Login