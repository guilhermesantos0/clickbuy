import { View, Text, Alert, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@/contexts/UserContext';
import { Product } from '@/types/Product';
import api from '@/services/api';
import { useRoute } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from './styles/Checkout/styles';
import Checkbox from 'expo-checkbox';
import Config from 'react-native-config';



declare global {
    interface Window {
        MercadoPago: any;
    }
}

type MercadoPagoInstance = {
    createCardToken: (form: any) => Promise<any>;
    getIdentificationTypes: () => Promise<any>;
    getPaymentMethod: (a: any) => Promise<any>;
};
const Checkout = () => {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        const loadProducts = async () => {
            const data = await AsyncStorage.getItem('checkoutProducts');
            if (data) {
            setProducts(JSON.parse(data));
            }
        };

        loadProducts();
        }, []);

        const { user } = useUser();
        
        const [paymentMethod, setPaymentMethod] = useState<1 | 2>(2);
        
        const [qrCode, setQrCode] = useState<string | null>(null);
        const [qrCodeCopy, setQrCodeCopy] = useState<string | null>(null);
        const [loadingPix, setLoadingPix] = useState(false);

    const [mercadoPago, setMercadoPago] = useState<MercadoPagoInstance | null>(null)

    const [useAccountAddress, setUseAccountAddress] = useState(true);
    const [address, setAddress] = useState({
        road: '',
        number: '',
        city: '',
        state: '',
        zip: '',
        complement: '',
        neighborhood: ''
    });

    const [cardForm, setCardForm] = useState({
        number: '5031433215406351',
        name: 'APRO',
        expireDate: '11/30',
        cvv: '123',
        cpf: '12345678909'
    });


    const total = products.reduce((sum, p) => {
        const numeric = parseFloat(p.price.toString().replace(/[R$\.,]/g, '').replace(/(\d{2})$/, '.$1'));
        return sum + numeric;
    }, 0);

    const totalFormatted = total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });


    const handleGeneratePix = async () => {
        if(!qrCodeCopy) {
            setLoadingPix(true);
            try {
                const response = await api.post("/payment/pix", {
                    amount: Number(total.toFixed(2)), 
                    checkoutInfo: { description: `Compra ${products.map((prod) => prod.name).join(', ')}`, email: user?.email, name: user?.personalData.name, cpf: user?.personalData.cpf }
                });
    
                setQrCode(response.data.qrCodeBase64);
                setQrCodeCopy(response.data.qrCodeCode);
            } catch (err) {
                console.error("Erro ao gerar QR Code PIX", err);
                alert("Erro ao gerar QR Code.");
            } finally {
                setLoadingPix(false);
            }
        } else {
            navigator.clipboard.writeText(qrCodeCopy)
            .then(() => {
                Toast.show({
                            type: 'success',
                            text1: `QR Code copiado com sucesso!`,
                          });
            })
            .catch((err) => {
                Toast.show({
                            type: 'error',
                            text1: `Erro ao copiar QR Code`,
                          });
                console.error('Erro ao copiar QR Code', err)
            })
        }

    };
    const handleSubmit = async () => {


        const [expMonth, expYear] = cardForm.expireDate.split('/');


        try {
            const response = await axios.post(
            'https://api.mercadopago.com/v1/card_tokens',
            {
                card_number: cardForm.number.replace(' ', ''),
                expiration_month: expMonth,
                expiration_year: `20${expYear}`,
                security_code: cardForm.cvv,
                cardholder: {
                    name: cardForm.name,
                    identification: {
                        type: "CPF",
                        number: cardForm.cpf
                    }
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.EXPO_PUBLIC_REACT_APP_MERCADO_PAGO_PUBLIC_KEY}` 
                }
            }
        );
            const bin = cardForm.number.replace(/\s/g, '').slice(0, 6);
            const token = response.data.id;
            const apiPayload = {
                amount: Number(total.toFixed(2)),
                checkoutInfo: {
                    token: token,
                    description: "Descrição Teste",
                    installments: 1,
                    email: user?.email,
                    cpf: cardForm.cpf,
                    bin: bin
                }
            }

            const res = await api.post('/payment/card', apiPayload);
            await api.post('/payment/save',
                {
                    id: res.data.id,
                    userId: user?._id,
                    products: products.map((product) => product._id )
                }
            )
            router.push(`/success?id=${res.data.id}`)
                
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    console.error('Erro na resposta da API:', err.response.data);
                    console.error('Status:', err.response.status);
                    console.error('Headers:', err.response.headers);
                } else if (err.request) {
                    console.error('Requisição feita, mas sem resposta:', err.request);
                } else {
                    console.error('Erro ao configurar a requisição:', err.message);
                }
                console.error('Config completa do erro:', err.config);
            } else {
                console.error('Erro desconhecido:', err);
            }
        }
        
    };
  return (
    <ScrollView style={styles.Scroll} contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.Container}>
      <View style={styles.Products}>
        <Text style={styles.Title}>Resumo da compra</Text>
        <View style={styles.ProductsList}>
            {products.map((product, idx) => (
                <View style={styles.Product} key={idx}>
                    <Text style={styles.ProductName}>{product.name}</Text>
                    <Text>{product.price}</Text>
                </View>
            ))}
        </View>
        <Text style={styles.Total}>{`Total: ${totalFormatted}`}</Text>
      </View>
      <View style={styles.Products}>
        <View style={styles.Opcoes}>
            <TouchableOpacity onPress={() => setPaymentMethod(1)} style={styles.Opcao}>
                <Text style={paymentMethod === 1? styles.OpcaoTextSelecionado: styles.OpcaoText}>Cartão de Crédito</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPaymentMethod(2)} style={styles.Opcao}>
                <Text style={paymentMethod === 2? styles.OpcaoTextSelecionado: styles.OpcaoText}>PIX</Text>
            </TouchableOpacity>
        </View>
        {paymentMethod === 1 && (
            <View>
                <TextInput
                      style={[styles.Input]}
                      value={cardForm.number}
                      onChangeText={txt => setCardForm({ ...cardForm, number: txt })}
                      keyboardType= 'decimal-pad'
                      autoCapitalize="none"
                      placeholder="Número do Cartão"
                    />
                    <TextInput
                      style={[styles.Input]}
                      value={cardForm.name}
                      onChangeText={txt => setCardForm({ ...cardForm, name: txt })}
                      keyboardType= 'default'
                      autoCapitalize="none"
                      placeholder="Nome no Cartão"
                    />
                    <View style={styles.Form}>
                        <TextInput
                      style={[styles.Input2]}
                      value={cardForm.expireDate}
                      onChangeText={txt => setCardForm({ ...cardForm, expireDate: txt })}
                      keyboardType= 'decimal-pad'
                      autoCapitalize="none"
                      placeholder="Validade"
                    />
                    <TextInput
                      style={[styles.Input2]}
                      value={cardForm.cvv}
                      onChangeText={txt => setCardForm({ ...cardForm, cvv: txt })}
                      keyboardType= 'decimal-pad'
                      autoCapitalize="none"
                      placeholder="CVV"
                    />
                    </View>
                    <TextInput
                      style={[styles.Input]}
                      value={cardForm.cpf}
                      onChangeText={txt => setCardForm({ ...cardForm, cpf: txt })}
                      keyboardType= 'decimal-pad'
                      autoCapitalize="none"
                      placeholder="CPF"
                    />
                    <TouchableOpacity onPress={() => setUseAccountAddress(!useAccountAddress)} style={styles.Selecao}>
                        <Checkbox
                            style={styles.CheckBox}
                            value={useAccountAddress}
                            onValueChange={() => setUseAccountAddress(!useAccountAddress)}
                            color={useAccountAddress ? '#DDA04B' : undefined}
                            />
                            <Text>Mesmo endereço da conta</Text>
                    </TouchableOpacity>
                    {!useAccountAddress && (
                        <View>
                            <View style={styles.Form}>
                                <TextInput
                            style={[styles.Input2]}
                            value={address.zip}
                            onChangeText={txt => setAddress({ ...address, zip: txt })}
                            keyboardType= 'decimal-pad'
                            autoCapitalize="none"
                            placeholder="CEP"
                            />
                            <TextInput
                            style={[styles.Input2]}
                            value={address.neighborhood}
                            onChangeText={txt => setAddress({ ...address, neighborhood: txt })}
                            keyboardType= 'default'
                            autoCapitalize="none"
                            placeholder="Bairro"
                            />
                            </View>
                            <TextInput
                                style={[styles.Input]}
                                value={address.road}
                                onChangeText={txt => setAddress({ ...address, road: txt })}
                                keyboardType= 'default'
                                autoCapitalize="none"
                                placeholder="Rua"
                                />
                                <View style={styles.Form}>
                                <TextInput
                            style={[styles.Input2]}
                            value={address.number}
                            onChangeText={txt => setAddress({ ...address, number: txt })}
                            keyboardType= 'decimal-pad'
                            autoCapitalize="none"
                            placeholder="Número"
                            />
                            <TextInput
                            style={[styles.Input2]}
                            value={address.complement}
                            onChangeText={txt => setAddress({ ...address, complement: txt })}
                            keyboardType= 'default'
                            autoCapitalize="none"
                            placeholder="Complemento"
                            />
                            </View>
                            <View style={styles.Form}>
                                <TextInput
                            style={[styles.Input2]}
                            value={address.city}
                            onChangeText={txt => setAddress({ ...address, city: txt })}
                            keyboardType= 'default'
                            autoCapitalize="none"
                            placeholder="Cidade"
                            />
                            <TextInput
                            style={[styles.Input2]}
                            value={address.state}
                            onChangeText={txt => setAddress({ ...address, state: txt })}
                            keyboardType= 'default'
                            autoCapitalize="none"
                            placeholder="Estado"
                            />
                            </View>
                        </View>
                    ) }
                    <View style={styles.BotaoArea}>
                        <TouchableOpacity onPress={handleSubmit} style={styles.Botao}>
                                <Text style={styles.Text}>Realizar Pagamento</Text>
                            </TouchableOpacity>
                    </View>
            </View>
        )}
        {paymentMethod === 2 && (
            <View style={styles.QrcodeArea}>
                {qrCode && (
                    <Image
                    style={styles.Qrcode}
                        source={{ uri: `data:image/png;base64,${qrCode}`}}
                        resizeMode="center"
                    />
                )}
                <View style={styles.BotaoArea}>
                        <TouchableOpacity onPress={handleGeneratePix} style={styles.Botao}>
                                <Text style={styles.Text}> {loadingPix ? "Gerando..." : ( qrCodeCopy ? "Copiar" : "Gerar QR Code PIX" )}</Text>
                            </TouchableOpacity>
                    </View>
            </View>
        )}
      </View>
    </View>
      </ScrollView>
  )
}

export default Checkout