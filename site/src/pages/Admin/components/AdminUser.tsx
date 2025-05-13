import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import styles from './AdminProduct.module.scss'; // Reaproveitando o estilo visual
import { User } from '@modules/User';

import { toast } from 'react-toastify';

const AdminUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get<User[]>('/user');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const toggleExpand = (user: User) => {
    const isExpanding = expanded !== user._id;
    setExpanded(isExpanding ? user._id : null);
    setFormData(isExpanding ? structuredClone(user) : {});
  };

  const handleChange = (path: string, value: any) => {
    const keys = path.split('.');
    setFormData(prev => {
      const newData = { ...prev };
      let current = newData;
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
      await api.put(`/user/${id}`, formData);
      setExpanded(null);
      fetchUsers();
      toast.success('Usuário editado com sucesso!')
    } catch (error) {
      toast.error('Erro ao salvar usuário!')
      console.error('Erro ao salvar usuário:', error);
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
      <h2>Usuários</h2>
      {users.map((user) => (
        <div key={user._id} className={styles.card}>
          <div className={styles.cardHeader} onClick={() => toggleExpand(user)}>
            <strong>{user.personalData.name}</strong>
            <span className={styles.expandBtn}>
              {expanded === user._id ? "▲" : "▼"}
            </span>
          </div>
          {expanded === user._id && (
            <div className={styles.cardContent}>
              {renderInput('_id', '_id', formData._id)}
              {renderInput('Email', 'email', formData.email)}
              {renderInput('Senha', 'password', formData.password)}
              {formData.profilePic && (
                <div className={styles.field}>
                  <label className={styles.label}>Imagem de Perfil</label>
                  <img
                    src={`http://localhost:5000${formData.profilePic}`}
                    alt="Perfil"
                    className={styles.imagePreview}
                  />
                </div>
              )}

              {/* Dados Pessoais */}
              {formData.personalData && (
                <>
                  {renderInput('Nome', 'personalData.name', formData.personalData.name)}
                  {renderInput('Nascimento', 'personalData.bornDate', formData.personalData.bornDate)}
                  {renderInput('CPF', 'personalData.cpf', formData.personalData.cpf)}
                  {renderInput('Telefone', 'personalData.phone', formData.personalData.phone)}
                </>
              )}

              {/* Endereço */}
              {formData.personalData?.address && (
                <>
                  {renderInput('Rua', 'personalData.address.road', formData.personalData.address.road)}
                  {renderInput('Número', 'personalData.address.number', formData.personalData.address.number)}
                  {renderInput('Cidade', 'personalData.address.city', formData.personalData.address.city)}
                  {renderInput('Estado', 'personalData.address.state', formData.personalData.address.state)}
                  {renderInput('CEP', 'personalData.address.zip', formData.personalData.address.zip)}
                  {renderInput('Complemento', 'personalData.address.complement', formData.personalData.address.complement)}
                  {renderInput('Bairro', 'personalData.address.neighborhood', formData.personalData.address.neighborhood)}
                </>
              )}

              <div className={styles.modalActions}>
                <button onClick={() => handleSave(user._id)}>Salvar alterações</button>
                <button onClick={() => setExpanded(null)}>Cancelar</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminUser;
