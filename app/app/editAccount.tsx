import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProfilePictureEditor from '@/components/clickbuy/ProfilePictureEditor/ProfilePictureEditor'
import { useUser } from '@/contexts/UserContext';
const genericPhoto = require('@/assets/ClickBuy/iconeGenerico.png');
import ip from '@/ip'
import styles from './styles/editAccount/styles';
import { User } from '@/types/User';
import { formatCEP, formatCPF, formatDate, formatPhoneNumber } from '@/utils/formatters';
import api from '@/services/api';
import Toast from 'react-native-toast-message';

const editAccount = () => {
  type ImageFile = {
        uri: string;
        filename: string;
        type: string;
        };
  const [message, setMessage] = useState("");
  const {user, setUser} = useUser();
  const [tab, setTab] = useState(2);
  const [formData, setFormData] = useState<User | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<ImageFile | null>(null);
  const [messageStatus, setMessageStatus] = useState("");


  const [profileImage, setProfileImage] = useState(
    user?.profilePic ? user.profilePic : genericPhoto
  );
  useEffect(() => {
      if (user) {
          setFormData(JSON.parse(JSON.stringify(user)));
      }
  }, [user]);

  
  const handleImageChange = (file: ImageFile) => {
    const imageUrl = file.uri;
    setProfileImageFile(file),
    setProfileImage(imageUrl);
  };
  const updateField = (path: string, value: any) => {
        if (!formData) return;
        const keys = path.split('.');

        const updated = JSON.parse(JSON.stringify(formData));
        let current: any = updated;

        keys.forEach((key, i) => {
            if (i === keys.length - 1) {
                current[key] = value;
            } else {
                current[key] = { ...current[key] };
                current = current[key];
            }
        });

        setFormData(updated);
    };
    const handleSave = async () => {
    if (!formData) return;

    try {
        if (profileImageFile) {
            if (
                !profileImageFile.uri ||
                !profileImageFile.type ||
                !profileImageFile.filename
            ) {
                Toast.show({
                    type: 'error',
                    text1: 'Aguardando carregamento da imagem...',
                    text2: 'Por favor, aguarde o carregamento completo da imagem antes de salvar.',
                });
                return;
            }
        }

        const userCopy = JSON.parse(JSON.stringify(formData));
        delete userCopy.favourites;

        const formDataToSend = new FormData();
        formDataToSend.append('data', JSON.stringify(userCopy));

        if (profileImageFile) {
            formDataToSend.append('profilePic', {
                uri: profileImageFile.uri,
                type: profileImageFile.type,
                name: profileImageFile.filename,
            } as any);
        }

        const res = await api.put(`/user/${userCopy._id}`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        setUser(res.data);

        Toast.show({
            type: 'success',
            text1: 'Alterações realizadas com sucesso!',
        });

    } catch (err: any) {
        console.error("Erro ao salvar:", err);

        if (err.response) {
            console.error("Erro da API:", err.response.data);

            Toast.show({
                type: 'error',
                text1: 'Erro ao salvar os dados!',
                text2: err.response.data?.message || JSON.stringify(err.response.data),
            });
        } else if (err.request) {
            Toast.show({
                type: 'error',
                text1: 'Sem resposta da API!',
                text2: 'Verifique sua conexão.',
            });
        } else {
            Toast.show({
                type: 'error',
                text1: 'Erro ao salvar!',
                text2: err.message || 'Erro desconhecido',
            });
        }
    }
};

    const handleSubmit = async () => {
            setMessage("");
            const email = user?.email
            try {
                const res = await api.post('/user/recovery', {email});
                console.log(res)
                setTimeout(() => {
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
            }
    };
  return (
    <View style={styles.Container}>
      <View style={styles.Tabs}>
        <TouchableOpacity onPress={() => setTab(1)} style={styles.TabOption}>
          <Text style={tab === 1? styles.selected: []}>Dados de Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab(2)} style={styles.TabOption}>
          <Text style={tab === 2? styles.selected: []}>Dados Pessoais</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab(3)} style={styles.TabOption}>
          <Text style={tab === 3? styles.selected: []}>Endereço</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.Scroll} contentContainerStyle={{ flexGrow: 1 }}>
      {tab === 1 && (
        <View style={styles.Form}>
          <Text style ={styles.text}>Email</Text>
          <TextInput
            style={[styles.Input]}
            value={formData?.email}
            onChangeText={text => updateField("email", text)}
            keyboardType='email-address'
            autoCapitalize="none"
            placeholder="Digite seu email"
          />
          <View style={styles.ButtomArea2}>
            <TouchableOpacity
                                style={styles.Redefinir}
                                onPress={handleSubmit}>
                                <Text style ={styles.buttomText}>Redefinir Senha</Text>
                            </TouchableOpacity>
            <TouchableOpacity
                                style={styles.Save}
                                onPress={handleSave}>
                                <Text style ={styles.buttomText}>Salvar</Text>
                            </TouchableOpacity>
          </View>
          <Text style={messageStatus === "approved" ? styles.Success : styles.Error}>{message}</Text>
        </View>
      )}
      {tab === 2 &&(
        <View style={styles.Form}>
          <ProfilePictureEditor 
            currentImage={profileImage} 
            onImageChange={handleImageChange} 
          />
          <Text style ={styles.text}>Nome</Text>
          <TextInput
            style={[styles.Input]}
            value={formData?.personalData.name}
            onChangeText={text => updateField("personalData.name", text)}
            keyboardType='default'
            autoCapitalize="none"
            placeholder="Digite seu nome"
          />
          <Text style ={styles.text}>CPF</Text>
                    <TextInput
                      style={[styles.Input]}
                      value={formData?.personalData.cpf}
                      onChangeText={text =>updateField("personalData.cpf",formatCPF(text))}
                      keyboardType='default'
                      autoCapitalize="none"
                      placeholder="Digite seu CPF"
                    />
          <Text style ={styles.text}>Telefone</Text>
                    <TextInput
                      style={[styles.Input]}
                      value={formData?.personalData.phone}
                      onChangeText={text =>updateField("personalData.phone",formatPhoneNumber(text))}
                      keyboardType='phone-pad'
                      autoCapitalize="none"
                      placeholder="Digite seu número de telefone"
                    />
          <Text style ={styles.text}>Data de nascimento</Text>
                    <TextInput
                      style={[styles.Input]}
                      value={formData?.personalData.bornDate}
                      onChangeText={text =>updateField("personalData.bornDate",formatDate(text))}
                      keyboardType='decimal-pad'
                      autoCapitalize="none"
                      placeholder="Digite sua data de nascimento"
                    />
          <View style={styles.ButtomArea}>
            <TouchableOpacity
                                style={styles.Save}
                                onPress={handleSave}>
                                <Text style ={styles.buttomText}>Salvar</Text>
                            </TouchableOpacity>
          </View>
        </View>
      )}
      {tab === 3 &&(
        <View style={styles.Form}>
          <Text style ={styles.text}>CEP</Text>
          <TextInput
            style={[styles.Input]}
            value={formData?.personalData.address.zip}
            onChangeText={text => updateField("personalData.address.zip", formatCEP(text))}
            keyboardType= 'decimal-pad'
            autoCapitalize="none"
            placeholder="Digite seu CEP"
          />
          <Text style ={styles.text}>Rua</Text>
                    <TextInput
                      style={[styles.Input]}
                      value={formData?.personalData.address.road}
                      onChangeText={text =>updateField("personalData.address.road",text)}
                      keyboardType='default'
                      autoCapitalize="none"
                      placeholder="Digite sua rua"
                    />
          <Text style ={styles.text}>Número</Text>
                    <TextInput
                      style={[styles.Input]}
                      value={formData?.personalData.address.number}
                      onChangeText={text =>updateField("personalData.address.number",text)}
                      keyboardType= 'decimal-pad'
                      autoCapitalize="none"
                      placeholder="Digite seu número"
                    />
          <Text style ={styles.text}>Complemento</Text>
                    <TextInput
                      style={[styles.Input]}
                      value={formData?.personalData.address.complement}
                      onChangeText={text =>updateField("personalData.address.complement",text)}
                      keyboardType= 'default'
                      autoCapitalize="none"
                      placeholder="Digite o complemento(opcional)"
                    />
          <Text style ={styles.text}>Cidade</Text>
                    <TextInput
                      style={[styles.Input]}
                      value={formData?.personalData.address.city}
                      onChangeText={text =>updateField("personalData.address.city",text)}
                      keyboardType= 'default'
                      autoCapitalize="none"
                      placeholder="Digite a cidade"
                    />
          <Text style ={styles.text}>Estado</Text>
                    <TextInput
                      style={[styles.Input]}
                      value={formData?.personalData.address.state}
                      onChangeText={text =>updateField("personalData.address.state",text)}
                      keyboardType= 'default'
                      autoCapitalize="none"
                      placeholder="Digite o Estado"
                    />
          <View style={styles.ButtomArea}>
            <TouchableOpacity
                                style={styles.Save}
                                onPress={handleSave}>
                                <Text style ={styles.buttomText}>Salvar</Text>
                            </TouchableOpacity>
          </View>
          
        </View>
      )}
      </ScrollView>
    </View>
  );
  
}

export default editAccount