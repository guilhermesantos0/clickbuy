import { Toast } from 'react-native-toast-message/lib/src/Toast';
import api from './api';


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