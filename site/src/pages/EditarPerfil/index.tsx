import { useState } from 'react';
import { useUser } from 'contexts/UserContext';

import style from './css/EditarPerfil.module.scss';
import firstTab from './css/FirstTab.module.scss';
import secondTab from './css/SecondTab.module.scss'

import Header from '../../components/Header';

const EditarPerfil = () => {
    const { user } = useUser();
    const [tab, setTab] = useState(1);

    return (
        <div className={style.Container}>
            <Header hideOptions={true} user={user} />
            <div className={style.PageContent}>

                <div className={style.Tabs} style={{ "--active-tab-index": tab - 2 } as React.CSSProperties}>
                    <div className={`${style.Tab} ${tab === 1 ? style.ActiveTab : ''}`} onClick={() => setTab(1)}>Dados de Login</div>
                    <div className={`${style.Tab} ${tab === 2 ? style.ActiveTab : ''}`} onClick={() => setTab(2)}>Dados Pessoais</div>
                    <div className={`${style.Tab} ${tab === 3 ? style.ActiveTab : ''}`} onClick={() => setTab(3)}>Endereço</div>
                </div>

                {tab === 1 && (
                    <div className={firstTab.Container}>
                        <div className={firstTab.InputGroup}>
                            <label>Email</label>
                            <input className={firstTab.Input} type="email" value={user?.email} />
                        </div>
                        <div className={firstTab.InputGroup}>
                            <label>Senha</label>
                            <input className={firstTab.Input} type="password" value={user?.password} placeholder="Nova senha" />
                        </div>
                    </div>
                )}
                {tab === 2 && (
                    <div className={secondTab.Container}>
                        <div className={style.InputGroup}>
                            <label>Foto de Perfil</label>
                            <input type="text" value={user?.profilePic} placeholder="URL da imagem" />
                        </div>
                        <div className={style.InputGroup}>
                            <label>Nome</label>
                            <input type="text" value={user?.personalData.name} />

                        </div>
                        <div className={style.InputGroup}>
                            <label>Data de Nascimento</label>
                            <input type="date" value={user?.personalData.bornDate} />
                        </div>
                        <div className={style.InputGroup}>
                            <label>CPF</label>
                            <input type="text" value={user?.personalData.cpf} />
                        </div>
                        <div className={style.InputGroup}>
                            <label>Telefone</label>
                            <input type="text" value={user?.personalData.phone} />
                        </div>
                    </div>
                )}
                {tab === 3 && (
                    <>
                        <div className={style.InputGroup}>
                            <label>Rua</label>
                            <input type="text" defaultValue={user?.personalData.address.road} />
                        </div>
                        <div className={style.InputGroup}>
                            <label>Número</label>
                            <input type="text" defaultValue={user?.personalData.address.number} />
                        </div>
                        <div className={style.InputGroup}>
                            <label>Bairro</label>
                            <input type="text" defaultValue={user?.personalData.address.neighborhood} />
                        </div>
                        <div className={style.InputGroup}>
                            <label>Complemento</label>
                            <input type="text" defaultValue={user?.personalData.address.complement} />
                        </div>
                        <div className={style.InputGroup}>
                            <label>Cidade</label>
                            <input type="text" defaultValue={user?.personalData.address.city} />
                        </div>
                        <div className={style.InputGroup}>
                            <label>Estado</label>
                            <input type="text" defaultValue={user?.personalData.address.state} />
                        </div>
                        <div className={style.InputGroup}>
                            <label>CEP</label>
                            <input type="text" defaultValue={user?.personalData.address.zip} />
                        </div>
                    </>
                )}
                <div className={style.ButtonsArea}>
                    <button className={style.Save}>Salvar</button>
                    <button className={style.Cancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default EditarPerfil;
