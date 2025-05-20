import { View, Text, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles/editProduct/styles'
import { useUser } from '@/contexts/UserContext';
import { Product } from '@/types/Product';
import { useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker'
import api from '@/services/api';
import { Category } from '@/types/Category';
import ip from '@/ip';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Toast from 'react-native-toast-message';
interface State {
    id: number,
    sigla: string,
    nome: string
}

interface City {
    id: number,
    nome: string
}
const editProduct = () => {
    type ImageFile = {
        uri: string;
        filename: string;
        type: string;
        };
    const { user } = useUser();

    const [step, setStep] = useState(1); 
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState<Product>();
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);

    const [state, setState] = useState<any | undefined>('');
    const [city, setCity] = useState<any | undefined>('');
    const [disableCity, setDisableCity] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    const [existingImages, setExistingImages] = useState<String[]>([]);
    const [newImages, setNewImages] = useState<ImageFile[]>([]);
    const [imagesToRemove, setImagesToRemove] = useState<String[]>([]);
    const [condition, setCondition] = useState<string>('');
    const [used, setUsed] = useState<boolean>(false);

    
    const [mainImageIndex, setMainImageIndex] = useState<number | null>(null);

    const conditionOptions = ["Bom", "Médio", "Ruim"];
    const usedOptions = [{ label: "Novo", value: false }, { label: "Usado", value: true }]


    const [formData, setFormData] = useState<Product | null>(null);
    const [tab, setTab] = useState(1);
        const removeImage = (index: number, type: 'existing' | 'new') => {
        if (type === 'existing') {
            const imageToRemove = existingImages[index];
            setImagesToRemove(prev => [...prev, imageToRemove]);
            setExistingImages(prev => prev.filter((_, i) => i !== index));
        } else {
            setNewImages(prev => prev.filter((_, i) => i !== index));
        }

        if (mainImageIndex === index) {
            setMainImageIndex(0);
        } else if (mainImageIndex && mainImageIndex > index) {
            setMainImageIndex(0);
        }
    };

    useEffect(() => {
        if(product) {         
            setFormData(product);
            setExistingImages([...product.images]);
        }
    },[product])
    useEffect(() => {
        const productLocation = product?.location.split(',');
        if(states.length > 0 && productLocation) {        
            const selected = states.find(c => c.sigla === productLocation[1].trim());
            setState(selected)
        }
    },[states])
    useEffect(() => {
        const productLocation = product?.location.split(',');
        if(states.length > 0 && productLocation) {        
            const selected = states.find(c => c.sigla === productLocation[1].trim());
            setState(selected)
        }
    },[states])
    useEffect(() => {
        const productLocation = product?.location.split(',');
        if(cities.length > 0 && productLocation) {        
            const selected = cities.find(c => c.nome === productLocation[0]);
            setCity(selected)
        }
    },[cities])
        const handleMainImage = (index: number) => {
        setMainImageIndex(index);
    };

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
    
                setNewImages(prev => [...prev, file]);
                }
            } catch (error) {
                console.error('Erro ao escolher imagem:', error);
            }
            };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data)
            } catch (error) {
                console.error('erro');
                throw error
            }
        }

        fetchData();
    }, [id])
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
    }
    useEffect(() => {
        if(product) {
            product.images.forEach((i, idx) => {
                if(product.mainImage === i) {
                    setMainImageIndex(idx)
                }
            })
        }
    }, [product])

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
        } else {
            setCities([]);
        }
    }, [state]);
    useEffect(() => {
        if(city){
            updateField('location', `${city.nome}, ${state.sigla}`)
        }
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
        const handleSave = async () => {
        if (!formData) return;

        try {
            const productCopy = formData;

            const formDataToSend = new FormData();
            formDataToSend.append('data', JSON.stringify({
                ...productCopy,
                imagesToRemove,
                mainImageIndex
            }));

            newImages.forEach((img) => {
            formDataToSend.append('images', {
                uri: img.uri,
                type: img.type,
                name: img.filename || 'image.jpg',
            } as any); 
        });

            const res = await api.put(`/products/${productCopy._id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            Toast.show({
                    type: 'success',
                    text1: 'Alterações realizadas com sucesso!',
                  });
        } catch (err) {
            console.error("Erro ao salvar:", err);
            Toast.show({
                    type: 'error',
                    text1: 'Erro ao salvar os dados!',
                  });
        }
    };

  return (
    <View style={styles.Container}>
      <View style={styles.Tabs}>
        <TouchableOpacity onPress={() => setTab(1)} style={styles.TabOption}>
          <Text style={tab === 1? styles.selected: []}>Informações Gerais</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab(2)} style={styles.TabOption}>
          <Text style={tab === 2? styles.selected: []}>Qualidade</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab(3)} style={styles.TabOption}>
          <Text style={tab === 3? styles.selected: []}>Galeria de Imagens</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.Scroll} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      {tab === 1 && (
        <View style={styles.Form}>
          <Text style={styles.text}>Título</Text>
                    <TextInput
                    style={[styles.Input]}
                    value={formData?.name}
                    onChangeText={text => updateField( "name" , text)}
                    keyboardType='default'
                    autoCapitalize="none"
                    placeholder="Digite o nome do seu produto"
                    />
                    <Text style={styles.text}>Categoria</Text>
                    <View style={styles.PickerArea}>
                        <Picker
                        style={styles.Picker}
                        selectedValue={formData?.category}
                        onValueChange={(itemValue, itemIndex) => {
                            const selected = categories.find(c => c.name === itemValue);
                            updateField("category", selected?.name);
                        }}
                        >
                        {categories.map((cat) => (
                            <Picker.Item key={cat.name} label={cat.name} value={cat.name} />
                        ))}
                        </Picker>
                    </View>
                        <Text style={styles.text}>Estado</Text>
                    <View style={styles.PickerArea}>
                        <Picker
                        style={styles.Picker}
                        selectedValue={state.sigla}
                        onValueChange={(itemValue, itemIndex) => {
                            const selected = states.find(c => c.sigla === itemValue);
                            setState(selected)
                        }}
                        >
                        {states.map((state) => (
                            <Picker.Item key={state.sigla} label={state.nome} value={state.sigla} />
                        ))}
                        </Picker>
                    </View>
                        <Text style={styles.text}>Cidade</Text>
                    <View style={styles.PickerArea}>
                        <Picker
                        style={styles.Picker}
                        selectedValue={city?.nome || ''}
                        onValueChange={(itemValue, itemIndex) => {
                            const selected = cities.find(c => c.nome === itemValue);
                            if (selected) {
                                setCity(selected);
                            }
                        }}
                        >
                        <Picker.Item label="Selecione a cidade" value={null} />
                        {cities.map((city) => (
                            <Picker.Item key={city.nome} label={city.nome} value={city.nome} />
                        ))}
                        </Picker>
                    </View>
                    <Text style={styles.text}>Preço</Text>
                        <TextInput
                        style={[styles.Input]}
                        value={formatPrice(String(formData?.price))}
                        onChangeText={text => updateField('price', formatPrice(String(text)))}
                        keyboardType='decimal-pad'
                        autoCapitalize="none"
                        placeholder="Digite o preço do produto"
                        />
                    <Text style={styles.text}>Descrição</Text>
                        <TextInput
                        style={[styles.TextArea]}
                        value={formData?.description}
                        onChangeText={text => updateField('description', text)}
                        keyboardType='default'
                        autoCapitalize="none"
                        multiline
                        numberOfLines={10}
                        placeholder="Descreva os detalhes do produto..."
                        />

          <View style={styles.ButtomArea}>
            <TouchableOpacity
            onPress={handleSave}
                                style={styles.Save}
                    >
                    <Text style ={styles.buttomText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {tab === 2 &&(
        <View style={styles.Form2}>
            <Text style={styles.text}>Qualidade do Produto</Text>
          <View style={styles.PickerArea}>
                        <Picker
                        style={styles.Picker}
                        selectedValue={formData?.condition.quality}
                        onValueChange={(itemValue, itemIndex) => {
                            updateField("condition.quality", itemValue)
                        }}
                        >
                        
                        {conditionOptions.map((condition) => (
                            <Picker.Item key={condition} label={condition} value={condition} />
                        ))}
                        </Picker>
                    </View>
                    <Text style={styles.text}>Condição</Text>
                    <View style={styles.PickerArea}>
                        <Picker
                        style={styles.Picker}
                        selectedValue={formData?.condition.used}
                        onValueChange={(itemValue, itemIndex) => {
                            updateField("condition.used", itemValue)
                        }}
                        >
                        
                        {usedOptions.map((condition) => (
                            <Picker.Item key={condition.label} label={condition.label} value={condition.value} />
                        ))}
                        </Picker>
                    </View>
          <View style={styles.ButtomArea}>
            <TouchableOpacity
            onPress={handleSave}
                                style={styles.Save}>
                                <Text style ={styles.buttomText}>Salvar</Text>
                            </TouchableOpacity>
          </View>
        </View>
      )}
      {tab === 3 &&(
        <View style={styles.Form2}>
         <TouchableOpacity
                    style={styles.ImageButton}
                    onPress={() => pickImage()}>
                        <IconSymbol size={70} name='plus' color='white' />
                </TouchableOpacity>
                    <ScrollView style={styles.ImageRow} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {existingImages.length >  0 && existingImages.map((img, index) => (
                        <TouchableOpacity key={index} style={styles.ImageContainer} onPress={() => setMainImageIndex(index)}>
                            {index === mainImageIndex ? (
                                <Image
                                    source={{ uri: String(img) }}
                                    style={styles.MainImage}
                                    resizeMode="center"
                                />
                                ) : (
                                <Image
                                    source={{ uri: String(img) }}
                                    style={styles.Image}
                                    resizeMode="cover"
                                />
                                )}
                                <TouchableOpacity
                                    style={styles.deleteIcon}
                                    onPress={() => {
                                                removeImage(index, 'existing')
                                            }}
                                >
                                    <Icon name="delete" size={30} color="white" />
                                </TouchableOpacity>

                            
                        </TouchableOpacity>
                    ))}
                    {newImages.length >  0 && newImages.map((img, index) => (
                        <TouchableOpacity key={index} style={styles.ImageContainer} onPress={() => setMainImageIndex(index + existingImages.length)}>
                            {index + existingImages.length === mainImageIndex ? (
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
                                                removeImage(index, "new")
                                            }}
                                >
                                    <Icon name="delete" size={30} color="white" />
                                </TouchableOpacity>

                            
                        </TouchableOpacity>
                    ))}
                </ScrollView>
          <View style={styles.ButtomArea}>
            <TouchableOpacity
            onPress={handleSave}
                                style={styles.Save}>
                                <Text style ={styles.buttomText}>Salvar</Text>
                            </TouchableOpacity>
          </View>
        </View>
      )}
      </ScrollView>
    </View>
  )
}

export default editProduct