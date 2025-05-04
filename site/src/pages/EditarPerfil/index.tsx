import { useState } from 'react';
import { useUser } from 'contexts/UserContext';
import style from './EditarPerfil.module.scss';

import Header from '../../components/Header';

const EditarPerfil = () => {
    const { user } = useUser();
    const [tab, setTab] = useState<'login' | 'personal' | 'address'>('login');

    return (
        <div className={style.Container}>
            <Header user={user} />

            <div className={style.Tabs}>
                <button className={tab === 'login' ? style.ActiveTab : ''} onClick={() => setTab('login')}>Dados de Login</button>
                <button className={tab === 'personal' ? style.ActiveTab : ''} onClick={() => setTab('personal')}>Dados Pessoais</button>
                <button className={tab === 'address' ? style.ActiveTab : ''} onClick={() => setTab('address')}>Endereço</button>
            </div>

            <div className={style.Content}>
                {tab === 'login' && (
                    <>
                        <h2>Dados de Login</h2>
                        <label>Email</label>
                        <input type="email" defaultValue={user?.email} />
                        <label>Senha</label>
                        <input type="password" placeholder="Nova senha" />
                    </>
                )}
                {tab === 'personal' && (
                    <>
                        <h2>Dados Pessoais</h2>
                        <label>Foto de Perfil</label>
                        <input type="text" defaultValue={user?.profilePic} placeholder="URL da imagem" />
                        <label>Nome</label>
                        <input type="text" defaultValue={user?.personalData.name} />
                        <label>Data de Nascimento</label>
                        <input type="date" defaultValue={user?.personalData.bornDate} />
                        <label>CPF</label>
                        <input type="text" defaultValue={user?.personalData.cpf} />
                        <label>Telefone</label>
                        <input type="text" defaultValue={user?.personalData.phone} />
                    </>
                )}
                {tab === 'address' && (
                    <>
                        <h2>Endereço</h2>
                        <label>Rua</label>
                        <input type="text" defaultValue={user?.personalData.address.road} />
                        <label>Número</label>
                        <input type="text" defaultValue={user?.personalData.address.number} />
                        <label>Bairro</label>
                        <input type="text" defaultValue={user?.personalData.address.neighborhood} />
                        <label>Complemento</label>
                        <input type="text" defaultValue={user?.personalData.address.complement} />
                        <label>Cidade</label>
                        <input type="text" defaultValue={user?.personalData.address.city} />
                        <label>Estado</label>
                        <input type="text" defaultValue={user?.personalData.address.state} />
                        <label>CEP</label>
                        <input type="text" defaultValue={user?.personalData.address.zip} />
                    </>
                )}
            </div>
        </div>
    );
};

export default EditarPerfil;
