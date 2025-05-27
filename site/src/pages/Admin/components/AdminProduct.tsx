import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import styles from './AdminProduct.module.scss';
import { Product } from '@modules/Product';

import { toast } from 'react-toastify';

const AdminProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

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

  const toggleExpand = (product: Product) => {
    const isExpanding = expanded !== product._id;
    setExpanded(isExpanding ? product._id : null);
    setFormData(isExpanding ? structuredClone(product) : {});
  };

  const handleChange = (path: string, value: any) => {
    const keys = path.split('.');
    setFormData((prev: any) => {
      const newData = { ...prev };
      let current: any = newData;
      keys.forEach((key, i) => {
        if (i === keys.length - 1) {
          current[key] = value;
        } else {
          current[key] = { ...current[key] };
          current = current[key];
        }
      });
      return newData;
    });
  };

  const handleSave = async (id: string) => {
    try {
      await api.put(`/products/2/${id}`, formData);
      setExpanded(null);
      fetchProducts();
      toast.success('Produto editado com sucesso!')
    } catch (error) {
      toast.error('Erro ao salvar produto!')
      console.error('Erro ao salvar produto:', error);
    }
  };

  const renderInput = (label: string, path: string, value: any) => (
    <div className={styles.field} key={path}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.value}
        type="text"
        value={String(value)}
        onChange={(e) => handleChange(path, e.target.value)}
      />
    </div>
  );

  return (
    <div className={styles.container}>
      <h2>Produtos</h2>
      {products.map((product) => (
        <div key={product._id} className={styles.card}>
          <div className={styles.cardHeader} onClick={() => toggleExpand(product)}>
            <strong>{product.name}</strong>
            <span className={styles.expandBtn}>
              {expanded === product._id ? "▲" : "▼"}
            </span>
          </div>
          {expanded === product._id && (
            <div className={styles.cardContent}>
              {renderInput('_id', '_id', formData._id)}
              {renderInput('Nome', 'name', formData.name)}
              {renderInput('Preço', 'price', formData.price)}
              {renderInput('Localização', 'location', formData.location)}
              {renderInput('Categoria', 'category', formData.category)}
              {renderInput('Anunciante', 'announcer', formData.announcer)}
              {renderInput('Descrição', 'description', formData.description)}
              {renderInput('Criado em', 'createdAt', formData.createdAt)}

              {/* Condição */}
              {formData.condition && (
                <>
                  {renderInput('Condição - Qualidade', 'condition.quality', formData.condition.quality)}
                  {renderInput('Condição - Usado', 'condition.used', String(formData.condition.used))}
                </>
              )}

              {/* Imagens */}
              {formData.mainImage && (
                <div className={styles.field}>
                  <label className={styles.label}>Imagem Principal</label>
                  <img
                    src={`${formData.mainImage}`}
                    alt="Main"
                    className={styles.imagePreview}
                  />
                </div>
              )}

              {formData.images && Array.isArray(formData.images) && (
                <div className={styles.field}>
                  <label className={styles.label}>Outras Imagens</label>
                  <div className={styles.imageGrid}>
                    {formData.images.map((img: string, index: number) => (
                      <img
                        key={index}
                        src={`${img}`}
                        alt={`img-${index}`}
                        className={styles.imagePreview}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.modalActions}>
                <button onClick={() => handleSave(product._id)}>Salvar alterações</button>
                <button onClick={() => setExpanded(null)}>Cancelar</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminProduct;