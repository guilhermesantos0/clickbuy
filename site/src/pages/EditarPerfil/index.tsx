import { useState } from 'react';
import { useUser } from 'contexts/UserContext';

import style from './css/EditarPerfil.module.scss';
import firstTab from './css/FirstTab.module.scss';
import secondTab from './css/SecondTab.module.scss'
import thirdTab from './css/ThirdTab.module.scss';

import Header from '../../components/Header';
import ProfilePictureEditor from '../../components/ProfilePictureEditor';

import { formatPhoneNumber, formatCEP, formatCPF } from 'utils/formatters';

const EditarPerfil = () => {
    const { user } = useUser();
    const [tab, setTab] = useState(2);

    const genericPhoto = "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
    const [profileImage, setProfileImage] = useState(user?.profilePic ? `http://localhost:5000${user?.profilePic}` : genericPhoto);

    const handleImageChange = (file: File) => {
        const imageUrl = URL.createObjectURL(file);
        setProfileImage(imageUrl);
    };

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
                        <div className={style.InputGroup}>
                            <label>Email</label>
                            <input className={style.Input} type="email" value={user?.email} />
                        </div>
                        <div className={style.InputGroup}>
                            <label>Senha</label>
                            <input className={style.Input} type="password" value={user?.password} placeholder="Nova senha" />
                        </div>
                    </div>
                )}
                {tab === 2 && (
                    <div className={secondTab.Container}>
                        {/* <div className={`${secondTab.InputGroup} ${secondTab.ProfilePic}`}>
                            <label>Foto de Perfil</label>
                            <input className={style.Input} type="text" value={user?.profilePic} placeholder="URL da imagem" />
                        </div> */}
                        <ProfilePictureEditor currentImage={profileImage} onImageChange={handleImageChange} />
                        <div className={`${style.InputGroup} ${secondTab.Name}`}>
                            <label>Nome</label>
                            <input className={style.Input} type="text" value={user?.personalData.name} />
                        </div>
                        <div className={`${style.InputGroup} ${secondTab.BornDate}`}>
                            <label>Data de Nascimento</label>
                            <input className={style.Input} type="text" value={user?.personalData.bornDate} />
                        </div>
                        <div className={`${style.InputGroup} ${secondTab.Cpf}`}>
                            <label>CPF</label>
                            <input className={style.Input} type="text" value={user?.personalData.cpf} />
                        </div>
                        <div className={`${style.InputGroup} ${secondTab.Phone}`}>
                            <label>Telefone</label>
                            <input className={style.Input} type="text" value={user?.personalData.phone} />
                        </div>
                    </div>
                )}
                {tab === 3 && (
                    <div className={thirdTab.Container}>
                        <div className={`${style.InputGroup} ${thirdTab.Road}`}>
                            <label>Rua</label>
                            <input className={style.Input} type="text" defaultValue={user?.personalData.address.road} />
                        </div>
                        <div className={`${style.InputGroup} ${thirdTab.Number}`}>
                            <label>Número</label>
                            <input className={style.Input} type="text" defaultValue={user?.personalData.address.number} />
                        </div>
                        <div className={`${style.InputGroup} ${thirdTab.Neighborhood}`}>
                            <label>Bairro</label>
                            <input className={style.Input} type="text" defaultValue={user?.personalData.address.neighborhood} />
                        </div>
                        <div className={`${style.InputGroup} ${thirdTab.Complement}`}>
                            <label>Complemento</label>
                            <input className={style.Input} type="text" defaultValue={user?.personalData.address.complement} />
                        </div>
                        <div className={`${style.InputGroup} ${thirdTab.City}`}>
                            <label>Cidade</label>
                            <input className={style.Input} type="text" defaultValue={user?.personalData.address.city} />
                        </div>
                        <div className={`${style.InputGroup} ${thirdTab.State}`}>
                            <label>Estado</label>
                            <input className={style.Input} type="text" defaultValue={user?.personalData.address.state} />
                        </div>
                        <div className={`${style.InputGroup} ${thirdTab.Zip}`}>
                            <label>CEP</label>
                            <input className={style.Input} type="text" defaultValue={user?.personalData.address.zip} />
                        </div>
                    </div>
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
