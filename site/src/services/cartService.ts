import { Product } from "@modules/Product";
import api from "./api";
import { User } from "@modules/User";

export const addToCart = async (
    user: User | null,
    setUser: (user: User) => void,
    product: Product
) => {
    if (!user || !product) return;

    console.log(product)

    try {
        // const res = await api.post('/cart/add', {
        //     userId: user._id,
        //     product
        // });

        const updatedCart = [...(user.cart || []), product];
        setUser({ ...user, cart: updatedCart });

        // return res.data;
    } catch (err) {
        console.error("Erro ao adicionar ao carrinho:", err);
        throw err;
    }
};


export async function getPopulatedCart(userId: string): Promise<Product[]> {
    const response = await fetch(`/user/${userId}/cart`);
    if (!response.ok) throw new Error('Erro ao buscar carrinho populado');
    const data = await response.json();
    return data.cart;
}
