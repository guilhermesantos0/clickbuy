import { useEffect, useState } from "react"

import { Category } from "@modules/Category";

import style from './Anunciar.module.scss';

const Anunciar = () => {

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

    return (
        <div>
            <h1>Anunciar Produto</h1>

            <div>
                <div className={style.SelectContainer}>
                    <label htmlFor="category">Categoria</label>
                    <select name="category" id="category">
                    {categories.map((cat) => (
                        <option value={cat._id}>
                            <span>{cat.name}</span>
                        </option>
                    ))}
                    </select>
                </div>
                <div><label htmlFor="brand">Marca</label><input type="text" /></div>
                <div><label htmlFor="price">Preço</label><input type="text" /></div>
                <div><label htmlFor="state">Estado</label><input type="select" /></div>
                <div><label htmlFor="city">Cidade</label><input type="text" /></div>
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
    )
}

export default Anunciar