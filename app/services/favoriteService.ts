import { Toast } from 'react-native-toast-message/lib/src/Toast';
import api from './api';
import ip from '@/ip';


export const addToFavourites = async (userId: string | undefined, productId: string | undefined) => {
    try {
        const res = await api.post('/favourites', { userId, productId });
        Toast.show({
                  type: 'success',
                  text1: 'Adicionado aos Favoritos!',
                });
        return res.data;
    } catch (error) {
        console.error("Erro ao adicionar favorito:", error);
        throw error;
    }
};

export const removeFromFavourites = async (userId: string | undefined, productId: string | undefined) => {
    try {
        const res = await api.delete('/favourites', {
            data: { userId, productId },
        });
        Toast.show({
                  type: 'warning',
                  text1: 'Removido dos Favoritos!',
                });
        return res.data;
    } catch (error) {
        console.error("Erro ao remover favorito:", error);
        throw error;
    }
};

export const getUserFavourites = async (userId: string | undefined) => {
    try {
        if (!userId) throw new Error("ID do usuário é indefinido");

        const res = await fetch(`http://${ip}:5000/favourites/user/${userId}`);
        if (!res.ok) {
            throw new Error(`Erro na resposta: ${res.status}`);
        }

        const data = await res.json();

        return data;
    } catch (err) {
        console.error("Erro ao buscar favoritos do usuário:", err);
        throw err;
    }
};


export const getProductFavourites = async (productId: string) => {
    try {
        const res = await api.get(`/favourites/product/${productId}`);
        return res.data;
    } catch (err) {
        console.error("Erro ao buscar favoritados do produto:", err);
        throw err;
    }
}

export const getUserFavouriteProducts = async (userId: string | undefined) => {
    try {
        const res = await api.get(`/favourites/products/${userId}`);
        return res.data;
    } catch (error) {
        console.error("Erro ao buscar produtos favoritos ", error)
        throw error
    }
}