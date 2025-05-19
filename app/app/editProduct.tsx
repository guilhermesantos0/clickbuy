import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles/editProduct/styles'
import { useUser } from '@/contexts/UserContext';
import { Product } from '@/types/Product';
import { useLocalSearchParams } from 'expo-router';
import api from '@/services/api';
import { Category } from '@/types/Category';
import ip from '@/ip';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
    const { user } = useUser();

    const [step, setStep] = useState(1); 
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState<Product>();
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [category, setCategory] = useState<any>();

    const [state, setState] = useState<any | undefined>('');
    const [city, setCity] = useState<any | undefined>('');
    const [disableCity, setDisableCity] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    const [existingImages, setExistingImages] = useState<String[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [imagesToRemove, setImagesToRemove] = useState<String[]>([]);
    const [condition, setCondition] = useState<string>('');
    const [used, setUsed] = useState<boolean>(false);


    const [mainImageIndex, setMainImageIndex] = useState<number | null>(null);

    const conditionOptions = ["Bom", "Médio", "Ruim"];
    const usedOptions = [{ label: "Novo", value: false }, { label: "Usado", value: true }]


    const [formData, setFormData] = useState<Product | null>(null);
    const [tab, setTab] = useState(1);
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
    };
    useEffect(() => {
    if (product && states.length > 0) {
        const productLocation = product.location.split(',');
        const cityName = productLocation[0].trim();
        const stateName = productLocation[1].trim();

        const foundState = states.find((uf) => uf.nome === stateName);
        setState(foundState);
    }
    }, [product, states]);
    useEffect(() => {
    if (cities.length > 0 && city) {
        const foundCity = cities.find((c) => c.nome === city.nome || c.nome === city);
        if (foundCity) {
        setCity(foundCity);
        }
    }
    }, [cities]);


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
          fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`)
            .then(res => res.json())
            .then(data => setCities(data));
        } else {
            setCities([]);
        }
    }, [state]);

    useEffect(() => {
        updateField('location', `${city}, ${state}`)
    },[city])
    const formatPrice = (price: string) => {
        const numeric = price.replace(/\D/g, '');

        if (!numeric) return 'R$ ';

        const number = parseFloat(numeric) / 100;

        return number.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }
    
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
                    <SelectDropdown
                    defaultValue={formData?.category}
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
                        
                        <Text style={styles.text}>Estado</Text>
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
                        <Text style={styles.text}>Cidade</Text>
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
                        <Text style={styles.text}>Preço</Text>
                        <TextInput
                        style={[styles.Input]}
                        value={String(formData?.price)}
                        onChangeText={text => updateField('price', formatPrice(text))}
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
                                style={styles.Save}
                    >
                    <Text style ={styles.buttomText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {tab === 2 &&(
        <View style={styles.Form}>
          
          <View style={styles.ButtomArea}>
            <TouchableOpacity
                                style={styles.Save}>
                                <Text style ={styles.buttomText}>Salvar</Text>
                            </TouchableOpacity>
          </View>
        </View>
      )}
      {tab === 3 &&(
        <View style={styles.Form}>
         
          <View style={styles.ButtomArea}>
            <TouchableOpacity
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