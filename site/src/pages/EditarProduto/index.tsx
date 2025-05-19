import { useEffect, useState, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom";

import { Category } from "@modules/Category";

import style from './css/EditarProduto.module.scss';
import firstStep from './css/FirstTab.module.scss';
import secondStep from './css/SecondTab.module.scss';
import thirdStep from './css/ThirdTab.module.scss';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SelectMenu from "../../components/SelectMenu";

import { useUser } from "contexts/UserContext";

import { toast } from "react-toastify";
import { useDropzone } from 'react-dropzone';

import { TrashIcon } from '@radix-ui/react-icons';

import api from "services/api";
import { Product } from "types/Product";

interface State {
    id: number,
    sigla: string,
    nome: string
}

interface City {
    id: number,
    nome: string
}

const EditarProduto = () => {
    const { user } = useUser();
    const { id } = useParams<{ category: string, id: string }>();

    const [step, setStep] = useState(1); 

    const [product, setProduct] = useState<Product>();
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState<any>();

    const [state, setState] = useState<any | undefined>('');
    const [city, setCity] = useState<any | undefined>('');
    const [disableCity, setDisableCity] = useState(false);

    const [existingImages, setExistingImages] = useState<String[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [imagesToRemove, setImagesToRemove] = useState<String[]>([]);


    const [formData, setFormData] = useState<Product | null>(null);

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

    useEffect(() => {
        if(product) {
            const productLocation = product?.location.split(',');
            setCity(productLocation[0])
            setState(productLocation[1].trim())
         
            setFormData(structuredClone(product));
            setExistingImages([...product.images]);
        }
    },[product])

    useEffect(() => {
        if(product && categories) {
            categories.forEach((i) => {
                if(product.category === i.name) {
                    setCategory(i._id.toString())
                }
            })
        }
    }, [product, categories])

    useEffect(() => {
        if(product) {
            product.images.forEach((i, idx) => {
                if(product.mainImage === i) {
                    setMainImageIndex(idx)
                }
            })
        }
    }, [product])

    const updateField = (path: string, value: any) => {
        if (!formData) return;
        const keys = path.split('.');

        const updated = structuredClone(formData);
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

    const [condition, setCondition] = useState<string>('');
    const [used, setUsed] = useState<boolean>(false);


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

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setNewImages(prev => [...prev, ...acceptedFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: true,
    });

    const handleMainImage = (index: number) => {
        setMainImageIndex(index);
    };

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
            setMainImageIndex(prev => prev! - 1);
        }
    };


    const handleSave = async () => {
        if (!formData) return;

        try {
            const productCopy = structuredClone(formData);

            const formDataToSend = new FormData();
            formDataToSend.append('data', JSON.stringify({
                ...productCopy,
                imagesToRemove,
                mainImageIndex
            }));

            newImages.forEach((img) => {
                formDataToSend.append('images', img);
            });

            const res = await api.put(`/products/${productCopy._id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Alterações realizadas com sucesso!');
        } catch (err) {
            console.error("Erro ao salvar:", err);
            toast.error('Erro ao salvar os dados!');
        }
    };


    return (
        <div className={style.Container}>
            <Header user={user}></Header>

                <div className={`${style.Form} ${step === 1 ? style.FirstStep : ''}`}>
                    <div className={style.Tabs} style={{ "--active-tab-index": step - 2 } as React.CSSProperties}>
                        <div className={`${style.Tab} ${step === 1 ? style.ActiveTab : ''}`} onClick={() => setStep(1)}>Informações Gerais</div>
                        <div className={`${style.Tab} ${step === 2 ? style.ActiveTab : ''}`} onClick={() => setStep(2)}>Qualidade</div>
                        <div className={`${style.Tab} ${step === 3 ? style.ActiveTab : ''}`} onClick={() => setStep(3)}>Galeria de Imagens</div>
                    </div>
                { formData && step === 1 && (
                    <>
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
                                <input 
                                name="title" 
                                type="text" 
                                value={formData.name} 
                                onChange={(e) => updateField("name", e.target.value)} 
                                className={`${style.Input} ${style.InputTitle}`} 
                                />
                            </div>

                            <div className={`${style.InputContainer} ${firstStep.Price}`}>
                                <label htmlFor="price">Preço</label>
                                <input 
                                name="price" 
                                type="string" 
                                value={formData.price} 
                                onChange={(e) => updateField("price", formatPrice(e.target.value))} 
                                className={style.Input} />
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

                            <div className={`${style.InputContainer} ${firstStep.Description}`}>
                                <label htmlFor="description">Descrição</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => updateField("description", e.target.value)} 
                                    className={`${style.Input} ${firstStep.TextArea}`}
                                    // placeholder="Descreva os detalhes do produto..."
                                />
                            </div>

                        </div>
                    </>
                )}
                {
                    formData && step === 2 && (
                        <>
                            <div className={secondStep.Form}>
                                <div className={secondStep.InputContainer}>
                                    <label htmlFor="condition">Qualidade do Produto</label>
                                    <SelectMenu 
                                    value={formData.condition.quality} 
                                    onValueChange={setCondition} 
                                    options={conditionOptions} 
                                    type="condition" 
                                    className={secondStep.Input}  />
                                </div>

                                <div className={secondStep.InputContainer}>
                                    <label htmlFor="used">Condição do Produto</label>
                                    <SelectMenu 
                                    value={formData.condition.used} 
                                    onValueChange={setUsed} 
                                    options={usedOptions} 
                                    type="used" 
                                    className={secondStep.Input} />
                                </div>
                            </div>
                        </>
                    )
                }
                {
                    formData && step === 3 && (
                        <>
                            <div {...getRootProps()} className={thirdStep.Dropzone}>
                                <input {...getInputProps()} />
                                {isDragActive ? <p>Solte as imagens aqui</p> : <p>Arraste ou clique para enviar imagens</p>}
                            </div>

                            <div className={thirdStep.PreviewContainer}>
                                {existingImages.map((img, index) => (
                                    <div key={`existing-${index}`} className={thirdStep.PreviewItem}>
                                        <div
                                            className={`${thirdStep.ImageWrapper} ${mainImageIndex === index ? thirdStep.Main : ''}`}
                                            onClick={() => handleMainImage(index)}
                                        >
                                            <img
                                                src={`${img}`}
                                                alt={`preview ${index}`}
                                                className={thirdStep.PreviewImage}
                                            />
                                            {mainImageIndex === index && <span className={thirdStep.MainLabel}>Principal</span>}
                                        </div>
                                        <button
                                            type="button"
                                            className={thirdStep.RemoveButton}
                                            onClick={() => removeImage(index, 'existing')}
                                        >
                                            <TrashIcon width={16} height={16} />
                                        </button>
                                    </div>
                                ))}

                                {newImages.map((img, index) => (
                                    <div key={`new-${index}`} className={thirdStep.PreviewItem}>
                                        <div className={thirdStep.ImageWrapper}>
                                            <img
                                                src={URL.createObjectURL(img)}
                                                alt={`new-${index}`}
                                                className={thirdStep.PreviewImage}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            className={thirdStep.RemoveButton}
                                            onClick={() => removeImage(index, 'new')}
                                        >
                                            <TrashIcon width={16} height={16} />
                                        </button>
                                    </div>
                                ))}

                            </div>
                        </>
                    )
                }
                <div className={style.ButtonsArea}>
                    <button className={style.Save} onClick={handleSave}>Salvar</button>
                    <button className={style.Cancel}>Cancelar</button>
                </div>
            </div>
            
            <Footer></Footer>
        </div>
    )
}

export default EditarProduto