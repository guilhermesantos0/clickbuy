import { useLocation, Navigate } from "react-router-dom";
import { Product } from "@modules/Product";

interface LocationState {
    products?: Product[];
}

const CheckoutPage = () => {
    const location = useLocation();
    const state = location.state as LocationState;

    const products = state?.products;

    if (!products || products.length === 0) {
        return <Navigate to="/carrinho" replace />;
    }

    return (
        <div>
        <h1>Resumo da Compra</h1>
        <ul>
            {products.map((product) => (
            <li key={product._id}>
                <strong>{product.name}</strong> - {product.price}
            </li>
            ))}
        </ul>
        </div>
    );
};

export default CheckoutPage;
