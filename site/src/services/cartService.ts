import api from "./api";
import { User } from "@modules/User";

export const addToCart = async (
    user: User | null,
    setUser: (user: User) => void,
    productId: string
) => {
    if (!user || !productId) return;

    try {
        const res = await api.post('/cart/add', {
            userId: user._id,
            productId
        });

        const updatedCart = [...(user.cart || []), productId];
        setUser({ ...user, cart: updatedCart });

        return res.data;
    } catch (err) {
        console.error("Erro ao adicionar ao carrinho:", err);
        throw err;
    }
};
