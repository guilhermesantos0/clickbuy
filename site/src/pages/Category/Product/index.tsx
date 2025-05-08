import { useParams } from "react-router-dom"

const ProductPage = () => {
    const { category, id } = useParams<{ category: string, id: string }>();

    return (
        <div>
            <h1>Produto Id: {id}</h1>
            <p>Categoria: {category}</p>
        </div>
    )
}

export default ProductPage;