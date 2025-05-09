import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useUser } from '@/contexts/UserContext';
import Toast from 'react-native-toast-message';
import { Category } from "@/types/Category";
import ip from '@/ip'
import styles from './styles/addProduct/styles';
import firstStep from './styles/addProduct/firstStep';
import SelectDropdown from 'react-native-select-dropdown';
import Categories from '@/components/clickbuy/Categories';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import fourthStep from './styles/Cadastro/fourthStep';
import { IconSymbol } from '@/components/ui/IconSymbol';
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { router } from 'expo-router';
interface State {
    id: number,
    sigla: string,
    nome: string
}

interface City {
    id: number,
    nome: string
}

const addProduct = () => {
    type ImageFile = {
        uri: string;
        filename: string;
        type: string;
        };
    
    const { user } = useUser();
    const [step, setStep] = useState(1); 
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [category, setCategory] = useState<any>();
    const [title, setTitle] = useState<any>();
    const [price, setPrice] = useState<any>('R$ ');
    const [state, setState] = useState<any | undefined>('');
    const [city, setCity] = useState<any | undefined>('');
    const [location, setLocation] = useState<string>('');
    const [disableCity, setDisableCity] = useState(true);

    const [condition, setCondition] = useState<string>('');
    const [used, setUsed] = useState<boolean>(false);

   const [images, setImages] = useState<ImageFile[]>([]);
    const [mainImageIndex, setMainImageIndex] = useState(0);


    const conditionOptions = ["Bom", "Médio", "Ruim"];
    const usedOptions = [{ label: "Novo", value: false }, { label: "Usado", value: true }]
    

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`http://${ip}:5000/categories`);

            const categoriesData = await response.json();

            setCategories(categoriesData);
        } catch (error) {
            console.error('Erro ao buscar categorias', error)
        }
        }

        fetchData();
    }, [])
    useEffect(() => {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
          .then(res => res.json())
          .then(data => setStates(data));
    }, []);
    
    useEffect(() => {
        if (state) {
          fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.sigla}/municipios`)
            .then(res => res.json())
            .then(data => setCities(data));
            setDisableCity(false)
        } else {
            setCities([]);
        }
    }, [state]);
    
    

    useEffect(() => {
        setLocation(`${city.nome}, ${state.sigla}`)
    },[city])

    const formatPrice = (price: string) => {
        const numeric = price.replace(/\D/g, '');
    
        if (!numeric) return 'R$ ';
    
        let number = parseFloat(numeric) / 100;
    
        if (number > 10000000) {
            number = 10000000;
        }
    
        return number.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    };
    

    const prevStep = () => {
        setStep(step - 1)
    }

    const nextStep = () => {
        if(category == null || title == null || price == "R$ " || state == null || city == null) {
            return Toast.show({
                    type: 'error',
                    text1: 'Preencha todos os campos',
                  });
        } else {
            setStep(step + 1);
        }
    }
    const nextStep2 = () => {
        if(used == null || condition == null) {
            return Toast.show({
                    type: 'error',
                    text1: 'Preencha todos os campos',
                  });
        } else {
            setStep(step + 1);
        }
    }
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Permissão para acessar a galeria é necessária!');
            }
          }
        })();
      }, []);
    
      const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            });

            if (!result.canceled) {
            const uri = result.assets[0].uri;
            const fileName = uri.split('/').pop() || 'image.jpg';
            const mimeType = 'image/jpeg';
            const file = {
                uri: uri,
                filename: fileName,
                type: mimeType,
            };

            setImages(prev => [...prev, file]);
            }
        } catch (error) {
            console.error('Erro ao escolher imagem:', error);
        }
        };
    const postProduct = async () => {
        if (images.length === 0 || mainImageIndex === null) {
            Toast.show({
                      type: 'error',
                      text1:'Preencha todos os campos e selecione a imagem principal',
            });
          return;
        }
        const formData = new FormData();
        formData.append('name', title);
        formData.append('price', price.toString());
        formData.append('location', location);
        formData.append('categoryId', category._id);
        formData.append('condition', condition);
        formData.append('used', String(used));
        formData.append('announcer', user ? user._id : '');
        formData.append('mainImageIndex', mainImageIndex.toString());
    
        images.forEach((img) => {
            formData.append('images', {
                uri: img.uri,
                type: img.type,
                name: img.filename || 'image.jpg',
            } as any); 
        });
    
        try {
          const response = await axios.post(`http://${ip}:5000/products`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          if (response.status == 201) {
            const productData = response.data
            Toast.show({
                      type: 'success',
                      text1:'Produto cadastrado com sucesso!',
            });
            router.push('/myProducts');
          }
        } catch (error) {
          Toast.show({
                      type: 'error',
                      text1:'Erro ao cadastrar produto',
            });
          console.error(error)
        }
    };



  return (
    <View style={styles.Container}>
    <ScrollView style={fourthStep.Scroll} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.Page}>
        {step ===1 &&(
            <View style={styles.Form}>
                <Text style={styles.Title}>Anunciar Produto</Text>
                <View>
                    <Text style={firstStep.text}>Título</Text>
                    <TextInput
                    style={[firstStep.Input]}
                    value={title}
                    onChangeText={text => setTitle(text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="Digite o nome do seu produto"
                    />
                    <Text style={firstStep.text}>Categoria</Text>
                    <SelectDropdown
                        data={categories}
                        onSelect={(selectedItem, index) => {
                            setCategory(selectedItem)
                        }}
                        renderButton={(selectedItem, isOpened) => {
                            return (
                            <View style={styles.dropdownButtonStyle}>
                                <Text style={styles.dropdownButtonTxtStyle}>
                                {(selectedItem && selectedItem.name) || 'Categoria'}
                                </Text>
                                <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                            </View>
                            );
                        }}
                        renderItem={(item, index, isSelected) => {
                            return (
                            <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                                <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                            </View>
                            );
                        }}
                        dropdownStyle={styles.dropdownMenuStyle}
                        />
                        
                        <Text style={firstStep.text}>Estado</Text>
                        <SelectDropdown
                        defaultValue={state}
                        data={states}
                        onSelect={(selectedItem, index) => {
                            setState(selectedItem);
                        }}
                        renderButton={(selectedItem, isOpened) => {
                            return (
                            <View style={styles.dropdownButtonStyle}>
                                <Text style={styles.dropdownButtonTxtStyle}>
                                {(selectedItem && selectedItem.nome) || 'Estado'}
                                </Text>
                                <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                            </View>
                            );
                        }}
                        renderItem={(item, index, isSelected) => {
                            return (
                            <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                                <Text style={styles.dropdownItemTxtStyle}>{item.nome}</Text>
                            </View>
                            );
                        }}
                        dropdownStyle={styles.dropdownMenuStyle}
                        />
                        <Text style={firstStep.text}>Cidade</Text>
                        <SelectDropdown
                        data={cities}

                        onSelect={(selectedItem, index) => {
                            setCity(selectedItem)
                        }}
                        renderButton={(selectedItem, isOpened) => {
                            return (
                            <View style={styles.dropdownButtonStyle}>
                                <Text style={styles.dropdownButtonTxtStyle}>
                                {(selectedItem && selectedItem.nome) || 'Cidade'}
                                </Text>
                                <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                            </View>
                            );
                        }}
                        renderItem={(item, index, isSelected) => {
                            return (
                            <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                                <Text style={styles.dropdownItemTxtStyle}>{item.nome}</Text>
                            </View>
                            );
                        }}
                        dropdownStyle={styles.dropdownMenuStyle}
                        disabled={disableCity}
                        />
                        <Text style={firstStep.text}>Preço</Text>
                        <TextInput
                        style={[firstStep.Input]}
                        value={price}
                        onChangeText={text => setPrice(formatPrice(text))}
                        keyboardType='decimal-pad'
                        autoCapitalize="none"
                        placeholder="Digite o preço do produto"
                        />
                        <View style={firstStep.ButtonsArea}>
                            <TouchableOpacity
                                style={firstStep.Next}
                                onPress={nextStep}>
                                <Text style ={firstStep.buttomText}>Próximo</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            </View>
        )}{step === 2 && (
            <View style={styles.Form}>
                <Text style={styles.Title}>Qualidade do Produto</Text>
                    <Text style={firstStep.text}>Qualidade do Produto</Text>
                    <SelectDropdown
                        data={conditionOptions}
                        onSelect={(selectedItem, index) => {
                            setCondition(selectedItem)
                        }}
                        renderButton={(selectedItem, isOpened) => {
                            return (
                            <View style={styles.dropdownButtonStyle}>
                                <Text style={styles.dropdownButtonTxtStyle}>
                                {(selectedItem && selectedItem) || 'Qualidade'}
                                </Text>
                                <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                            </View>
                            );
                        }}
                        renderItem={(item, index, isSelected) => {
                            return (
                            <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                                <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                            </View>
                            );
                        }}
                        dropdownStyle={styles.dropdownMenuStyle2}
                        />
                        
                        <Text style={firstStep.text}>Condição</Text>
                        <SelectDropdown
                        data={usedOptions}
                        onSelect={(selectedItem, index) => {
                            setUsed(selectedItem.label);
                        }}
                        renderButton={(selectedItem, isOpened) => {
                            return (
                            <View style={styles.dropdownButtonStyle}>
                                <Text style={styles.dropdownButtonTxtStyle}>
                                {(selectedItem && selectedItem.label) || 'Condição'}
                                </Text>
                                <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                            </View>
                            );
                        }}
                        renderItem={(item, index, isSelected) => {
                            return (
                            <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                                <Text style={styles.dropdownItemTxtStyle}>{item.label}</Text>
                            </View>
                            );
                        }}
                        dropdownStyle={styles.dropdownMenuStyle3}
                        />
                        
                        <View style ={styles.ButtonsArea}>
                            <TouchableOpacity
                                style={firstStep.Next}
                                onPress={() => prevStep()}>
                                <Text style ={firstStep.buttomText}>Voltar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={firstStep.Next}
                                onPress={nextStep2}>
                                <Text style ={firstStep.buttomText}>Próximo</Text>
                            </TouchableOpacity>
                        </View>
                </View>
        )

        }
        {step === 3 && (
            <View style={styles.ImageForm}>
                <TouchableOpacity
                    style={styles.ImageButton}
                    onPress={() => pickImage()}>
                        <IconSymbol size={70} name='plus' color='white' />
                </TouchableOpacity>
                    <ScrollView style={styles.ImageRow} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {images.length > 0 && images.map((img, index) => (
                        <TouchableOpacity key={index} style={styles.ImageContainer} onPress={() => setMainImageIndex(index)}>
                            {index === mainImageIndex ? (
                                <Image
                                    source={{ uri: img.uri }}
                                    style={styles.MainImage}
                                    resizeMode="center"
                                />
                                ) : (
                                <Image
                                    source={{ uri: img.uri }}
                                    style={styles.Image}
                                    resizeMode="cover"
                                />
                                )}
                                <TouchableOpacity
                                    style={styles.deleteIcon}
                                    onPress={() => {
                                                const updated = images.filter((_, i) => i !== index);
                                                setImages(updated);
                                                if (mainImageIndex === index) setMainImageIndex(0);
                                                else if (mainImageIndex && mainImageIndex > index) setMainImageIndex(prev => prev! - 1);
                                            }}
                                >
                                    <Icon name="delete" size={30} color="white" />
                                </TouchableOpacity>

                            
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <View style ={styles.ButtonsArea}>
                            <TouchableOpacity
                                style={firstStep.Next}
                                onPress={() => prevStep()}>
                                <Text style ={firstStep.buttomText}>Voltar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={firstStep.Next}
                                onPress={postProduct}>
                                <Text style ={firstStep.buttomText}>Anunciar</Text>
                            </TouchableOpacity>
                        </View>
            </View>
        )}
      </View>
      </ScrollView>
    </View>
  )
}

export default addProduct