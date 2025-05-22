import { useLocation, Link } from "react-router-dom";
import { Product } from "@modules/Product";

import Header from "components/Header";
import Footer from "components/Footer";

import { useUser } from "contexts/UserContext";

import style from './Confirm.module.scss';

import { CheckCircledIcon } from "@radix-ui/react-icons";

interface LocationState {
    paymentId: number;
    products?: Product[];
}

const Confirm = () => {
    const location = useLocation();
    const state = location.state as LocationState;

    const { user } = useUser();

    const products = state?.products || [];
    const paymentId = state?.paymentId;

    return (
        <>
            <Header user={user} />
            <div className={style.Container}>
                <CheckCircledIcon className={style.Icon} />
                <h1 className={style.Title}>Pagamento realizado com sucesso!</h1>
                <p style={{ fontSize: "18px", marginTop: "1rem" }}>
                    ID do pagamento: <strong>{paymentId}</strong>
                </p>

                {products.length > 0 ? (
                    <>
                        <h2 className={style.InfoTitle}>📦 Produtos comprados:</h2>
                        <ul className={style.Products}>
                            {products.map((product, index) => (
                                <li
                                    key={index}
                                    className={style.Product}
                                >
                                    <strong>{product.name}</strong>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>Nenhum produto foi informado.</p>
                )}
                <Link to="/" className={style.Button} >Continuar Comprando</Link>
            </div>
            <Footer />
        </>
    );
};

export default Confirm;
