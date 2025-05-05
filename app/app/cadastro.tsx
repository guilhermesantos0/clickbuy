import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import firstStep from '@/app/styles/Cadastro/firstStep'
import SecondStep from '@/app/styles/Cadastro/secondStep'
import thirdStep from '@/app/styles/Cadastro/thirdStep'
import fourthStep from '@/app/styles/Cadastro/fourthStep'
import styles from '@/app/styles/Cadastro/styles'
import { useRouter } from 'expo-router'
import ip from '@/ip'

const Cadastro = () => {
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
  const [error, setError] = useState([false, ""]);    
  const [validPassword, setValidPassword] = useState(true)
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleCheckEmail = async () => {
    const response = await fetch(`http://${ip}:5000/checkEmail?email=${formData.email}`);
    if(response.ok) {
        nextStep();
    }else {
        setError([true, "Email já cadastrado"])
    }
  }
  const handleCheckPassword = (value: string) => {
    if(formData.password === value) {
        setValidPassword(true)
    }else{
        setValidPassword(false)
    }
  }
  const handleConfirmPassword = () => {
    if(validPassword){
        nextStep();
    }else {
        setError([true, "As senhas não coincidem"])
    }
  }
  
  const nextStep = () => {
    setError([false, ""])
    setStep(prev => prev + 1)
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
      setDisabledInput(!disabledInput)
  }
  const handleCepSearch = async (value: string) => {
    const cep = value.replace(/\D/g, "");
    if(cep.length !== 8) {
        resetAddress();
        return
    }

    try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json`);
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
        const response = await fetch(`http://${ip}:5000/user`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(userPayload)
        })

        const result = await response.json();

        if(response.ok) {
            alert("Usuário cadastrado com sucesso!");
            console.log('Usuário:', result.user)
            router.push('/')
        }else {
            alert(`Erro: ${result.message}`);
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
                <TouchableOpacity
                    style={firstStep.Next}
                    onPress={() => handleCheckEmail()}>
                    <Text style ={firstStep.buttomText}>Próximo</Text>
                  </TouchableOpacity>
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
                <View style ={thirdStep.InputGroup}>
                  <Text style ={thirdStep.text}>Nome</Text>
                  <TextInput
                    style={[firstStep.Input]}
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
                <View style ={thirdStep.InputGroup}>
                  <Text style ={thirdStep.text}>CPF</Text>
                  <TextInput
                    style={[firstStep.Input]}
                    value={formData.personalData.cpf}
                    onChangeText={text => setFormData(prev => ({
                      ...prev, personalData:{
                        ...prev.personalData,
                        cpf:text
                      }
                    }))}
                    keyboardType='default'
                    autoCapitalize="none"
                    placeholder="Digite seu CPF"
                  />
                </View>
                <View style ={thirdStep.InputGroup}>
                  <Text style ={thirdStep.text}>Telefone</Text>
                  <TextInput
                    style={[firstStep.Input]}
                    value={formData.personalData.phone}
                    onChangeText={text => setFormData(prev => ({
                      ...prev, personalData:{
                        ...prev.personalData,
                        phone:text
                      }
                    }))}
                    keyboardType='phone-pad'
                    autoCapitalize="none"
                    placeholder="Digite seu número de telefone"
                  />
                </View>
                <View style ={thirdStep.InputGroup}>
                  <Text style ={thirdStep.text}>Data de nascimento</Text>
                  <TextInput
                    style={[firstStep.Input]}
                    value={formData.personalData.bornDate}
                    onChangeText={text => setFormData(prev => ({
                      ...prev, personalData:{
                        ...prev.personalData,
                        bornDate:text
                      }
                    }))}
                    keyboardType='decimal-pad'
                    autoCapitalize="none"
                    placeholder="Digite sua data de nascimento"
                  />
                </View>
              </View>
              <View style ={SecondStep.ButtonsArea}>
                  <TouchableOpacity
                    style={SecondStep.Next}
                    onPress={() => prevStep()}>
                    <Text style ={SecondStep.buttomText}>Voltar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={SecondStep.Next}
                    onPress={nextStep}>
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
                            zip: text
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
                  <View style ={fourthStep.ButtonsArea}>
                      <TouchableOpacity
                        style={fourthStep.Next}
                        onPress={() => prevStep()}>
                        <Text style ={SecondStep.buttomText}>Voltar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={fourthStep.Next}
                        onPress={handleSignUp}>
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