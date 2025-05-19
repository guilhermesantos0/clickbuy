import { Product as ProductType } from "types/Product"

import style from './Product.module.scss';
import { Link } from "react-router-dom";

import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

import DeleteButton from "../DeleteButton";

import api from "services/api";
import { toast } from "react-toastify";

interface Props {
    product: ProductType,
    onDelete: (id: string) => void;
}

const Product:React.FC<Props> = ({ product, onDelete }) => {

    const handleDelete = async () => {
        console.log('algo')

        const response = await api.delete(`/products/${product._id}`)
        if(response.status == 200) {
            toast.success('Produto deletado com sucesso!')
            onDelete(product._id);
        } else {
            toast.error('Erro ao deletar produto')
        }
    }

    return(
        <div className={style.Overlay}>
            <Link to={`/${product.category}/${product._id}`} className={style.Container}>
                <img className={style.Image} src={`${product.mainImage}`} />
                <div className={style.ProductInfo}>
                    <div className={style.TopSection}>
                        <h2 className={style.Title}>{product.name}</h2>
                    </div>
                    <div className={style.BottomSection}>
                        <h3>{product.price}</h3>
                        <p className={style.Description}>{product.description}</p>
                    </div>
                </div>
            </Link>

            <p className={style.OverlayButtons}>
                <Link className={style.Option} to={`/${product.category}/${product._id}/editar`}><Pencil1Icon className={style.Icon} /></Link>
                {/* <button onClick={handleDelete} className={style.Option}><TrashIcon className={style.Icon} /></button> */}
                <DeleteButton optionClassName={style.Option} iconClassName={style.Icon} onConfirm={handleDelete} product={product.name} />
            </p>
        </div>
    )
}

export default Product