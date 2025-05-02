import { useEffect, useState } from 'react';
import style from './Admin.module.scss';

import { toast } from 'react-toastify';

interface Admin__User {
  _id: string;
  email: string;
  password: string;
  profilePic?: string;
  personalData: {
    name: string;
    bornDate: string;
    cpf: string;
    phone: string;
    address: {
      road: string;
      number: string;
      city: string;
      state: string;
      zip: string;
      complement: string;
      neighborhood: string;
    }
  }
}

interface Admin__Product {
  _id: string;
  name: string;
  images: string[];
  mainImage: string;
  price: number;
  location: string;
}

interface Admin__Category {
  _id: number;
  name: string;
  icon: string;
}

const Admin = () => {
  const [users, setUsers] = useState<Admin__User[]>([]);
  const [products, setProducts] = useState<Admin__Product[]>([]);
  const [categories, setCategories] = useState<Admin__Category[]>([]);

  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, productsResponse, categoriesResponse] = await Promise.all([
          fetch('http://localhost:5000/user'),
          fetch('http://localhost:5000/products'),
          fetch('http://localhost:5000/categories')
        ]);

        const usersData = await usersResponse.json();
        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setUsers(usersData);
        setProducts(productsData);
        setCategories(categoriesData);

      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const toggleExpandUser = (userId: string) => {
    setExpandedUserId(prev => (prev === userId ? null : userId));
  };

  const toggleExpandProduct = (productId: string) => {
    setExpandedProductId(prev => (prev === productId ? null : productId));
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja deletar este usuário?')) return;
  
    try {
      await fetch(`http://localhost:5000/user/${id}`, { method: 'DELETE' });
      setUsers(prev => prev.filter(user => user._id !== id));
      toast.success('Usuário deletado com sucesso!');
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        toast.error('Erro ao deletar, olhe o console!');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja deletar este produto?')) return;
  
    try {
      await fetch(`http://localhost:5000/products/${id}`, { method: 'DELETE' });
      setProducts(prev => prev.filter(product => product._id !== id));
      toast.success('Produto deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      toast.error('Erro ao deletar, olhe o console!')
    }
  }

  return (
    <div className={style.Container}>
      <h1 className={style.Title}>Painel Administrativo</h1>

      {/* Tabela de Usuários */}
      <h2 className={style.Subtitle}>Usuários</h2>
      {users.length === 0 ? (
        <p>Carregando usuários...</p>
      ) : (
        <table className={style.Table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>Cidade</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <>
                <tr
                  key={user._id}
                  className={style.Row}
                  onClick={() => toggleExpandUser(user._id)}
                >
                  <td>{user._id}</td>
                  <td>{user.personalData.name}</td>
                  <td>{user.email}</td>
                  <td>{user.personalData.cpf}</td>
                  <td>{user.personalData.phone}</td>
                  <td>{user.personalData.address.city}</td>
                  <td>{user.personalData.address.state}</td>
                </tr>

                {expandedUserId === user._id && (
                  <tr className={style.DetailsRow}>
                    <td colSpan={7}>
                      <div className={style.Details}>
                        <p><strong>Data de Nascimento:</strong> {user.personalData.bornDate}</p>
                        <p><strong>Endereço:</strong> {user.personalData.address.road}, {user.personalData.address.number} - {user.personalData.address.neighborhood}</p>
                        <p><strong>CEP:</strong> {user.personalData.address.zip}</p>
                        <p><strong>Complemento:</strong> {user.personalData.address.complement}</p>
                        {user.profilePic && (
                          <img src={user.profilePic} alt="Foto de perfil" className={style.ProfilePic} />
                        )}
                      </div>
                    </td>
                    <td>
                        <button className={style.DeleteButton} onClick={(e) => { e.stopPropagation(); handleDeleteUser(user._id); }}>
                            🗑️
                        </button>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      )}

      {/* Tabela de Produtos */}
      <h2 className={style.Subtitle}>Produtos</h2>
      {products.length === 0 ? (
        <p>Carregando produtos...</p>
      ) : (
        <table className={style.Table}>
          <thead>
            <tr>
              <th>Imagem Principal</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Localização</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <>
                <tr
                  key={product._id}
                  className={style.Row}
                  onClick={() => toggleExpandProduct(product._id)}
                >
                  <td>
                    <img
                      src={product.mainImage}
                      alt="Principal"
                      className={style.ProductImage}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>R$ {product.price.toFixed(2)}</td>
                  <td>{product.location}</td>
                </tr>

                {expandedProductId === product._id && (
                  <tr className={style.DetailsRow}>
                    <td colSpan={4}>
                      <div className={style.Details}>
                        <h3>Galeria de Imagens</h3>
                        <div className={style.Gallery}>
                          {product.images.map((img, index) => (
                            <img key={index} src={img} alt={`Imagem ${index + 1}`} className={style.GalleryImage} />
                          ))}
                        </div>
                      </div>
                    </td>
                    <td>
                        <button className={style.DeleteButton} onClick={(e) => { e.stopPropagation(); handleDeleteProduct(product._id); }}>
                        🗑️
                        </button>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      )}

      <h2 className={style.Subtitle}>Categorias</h2>
      {categories.length === 0 ? (
        <p>Carregando categorias...</p>
      ) : (
        <div className={style.CategoryGrid}>
          {categories.map((cat) => (
            <div key={cat._id} className={style.CategoryCard}>
              <img src={`http://localhost:5000${cat.icon}`} alt={cat.name} className={style.CategoryImage} />
              <span className={style.CategoryName}>{cat.name}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Admin;