import { useEffect, useState } from "react"

import { Category } from "@modules/Category";

import style from './Anunciar.module.scss';

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { useUser } from "contexts/UserContext";

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

    const { user } = useUser();

    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);

    const [category, setCategory] = useState<string>();
    const [title, setTitle] = useState<string>();
    const [price, setPrice] = useState<any>('R$ ');
    const [state, setState] = useState<string | undefined>('');
    const [city, setCity] = useState<string | undefined>('');
    const [disableCity, setDisableCity] = useState(false);

    const [categories, setCategories] = useState<Category[]>([]);

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
        <div className={style.Container}>
            <Header user={user}></Header>

            <div className={style.Form}>
                <h1>Anunciar Produto</h1>
                <div className={style.FormGrid}>
                    <div className={`${style.InputContainer} ${style.Category}`}>
                        <label htmlFor="category">Categoria</label>
                        <select name="category" id="category" value={category} className={style.Input} onChange={e => { setCategory(e.target.value) }}>
                            {categories.map((cat) => (
                                <option className={style.SelectOption} key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={`${style.InputContainer} ${style.Title}`}>
                        <label htmlFor="title">Título</label>
                        <input name="title" type="text" value={title} onChange={e => setTitle(e.target.value)} className={`${style.Input} ${style.InputTitle}`} />
                    </div>
                    <div className={`${style.InputContainer} ${style.Price}`}>
                        <label htmlFor="price">Preço</label>
                        <input name="price" type="string" value={price} onChange={e => setPrice(formatPrice(e.target.value))} className={style.Input} />
                    </div>
                    <div className={`${style.InputContainer} ${style.State}`}>
                        <label htmlFor="state">Estado</label>
                        <select name="state" id="state" className={style.Input} value={state} disabled={disableCity} onChange={e => { setState(e.target.value); setCity('') }}>
                            {states.map(stt => (
                                <option key={stt.id} value={stt.sigla}>{stt.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className={`${style.InputContainer} ${style.City}`}>
                        <label htmlFor="city">Cidade</label>
                        <select name="city" id="city" className={style.Input} value={city} disabled={disableCity} onChange={e => { setCity(e.target.value) }}>
                            {cities.map(ct => (
                                <option key={ct.id} value={ct.nome}>{ct.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className={style.CheckBox}>
                        <label className={style.CheckBoxLabel} htmlFor="disablecity">Mesma localização da conta?</label>
                        <input
                            className={style.CheckInput}
                            type="checkbox"
                            name="disablecity"
                            id="disablecity"
                            checked={disableCity}
                            onChange={handleChange}
                        />
                    </div>

                </div>

                <div>
                    <h1>Adicionar Fotos</h1>
                    <div>
                        <img src="" alt="" />
                        <img src="" alt="" />
                        <img src="" alt="" />
                        <img src="" alt="" />
                        <img src="" alt="" />
                    </div>
                </div>

                <button>Anunciar</button>

            </div>
            <Footer></Footer>
        </div>
    )
}

export default Anunciar