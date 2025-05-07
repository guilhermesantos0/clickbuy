import { useEffect, useState, useCallback } from "react"

import { Category } from "@modules/Category";

import style from './css/Anunciar.module.scss';
import firstStep from './css/FirstStep.module.scss';
import secondStep from './css/SecondStep.module.scss';
import thirdStep from './css/ThirdStep.module.scss';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SelectMenu from "../../components/SelectMenu";

import { useUser } from "contexts/UserContext";

import { toast } from "react-toastify";
import { useDropzone } from 'react-dropzone';

import axios from "axios";

import { TrashIcon } from '@radix-ui/react-icons';

interface State {
    id: number,
    sigla: string,
    nome: string
}

interface City {
    id: number,
    nome: string
}

const Anunciar = () => {

    const [step, setStep] = useState(3); 

    const { user } = useUser();

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
            const response = await fetch('http://localhost:5000/categories');

            const categoriesData = await response.json();

            setCategories(categoriesData);
        } catch (error) {
            console.error('Erro ao buscar categorias', error)
        }
        }

        fetchData();
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(user?.personalData.address.city);
        setState(user?.personalData.address.state);

        setDisableCity(event.target.checked);
    }

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

        const number = parseFloat(numeric) / 100;

        return number.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    const prevStep = () => {
        setStep(step - 1)
    }

    const nextStep = () => {
        console.log(category, title, price, state, city)

        if(category == null || title == null || price == "R$ " || state == null || city == null) {
            toast.error('Todos os campos são obrigatórios.')
        } else {
            setStep(step + 1);
        }
    }

    const imageAdd = (file: File) => {

    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setImages(prev => [...prev, ...acceptedFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: true,
    });

    const postProduct = async () => {
        if (images.length === 0 || mainImageIndex === null) {
          alert("Preencha todos os campos e selecione a imagem principal");
          return;
        }
    
        const formData = new FormData();
        formData.append('name', title);
        formData.append('price', price.toString());
        formData.append('location', location);
        formData.append('category', category);
        formData.append('condition', condition);
        formData.append('used', String(used));
        formData.append('announcer', user ? user._id : ''); // Puxar do contexto de usuário
        formData.append('mainImageIndex', mainImageIndex.toString());
    
        images.forEach((img) => {
            formData.append('images', img);
        });
    
        try {
          const response = await axios.post('http://localhost:5000/products', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('Produto cadastrado:', response.data);
        } catch (error) {
          console.error('Erro ao cadastrar produto:', error);
        }
    };

    const handleMainImage = (index: number) => {
        setMainImageIndex(index);
    };

    return (
        <div className={style.Container}>
            <Header user={user}></Header>

                <div className={style.Form}>
                { step === 1 && (
                    <>
                        <h1>Anunciar Produto</h1>
                        <div className={firstStep.FormGrid}>

                            <div className={`${style.InputContainer} ${firstStep.Category}`}>
                                <label htmlFor="category">Categoria</label>
                                <SelectMenu 
                                value={category} 
                                onValueChange={setCategory} 
                                options={categories} 
                                type="category" />
                            </div>

                            <div className={`${style.InputContainer} ${firstStep.Title}`}>
                                <label htmlFor="title">Título</label>
                                <input name="title" type="text" value={title} onChange={e => setTitle(e.target.value)} className={`${style.Input} ${style.InputTitle}`} />
                            </div>

                            <div className={`${style.InputContainer} ${firstStep.Price}`}>
                                <label htmlFor="price">Preço</label>
                                <input name="price" type="string" value={price} onChange={e => setPrice(formatPrice(e.target.value))} className={style.Input} />
                            </div>

                            <div className={`${style.InputContainer} ${firstStep.State}`}>
                                <label htmlFor="state">Estado</label>
                                <SelectMenu 
                                value={state}
                                onValueChange={setState}
                                options={states}
                                type="state"
                                disabled={disableCity} />
                            </div>

                            <div className={`${style.InputContainer} ${firstStep.City}`}>
                                <label htmlFor="city">Cidade</label>
                                <SelectMenu 
                                value={city}
                                onValueChange={setCity}
                                options={cities}
                                type="city"
                                disabled={disableCity} />
                            </div>

                            <div className={firstStep.CheckBox}>
                                <label className={firstStep.CheckBoxLabel} htmlFor="disablecity">Mesma localização da conta?</label>
                                <input
                                className={firstStep.CheckInput}
                                type="checkbox"
                                name="disablecity"
                                id="disablecity"
                                checked={disableCity}
                                onChange={handleChange} />
                            </div>

                            <div className={style.ButtonContainer}><button onClick={nextStep} className={style.Next}>Avançar</button></div>
                            
                        </div>
                    </>
                )}
                {
                    step === 2 && (
                        <>
                            <h1>Qualidade do Produto</h1>
                            <div className={secondStep.Form}>
                                <div className={secondStep.InputContainer}>
                                    <label htmlFor="condition">Qualidade do Produto</label>
                                    <SelectMenu value={condition} onValueChange={setCondition} options={conditionOptions} type="condition" className={secondStep.Input}  />
                                </div>

                                <div className={secondStep.InputContainer}>
                                    <label htmlFor="used">Condição do Produto</label>
                                    <SelectMenu value={used} onValueChange={setUsed} options={usedOptions} type="used" className={secondStep.Input} />
                                </div>
                            </div>

                            <div className={style.ButtonContainer}>
                                <button onClick={prevStep} className={style.Prev}>Voltar</button>
                                <button onClick={nextStep} className={style.Next}>Avançar</button>
                            </div>
                        </>
                    )
                }
                {
                    step === 3 && (
                        <>
                            <h1>Imagens do Produto</h1>
                            <div {...getRootProps()} className={thirdStep.Dropzone}>
                                <input {...getInputProps()} />
                                {isDragActive ? <p>Solte as imagens aqui</p> : <p>Arraste ou clique para enviar imagens</p>}
                            </div>

                            <div className={thirdStep.PreviewContainer}>
                                {images.map((img, index) => (
                                    <div key={index} className={thirdStep.PreviewItem}>
                                        <div
                                            className={`${thirdStep.ImageWrapper} ${mainImageIndex === index ? thirdStep.Main : ''}`}
                                            onClick={() => handleMainImage(index)}
                                        >
                                            <img
                                            src={URL.createObjectURL(img)}
                                            alt={`preview ${index}`}
                                            className={thirdStep.PreviewImage}
                                            />
                                            {mainImageIndex === index && <span className={thirdStep.MainLabel}>Principal</span>}
                                        </div>

                                        <button
                                            type="button"
                                            className={thirdStep.RemoveButton}
                                            onClick={() => {
                                                const updated = images.filter((_, i) => i !== index);
                                                setImages(updated);
                                                if (mainImageIndex === index) setMainImageIndex(null);
                                                else if (mainImageIndex && mainImageIndex > index) setMainImageIndex(prev => prev! - 1);
                                            }}
                                        >
                                            <TrashIcon width={16} height={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className={style.ButtonContainer}>
                                <button onClick={prevStep} className={style.Prev}>Voltar</button>
                                <button onClick={e => {e.preventDefault(); postProduct();}} className={style.Next}>Anunciar!</button>
                            </div>
                        </>
                    )
                }
            </div>
            
            <Footer></Footer>
        </div>
    )
}

export default Anunciar