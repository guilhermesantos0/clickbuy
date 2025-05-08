import { View, Text, TextInput, ScrollView, Switch, TouchableOpacity } from 'react-native'
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
    const [disableCity, setDisableCity] = useState(false);

    const [condition, setCondition] = useState<string>('');
    const [used, setUsed] = useState<boolean>(false);

    const [images, setImages] = useState<File[]>([]);
    const [mainImageIndex, setMainImageIndex] = useState<number | null>(null);


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
          fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`)
            .then(res => res.json())
            .then(data => setCities(data));
        } else {
            setCities([]);
        }
    }, [state]);
    
    

    useEffect(() => {
        setLocation(`${city}, ${state}`)
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
        console.log(category, title, price, state, city)

        if(category == null || title == null || price == "R$ " || state == null || city == null) {
            return Toast.show({
                    type: 'error',
                    text1: 'Preencha todos os campos',
                  });
        } else {
            setStep(step + 1);
        }
    }

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
                            setCategory(selectedItem.name)
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
                            setState(selectedItem.sigla);
                        }}
                        renderButton={(selectedItem, isOpened) => {
                            return (
                            <View style={styles.dropdownButtonStyle}>
                                <Text style={styles.dropdownButtonTxtStyle}>
                                {(selectedItem && selectedItem.sigla) || 'Estado'}
                                </Text>
                                <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                            </View>
                            );
                        }}
                        renderItem={(item, index, isSelected) => {
                            return (
                            <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                                <Text style={styles.dropdownItemTxtStyle}>{item.sigla}</Text>
                            </View>
                            );
                        }}
                        dropdownStyle={styles.dropdownMenuStyle}
                        disabled={disableCity}
                        />
                        <Text style={firstStep.text}>Cidade</Text>
                        <SelectDropdown
                        data={cities}

                        onSelect={(selectedItem, index) => {
                            setCity(selectedItem.nome)
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
                            setCategory(selectedItem)
                        }}
                        renderButton={(selectedItem, isOpened) => {
                            return (
                            <View style={styles.dropdownButtonStyle}>
                                <Text style={styles.dropdownButtonTxtStyle}>
                                {(selectedItem && selectedItem) || 'Condição'}
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
                        dropdownStyle={styles.dropdownMenuStyle}
                        />
                        
                        <Text style={firstStep.text}>Condição</Text>
                        <SelectDropdown
                        data={usedOptions}
                        onSelect={(selectedItem, index) => {
                            setState(selectedItem.label);
                        }}
                        renderButton={(selectedItem, isOpened) => {
                            return (
                            <View style={styles.dropdownButtonStyle}>
                                <Text style={styles.dropdownButtonTxtStyle}>
                                {(selectedItem && selectedItem.label) || 'Estado'}
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
                        dropdownStyle={styles.dropdownMenuStyle}
                        disabled={disableCity}
                        />
                        
                        <View style ={styles.ButtonsArea}>
                            <TouchableOpacity
                                style={firstStep.Next}
                                onPress={() => prevStep()}>
                                <Text style ={firstStep.buttomText}>Voltar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={firstStep.Next}
                                onPress={nextStep}>
                                <Text style ={firstStep.buttomText}>Próximo</Text>
                            </TouchableOpacity>
                        </View>
                </View>
        )

        }
      </View>
      </ScrollView>
    </View>
  )
}

export default addProduct