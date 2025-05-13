// src/components/AdminCategory.tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import styles from './AdminCategory.module.scss';
import { Category } from '@modules/Category';

const AdminCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<Partial<Category>>({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get<Category[]>('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setFormData(category);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!editingCategory) return;
    try {
      await api.put(`/categories/${editingCategory._id}`, formData);
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Gerenciar Categorias</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ícone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat._id}>
              <td>{cat.name}</td>
              <td>{cat.icon}</td>
              <td>
                <button onClick={() => handleEditClick(cat)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingCategory && (
        <div className={styles.modal}>
          <h3>Editar Categoria</h3>
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
            Ícone:
            <input
              type="text"
              name="icon"
              value={formData.icon || ''}
              onChange={handleInputChange}
            />
          </label>
          <div className={styles.modalActions}>
            <button onClick={handleSave}>Salvar</button>
            <button onClick={() => setEditingCategory(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategory;
