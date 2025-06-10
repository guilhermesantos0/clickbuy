import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import firstStep from '@/app/styles/Cadastro/firstStep'
import SecondStep from '@/app/styles/Cadastro/secondStep'
import thirdStep from '@/app/styles/Cadastro/thirdStep'
import fourthStep from '@/app/styles/Cadastro/fourthStep'
import styles from '@/app/styles/Cadastro/styles'
import { useRouter } from 'expo-router'
import { formatPhoneNumber, formatCPF, formatCEP, formatDate } from '@/utils/formatters';
import ip from '@/ip'
import Toast from 'react-native-toast-message'
import api from '@/services/api'
import { useUser } from '@/contexts/UserContext'
import Checkbox from 'expo-checkbox';

const Cadastro = () => {
  const {user, setUser} = useUser();
  const router = useRouter();
  const [disabledInput, setDisabledInput] = useState(false);
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        personalData: {
            name: "",
            bornDate: "",
            cpf: "",
            phone: "",
            address: { 
                road: "",
                number: "",
                city: "",
                state: "",
                zip: "",
                complement: "",
                neighborhood: ""
            }
        }
    })
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState([false, ""]);    
  const [validPassword, setValidPassword] = useState(true)
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleCheckEmail = async () => {
        
        try {
            const response = await api.get(`/checkEmail?email=${formData.email}`);

            if(response.status == 200) {
                nextStep();
            } else {
                setError([true, "Email já cadastrado"])
            }
        } catch (error) {
            setError([true, "Email já cadastrado"])
        }
    }
  const handleCheckPassword = (value: string) => {
    if(formData.password === value ) {
        setValidPassword(true)
    }else{
        setValidPassword(false)
    }
  }
  const handleConfirmPassword = () => {
    if(formData.password === "" || confirmPassword === ""){
      Toast.show({
                              type: 'error',
                              text1: 'Preencha todos os campos',
                            });
    }else{
      if(validPassword){
        nextStep();
      }else {
          setError([true, "As senhas não coincidem"])
      }
    }
  }
  
  const nextStep = () => {
    setError([false, ""])
    setStep(prev => prev + 1)
  }
  const nextStep2 = () => {
    if(formData.personalData.bornDate === "" || formData.personalData.cpf === "" || formData.personalData.name === "" || formData.personalData.phone === "" ){
      Toast.show({
                              type: 'error',
                              text1: 'Preencha todos os campos',
                            });
    }else{
      setError([false, ""])
      setStep(prev => prev + 1)
    }
  }
  const prevStep = () => {
      setError([false, ""])
      setStep(prev => prev - 1)
    }
  const resetAddress = () => {
      setFormData((prev) => ({
          ...prev,
          personalData: {
              ...prev.personalData,
              address: {
                ...prev.personalData.address,
                road: '',
                neighborhood: '',
                city: '',
                state: '',
              },
          }
      }));
      setDisabledInput(false)
  }
  const handleCepSearch = async (value: string) => {
    const cep = value.replace(/\D/g, "");
    if(cep.length !== 8) {
        resetAddress();
        return
    }

    try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json`);
        console.log(`https://viacep.com.br/ws/${cep}/json`)
        const data = await res.json();

        if(data.erro) {
            resetAddress()
            console.log('cep nao encontrado');
            return
        }

        setFormData((prev) => ({
            ...prev,
            personalData: {
                ...prev.personalData,
                address: {
                  ...prev.personalData.address,
                  road: data.logradouro || '',
                  neighborhood: data.bairro || '',
                  city: data.localidade || '',
                  state: data.uf ||'',
                },
            }
        }));
        setDisabledInput(true)
    } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
    }
  }
  const handleSignUp = async () => {
        const userPayload = {
            email: formData.email,
            password: formData.password,
            personalData: {
              name: formData.personalData.name,
              bornDate: formData.personalData.bornDate,
              cpf: formData.personalData.cpf,
              phone: formData.personalData.phone,
              address: {
                road: formData.personalData.address.road,
                number: formData.personalData.address.number,
                city: formData.personalData.address.city,
                state: formData.personalData.address.state,
                zip: formData.personalData.address.zip,
                complement: formData.personalData.address.complement || "",
                neighborhood: formData.personalData.address.neighborhood
              }
            }
        };

        try {

            const response = await api.post('/user', userPayload)            

            const result = await response.data;

            if(response.status == 200) {
                Toast.show({
                                type: 'success',
                                text1: 'Usuário criado com sucesso!',
                              });
                setUser(result.user);
                router.push('/(tabs)')
                
            }else {
                Toast.show({
                                type: 'error',
                                text1: 'Houve um erro ao criar usuário!',
                              });
                console.error(result)
            }

        }catch (error) {
            alert("Erro ao conectar com o servidor.");
            console.error("Erro:", error)
        }
    }
  return (
    <View style = {styles.Container}>
      <View style = {styles.Form}>
        <Text style = {styles.Title}>Crie sua conta!</Text>
        {
          step === 1 && (
            <View style = {firstStep.InputContainer}>
              <Text style={firstStep.text}>Email</Text>
              {error[0] && (<Text style={styles.Error}>{error[1]}</Text>)}
              <View style= {firstStep.InputArea}>
                <TextInput
                  style={[firstStep.Input]}
                  value={formData.email}
                  onChangeText={text => setFormData(prev => ({ ...prev, email: text }))}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="Digite seu e-mail"
                />
                <View style={firstStep.ButtonsArea}>
                  <TouchableOpacity
                    style={firstStep.Next}
                    onPress={() => handleCheckEmail()}>
                    <Text style ={firstStep.buttomText}>Próximo</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        }
        {
          step === 2 && (
            <View style={SecondStep.InputContainer}>
              <View style={SecondStep.InputArea}>
                <View style ={SecondStep.InputGroup}>
                <Text style={SecondStep.text}>Senha</Text>
                  <TextInput
                    style={[SecondStep.Input]}
                    value={formData.password}
                    onChangeText={text => setFormData(prev => ({ ...prev, password: text }))}
                    autoCapitalize="none"
                    placeholder="Digite sua senha"
                    secureTextEntry
                  />
                </View>
                <View style ={SecondStep.InputGroup}>
                <Text style={SecondStep.text}>Confirme sua senha</Text>
                  <TextInput
                    style={[SecondStep.Input, !validPassword && SecondStep.InvalidPassword]}
                    value={confirmPassword}
                    onChangeText={(e) => {
                      setConfirmPassword(e); 
                      handleCheckPassword(e);
                    }}
                    autoCapitalize="none"
                    placeholder="Confirme sua senha"
                    secureTextEntry
                  />
                </View>
                {error[0] && (<Text style={styles.Error}>{error[1]}</Text>)}
              </View>
              <View style ={SecondStep.ButtonsArea}>
                  <TouchableOpacity
                    style={SecondStep.Next}
                    onPress={() => prevStep()}>
                    <Text style ={SecondStep.buttomText}>Voltar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={SecondStep.Next}
                    onPress={handleConfirmPassword}>
                    <Text style ={SecondStep.buttomText}>Próximo</Text>
                  </TouchableOpacity>
                </View>
            </View>
          )
        }
        {
          step === 3 && (
            <View style ={thirdStep.InputContainer}>
              <View style ={thirdStep.InputArea}>
              <ScrollView style={fourthStep.Scroll} contentContainerStyle={{ flexGrow: 1 }}>
                <View style ={fourthStep.InputGroup}>
                  <Text style ={fourthStep.text}>Nome</Text>
                  <TextInput
                    style={[fourthStep.Input]}
                    value={formData.personalData.name}
                    onChangeText={text => setFormData(prev => ({
                      ...prev, personalData:{
                        ...prev.personalData,
                        name:text
                      }
                    }))}
                    keyboardType='default'
                    autoCapitalize="none"
                    placeholder="Digite seu nome completo"
                  />
                </View>
                <View style ={fourthStep.InputGroup}>
                  <Text style ={fourthStep.text}>CPF</Text>
                  <TextInput
                    style={[fourthStep.Input]}
                    value={formData.personalData.cpf}
                    onChangeText={text => setFormData(prev => ({
                      ...prev, personalData:{
                        ...prev.personalData,
                        cpf:formatCPF(text)
                      }
                    }))}
                    keyboardType='default'
                    autoCapitalize="none"
                    placeholder="Digite seu CPF"
                  />
                </View>
                
                <View style ={fourthStep.InputGroup}>
                  <Text style ={fourthStep.text}>Telefone</Text>
                  <TextInput
                    style={[fourthStep.Input]}
                    value={formData.personalData.phone}
                    onChangeText={text => setFormData(prev => ({
                      ...prev, personalData:{
                        ...prev.personalData,
                        phone:formatPhoneNumber(text)
                      }
                    }))}
                    keyboardType='phone-pad'
                    autoCapitalize="none"
                    placeholder="Digite seu número de telefone"
                  />
                </View>
                <View style ={fourthStep.InputGroup}>
                  <Text style ={fourthStep.text}>Data de nascimento</Text>
                  <TextInput
                    style={[fourthStep.Input]}
                    value={formData.personalData.bornDate}
                    onChangeText={text => setFormData(prev => ({
                      ...prev, personalData:{
                        ...prev.personalData,
                        bornDate:formatDate(text)
                      }
                    }))}
                    keyboardType='decimal-pad'
                    autoCapitalize="none"
                    placeholder="Digite sua data de nascimento"
                  />
                </View>
                </ScrollView>
              </View>
              <View style ={SecondStep.ButtonsArea}>
                  <TouchableOpacity
                    style={SecondStep.Next}
                    onPress={() => prevStep()}>
                    <Text style ={SecondStep.buttomText}>Voltar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={SecondStep.Next}
                    onPress={nextStep2}>
                    <Text style ={SecondStep.buttomText}>Próximo</Text>
                  </TouchableOpacity>
                </View>
            </View>
          )
        }
        {
          step === 4 &&(
            <View style={fourthStep.InputContainer}>
              <View style={fourthStep.InputArea}>
              <ScrollView style={fourthStep.Scroll} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={fourthStep.InputGroup}>
                  <Text style ={thirdStep.text}>Rua</Text>
                  <TextInput
                    style={[fourthStep.Input,]}
                    value={formData.personalData.address.road}
                    onChangeText={text => setFormData(prev => ({
                      ...prev, personalData:{
                        ...prev.personalData,
                        address:{
                          ...prev.personalData.address,
                          road:text
                        }
                      }
                    }))}
                    keyboardType='default'
                    autoCapitalize="none"
                    placeholder="Digite o nome da sua rua"
                    editable={!disabledInput}
                  />
                </View>
                <View style={fourthStep.InputGroup}>
                  <Text style ={thirdStep.text}>Número</Text>
                  <TextInput
                    style={[fourthStep.Input]}
                    value={formData.personalData.address.number}
                    onChangeText={text => setFormData(prev => ({
                      ...prev, personalData:{
                        ...prev.personalData,
                        address:{
                          ...prev.personalData.address,
                          number:text
                        }
                      }
                    }))}
                    keyboardType= 'decimal-pad'
                    autoCapitalize="none"
                    placeholder="Digite o número"
                  />
                </View>
                <View style={fourthStep.InputGroup}>
                  <Text style ={thirdStep.text}>Complemento</Text>
                  <TextInput
                    style={[fourthStep.Input]}
                    value={formData.personalData.address.complement}
                    onChangeText={text => setFormData(prev => ({
                      ...prev, personalData:{
                        ...prev.personalData,
                        address:{
                          ...prev.personalData.address,
                          complement:text
                        }
                      }
                    }))}
                    keyboardType='default'
                    autoCapitalize="none"
                    placeholder="Digite o complemento(opcional)"
                  />
                </View>
                <View style={fourthStep.InputGroup}>
                  <Text style ={thirdStep.text}>CEP</Text>
                  <TextInput
                    style={[fourthStep.Input]}
                    value={formData.personalData.address.zip}
                    onChangeText={(text) => {
                      setFormData(prev => ({
                        ...prev,
                        personalData: {
                          ...prev.personalData,
                          address: {
                            ...prev.personalData.address,
                            zip: formatCEP(text)
                          }
                        }
                      }));
                      handleCepSearch(text);
                    }}
                    keyboardType= 'decimal-pad'
                    autoCapitalize="none"
                    placeholder="Digite o seu CEP"
                  />
                </View>
                <View style={fourthStep.InputGroup}>
                  <Text style ={thirdStep.text}>Bairro</Text>
                  <TextInput
                    style={[fourthStep.Input]}
                    value={formData.personalData.address.neighborhood}
                    onChangeText={text => setFormData(prev => ({
                      ...prev, personalData:{
                        ...prev.personalData,
                        address:{
                          ...prev.personalData.address,
                          neighborhood:text
                        }
                      }
                    }))}
                    keyboardType='default'
                    autoCapitalize="none"
                    placeholder="Digite o seu bairro"
                    editable={!disabledInput}
                  />
                </View>
                <View style={fourthStep.InputGroup}>
                  <Text style ={thirdStep.text}>Cidade</Text>
                  <TextInput
                    style={[fourthStep.Input]}
                    value={formData.personalData.address.city}
                    onChangeText={text => setFormData(prev => ({
                      ...prev, personalData:{
                        ...prev.personalData,
                        address:{
                          ...prev.personalData.address,
                          city:text
                        }
                      }
                    }))}
                    keyboardType='default'
                    autoCapitalize="none"
                    placeholder="Digite o nome da sua cidade"
                    editable={!disabledInput}
                  />
                </View>
                <View style={fourthStep.InputGroup}>
                  <Text style ={thirdStep.text}>Estado</Text>
                  <TextInput
                    style={[fourthStep.Input]}
                    value={formData.personalData.address.state}
                    onChangeText={text => setFormData(prev => ({
                      ...prev, personalData:{
                        ...prev.personalData,
                        address:{
                          ...prev.personalData.address,
                          state:text
                        }
                      }
                    }))}
                    keyboardType='default'
                    autoCapitalize="none"
                    placeholder="Digite o nome do seu Estado"
                    editable={!disabledInput}
                  />
                </View>
                </ScrollView>
                <View style={fourthStep.InputGroup}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                    <Checkbox
                      value={acceptedTerms}
                      onValueChange={setAcceptedTerms}
                      color={'#DDA04B'}
                    />
                    <TouchableOpacity onPress={() => router.push('/termos')}>
                      <Text style={{ marginLeft: 8, fontSize: 18, borderBottomWidth: 1, borderBottomColor: "Black" }}>Aceito os termos e condições</Text>
                    </TouchableOpacity>
                  </View>
                  <View style ={fourthStep.ButtonsArea}>
                      <TouchableOpacity
                        style={fourthStep.Next}
                        onPress={() => prevStep()}>
                        <Text style ={SecondStep.buttomText}>Voltar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={fourthStep.Next}
                        onPress={() => {
                          if (acceptedTerms === true && formData.personalData.address.city != "" && formData.personalData.address.state != ""
                            && formData.personalData.address.neighborhood != "" && formData.personalData.address.number != "" && formData.personalData.address.road != ""
                            && formData.personalData.address.zip != ""
                          ){
                            handleSignUp()
                          }else{
                            Toast.show({
                                        type: 'error',
                                        text1: `Preencha todos os campos para continuar!`,
                                      });
                          }
                        }}>
                        <Text style ={SecondStep.buttomText}>Próximo</Text>
                      </TouchableOpacity>
                    </View>
                </View>
              </View>
            </View>
          )
        }
        <TouchableOpacity onPress={() => router.push('/(tabs)/login') }>
          <Text style={styles.Recovery}>Já tenho uma conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Cadastro
