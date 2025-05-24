import api from './api';

import { toast } from 'react-toastify';

export const addToFavourites = async (userId: string | undefined, productId: string | undefined) => {
    if(!userId) {
        throw 1
    }
    try {

        const res = await api.post('/favourites', { userId, productId });
        toast.success('Adicionado aos Favoritos!')
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
        toast.warning('Removido dos Favoritos!')
        return res.data;
    } catch (error) {
        console.error("Erro ao remover favorito:", error);
        throw error;
    }
};

export const getUserFavourites = async (userId: string | undefined) => {
    try {
        const userFavourites = [];
        const res = await api.get(`/favourites/user/${userId}`);

        res.data.forEach((r: any) => {
            userFavourites.push(r)
        })

        return res.data;
    } catch (err) {
        console.error("Erro ao buscar favoritos do usuário: " ,err);
        throw err;
    }
}

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