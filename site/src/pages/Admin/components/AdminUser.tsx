// src/components/AdminUser.tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import styles from './AdminUser.module.scss';
import { User } from '@modules/User';

const AdminUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});

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

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setFormData(user);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!editingUser) return;
    try {
      await api.put(`/user/${editingUser._id}`, formData);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Gerenciar Usuários</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.personalData.name}</td>
              <td>{user.email}</td>
              <td>{user.personalData.cpf}</td>
              <td>{user.personalData.phone}</td>
              <td>
                <button onClick={() => handleEditClick(user)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className={styles.modal}>
          <h3>Editar Usuário</h3>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={formData.personalData?.name || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            CPF:
            <input
              type="text"
              name="cpf"
              value={formData.personalData?.cpf || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Telefone:
            <input
              type="text"
              name="phone"
              value={formData.personalData?.phone || ''}
              onChange={handleInputChange}
            />
          </label>
          <div className={styles.modalActions}>
            <button onClick={handleSave}>Salvar</button>
            <button onClick={() => setEditingUser(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUser;
