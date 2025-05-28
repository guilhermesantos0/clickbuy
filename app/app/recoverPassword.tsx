import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import api from '@/services/api';
import styles from './styles/RecoverPassword/styles';
import Toast from 'react-native-toast-message';

const recoverPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageStatus, setMessageStatus] = useState("");

    const handleSubmit = async () => {
        if( email === ""){
            Toast.show({
                            type: 'error',
                            text1: "Digite o seu email",
                          });
        }else{
            setLoading(true);
            setMessage("");

            try {
                const res = await api.post('/user/recovery', { email });
                console.log(res)
                setTimeout(() => {
                    setLoading(false);
                    if(res.status === 200) {
                        setMessage("📧 Um link de recuperação foi enviado para seu e-mail!");
                        setMessageStatus('approved');
                    } else {
                        setMessage("❌ Ocorreu um erro. Verifique o e-mail digitado!");
                        setMessageStatus('denied');
                    }
                }, 1500);
            } catch (error) {
                console.error(error);
                setMessage("❌ Ocorreu um erro. Verifique o e-mail digitado.");
                setLoading(false);
            }
        }
    };
  return (
    <View style={styles.Container}>
      <View style={styles.myOrdersContainer}>
        <Text style={styles.Title}>Recuperar Senha</Text>
        <Text style={styles.Text}>{"Digite o e-mail cadastrado na sua conta.\n Enviaremos um link para redefinir sua senha."}</Text>
        <TextInput
              style={[styles.Input]}
              value={email}
              onChangeText={text => setEmail(text)}
              autoCapitalize="none"
              placeholder="seuemail@exemplo.com"
              keyboardType='email-address'
            />
        <TouchableOpacity style={styles.Button} onPress={handleSubmit}>
              <Text style={styles.ButtonText}> {loading ? "Enviando..." : "Enviar link de recuperação"}</Text>
        </TouchableOpacity>
        <Text style={messageStatus === "approved" ? styles.Success : styles.Error}>{message}</Text>
      </View>
    </View>
  )
}

export default recoverPassword