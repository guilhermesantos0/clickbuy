import { Product as ProductType } from "types/Product"

import style from './Product.module.scss';
import { Link } from "react-router-dom";

import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

import api from "services/api";
import { toast } from "react-toastify";

interface Props {
    product: ProductType
}

const Product:React.FC<Props> = ({ product }) => {

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        const response = await api.delete(`/products/${product._id}`)
        if(response.status == 200) {
            toast.success('Produto deletado com sucesso!')
        } else {
            toast.error('Erro ao deletar produto')
        }
    }

    return(
        <Link to={`/${product.category}/${product._id}`} className={style.Container}>
            <img className={style.Image} src={`http://localhost:5000${product.mainImage}`} />
            <div className={style.ProductInfo}>
                <div className={style.TopSection}>
                    <h2 className={style.Title}>{product.name}</h2>
                    <p className={style.Options}>
                        <Link className={style.Option} to={`/${product.category}/${product._id}/editar`}><Pencil1Icon className={style.Icon} /></Link>
                        <button onClick={handleDelete} className={style.Option}><TrashIcon className={style.Icon} /></button>
                    </p>
                </div>
                <div className={style.BottomSection}>
                    <h3>{product.price}</h3>
                    <p className={style.Description}>{product.description}</p>
                </div>
            </div>
        </Link>
    )
}

export default Product