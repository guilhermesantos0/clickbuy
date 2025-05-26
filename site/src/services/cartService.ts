import { Product } from "@modules/Product";
import api from "./api";
import { User } from "@modules/User";

export const addToCart = async (
    user: User | null,
    setUser: (user: User) => void,
    product: Product
) => {
    if( !user) throw 1
    if (!product) return;
    
    try {
        const res = await api.post('/cart', {
            userId: user._id,
            productId: product._id
        });

        const updatedCart = [...(user.cart || []), product];
        setUser({ ...user, cart: updatedCart });

        return res.data;
    } catch (err) {
        console.error("Erro ao adicionar ao carrinho:", err);
        throw err;
    }
};

export const removeFromCart = async (
    user: User | null,
    setUser: (user: User) => void,
    product: Product
) => {
    if (!user || !product) return;

    try {
        const res = await api.delete('/cart', {
            data: {
                userId: user._id,
                productId: product._id
            }
        });

        const updatedCart = user.cart.filter(p => p._id !== product._id);
        setUser({ ...user, cart: updatedCart });

        return res.data;
    } catch (err) {
        console.error("Erro ao remover do carrinho:", err);
        throw err;
    }
};


export async function getPopulatedCart(userId: string): Promise<Product[]> {
    const response = await fetch(`/user/${userId}/cart`);
    if (!response.ok) throw new Error('Erro ao buscar carrinho populado');
    const data = await response.json();
    return data.cart;
}
