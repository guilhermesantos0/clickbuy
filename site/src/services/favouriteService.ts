import { Product } from "@modules/Product";
import { User } from "@modules/User";
import api from "./api";
import { toast } from "react-toastify";

export const addToFavourites = async (
    user: User | null,
    setUser: (user: User) => void,
    product: Product
) => {
    if (!user) throw new Error("Usuário não encontrado");
    if (!product) return;

    try {
        const res = await api.post('/favourites', {
            userId: user._id,
            productId: product._id
        });

        const updatedFavourites = [...(user.favourites || []), product];
        setUser({ ...user, favourites: updatedFavourites });

        toast.success('Adicionado aos Favoritos!');
        return res.data;
    } catch (error) {
        console.error("Erro ao adicionar favorito:", error);
        throw error;
    }
};

export const removeFromFavourites = async (
    user: User | null,
    setUser: (user: User) => void,
    product: Product
) => {
    if (!user || !product) return;

    try {
        const res = await api.delete('/favourites', {
            data: {
                userId: user._id,
                productId: product._id
            }
        });

        const updatedFavourites = user.favourites.filter(p => p._id !== product._id);
        setUser({ ...user, favourites: updatedFavourites });

        toast.warning('Removido dos Favoritos!');
        return res.data;
    } catch (error) {
        console.error("Erro ao remover favorito:", error);
        throw error;
    }
};

export async function getUserFavouriteProducts(userId: string): Promise<Product[]> {
    try {
        const response = await api.get(`/user/${userId}/favourites`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar produtos favoritos:", error);
        throw error;
    }
}

export async function getProductFavourites(productId: string): Promise<User[]> {
    try {
        const response = await api.get(`/products/${productId}/favourites`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar favoritados do produto:", error);
        throw error;
    }
}
