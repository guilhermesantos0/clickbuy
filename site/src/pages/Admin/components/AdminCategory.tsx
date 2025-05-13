import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import styles from './AdminProduct.module.scss'; // Reaproveitando estilos globais
import { Category } from '@modules/Category';

const AdminCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

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

  const toggleExpand = (cat: Category) => {
    const isExpanding = expanded !== cat._id;
    setExpanded(isExpanding ? cat._id : null);
    setFormData(isExpanding ? structuredClone(cat) : {});
  };

  const handleChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (id: number) => {
    try {
      await api.put(`/categories/${id}`, formData);
      setExpanded(null);
      fetchCategories();
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Categorias</h2>
      {categories.map((cat) => (
        <div key={cat._id} className={styles.card}>
          <div className={styles.cardHeader} onClick={() => toggleExpand(cat)}>
            <strong>{cat.name}</strong>
            <span className={styles.expandBtn}>{expanded === cat._id ? "▲" : "▼"}</span>
          </div>
          {expanded === cat._id && (
            <div className={styles.cardContent}>
              <div className={styles.field}>
                <label className={styles.label}>ID</label>
                <input
                  type="text"
                  value={formData._id}
                  onChange={(e) => handleChange('_id', e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Nome</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Ícone</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => handleChange('icon', e.target.value)}
                />
              </div>

              {formData.icon && formData.icon.startsWith("/") && (
                <div className={styles.field}>
                  <label className={styles.label}>Visual do Ícone</label>
                  <img
                    src={`http://localhost:5000${formData.icon}`}
                    alt="Ícone"
                    className={styles.imagePreview}
                  />
                </div>
              )}

              <div className={styles.modalActions}>
                <button onClick={() => handleSave(cat._id)}>Salvar alterações</button>
                <button onClick={() => setExpanded(null)}>Cancelar</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminCategory;
