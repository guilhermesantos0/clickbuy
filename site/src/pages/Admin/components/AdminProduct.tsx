// src/components/AdminProduct.tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import styles from './AdminProduct.module.scss';
import { Product } from '@modules/Product';

const AdminProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get<Product[]>('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!editingProduct) return;
    try {
      await api.put(`/products/${editingProduct._id}`, formData);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Gerenciar Produtos</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Localização</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod._id}>
              <td>{prod.name}</td>
              <td>R$ {prod.price}</td>
              <td>{prod.location}</td>
              <td>{prod.category}</td>
              <td>
                <button onClick={() => handleEditClick(prod)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingProduct && (
        <div className={styles.modal}>
          <h3>Editar Produto</h3>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              name="price"
              value={formData.price || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Localização:
            <input
              type="text"
              name="location"
              value={formData.location || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Categoria:
            <input
              type="text"
              name="category"
              value={formData.category || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Descrição:
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
            />
          </label>
          <div className={styles.modalActions}>
            <button onClick={handleSave}>Salvar</button>
            <button onClick={() => setEditingProduct(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProduct;
