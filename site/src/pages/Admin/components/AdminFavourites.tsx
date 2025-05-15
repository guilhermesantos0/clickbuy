import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import styles from './AdminFavourites.module.scss';

interface Favourite {
  _id: string;
  user: {
    _id: string;
    email: string;
    personalData?: {
      name: string;
    };
  };
  product: {
    _id: string;
    name: string;
    mainImage: string;
    price: number;
    location: string;
    category: string;
  };
}

const AdminFavourites = () => {
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchFavourites = async () => {
    try {
      const res = await api.get('/favourites');
      setFavourites(res.data);
    } catch (err) {
      console.error('Erro ao carregar favoritos:', err);
    }
  };

  const handleDelete = async (fav: Favourite) => {
    try {
      await api.delete('/favourites', {
        data: {
          userId: fav.user._id,
          productId: fav.product._id,
        },
      });
      setFavourites(prev => prev.filter(f => f._id !== fav._id));
    } catch (err) {
      console.error('Erro ao remover favorito:', err);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Favoritos</h2>
      {favourites.map(fav => (
        <div key={fav._id} className={styles.card}>
          <div
            className={styles.cardHeader}
            onClick={() => setExpanded(prev => (prev === fav._id ? null : fav._id))}
          >
            <strong>{fav.product.name}</strong> – {fav.user.personalData?.name || fav.user.email}
            <span className={styles.expandBtn}>{expanded === fav._id ? '▲' : '▼'}</span>
          </div>
          {expanded === fav._id && (
            <div className={styles.cardContent}>
              <div className={styles.section}>
                <h4>Usuário</h4>
                <p><strong>ID:</strong> {fav.user._id}</p>
                <p><strong>Nome:</strong> {fav.user.personalData?.name || 'Não informado'}</p>
                <p><strong>Email:</strong> {fav.user.email}</p>
              </div>

              <div className={styles.section}>
                <h4>Produto</h4>
                <p><strong>ID:</strong> {fav.product._id}</p>
                <p><strong>Nome:</strong> {fav.product.name}</p>
                <p><strong>Categoria:</strong> {fav.product.category}</p>
                <p><strong>Localização:</strong> {fav.product.location}</p>
                <p><strong>Preço:</strong>{fav.product.price}</p>
                <img
                  className={styles.imagePreview}
                  src={`http://localhost:5000${fav.product.mainImage}`}
                  alt={fav.product.name}
                />
              </div>

              <div className={styles.modalActions}>
                <button onClick={() => handleDelete(fav)}>Remover</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminFavourites;
