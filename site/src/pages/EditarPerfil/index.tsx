import { useEffect, useState } from 'react';
import { useUser } from 'contexts/UserContext';

import style from './css/EditarPerfil.module.scss';
import firstTab from './css/FirstTab.module.scss';
import secondTab from './css/SecondTab.module.scss'
import thirdTab from './css/ThirdTab.module.scss';

import Header from '../../components/Header';
import ProfilePictureEditor from '../../components/ProfilePictureEditor';

import { formatPhoneNumber, formatCEP, formatCPF } from 'utils/formatters';
import { User } from 'types/User';

import api from 'services/api';
import { toast } from 'react-toastify';

const EditarPerfil = () => {
    const { user, setUser } = useUser();
    const [formData, setFormData] = useState<User | null>(null);
    const [tab, setTab] = useState(2);

    const genericPhoto = "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
    const [profileImage, setProfileImage] = useState(user?.profilePic ? `http://localhost:5000${user?.profilePic}` : genericPhoto);
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (user) {
            setFormData(structuredClone(user));
        }
    },[user])

    const handleImageChange = (file: File) => {
        const imageUrl = URL.createObjectURL(file);
        setProfileImage(imageUrl);
        setProfileImageFile(file)
    };

    const updateField = (path: string, value: any) => {
        if (!formData) return;
        const keys = path.split('.');

        const updated = structuredClone(formData);
        let current: any = updated;

        keys.forEach((key, i) => {
            if (i === keys.length - 1) {
                current[key] = value;
            } else {
                current[key] = { ...current[key] };
                current = current[key];
            }
        });

        setFormData(updated);
    };

    const handleSave = async () => {
        if (!formData) return;

        try {
            const userCopy = structuredClone(formData);
            delete userCopy.favourites;

            const formDataToSend = new FormData();
            formDataToSend.append('data', JSON.stringify(userCopy));

            if (profileImageFile) {
                formDataToSend.append('profilePic', profileImageFile);
            }

            const res = await api.put(`/user/${userCopy._id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUser(res.data);
            toast.success('Alterações realizadas com sucesso!');
        } catch (err) {
            console.error("Erro ao salvar:", err);
            toast.error('Erro ao salvar os dados!');
        }
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

                {tab === 1 && formData && (
                    <div className={firstTab.Container}>
                        <div className={style.InputGroup}>
                        <label>Email</label>
                        <input
                            className={style.Input}
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateField("email", e.target.value)}
                        />
                        </div>
                        <div className={style.InputGroup}>
                        <label>Senha</label>
                        <input
                            className={style.Input}
                            type="password"
                            value={formData.password}
                            onChange={(e) => updateField("password", e.target.value)}
                            placeholder="Nova senha"
                        />
                        </div>
                    </div>
                    )}

                    {tab === 2 && formData && (
                    <div className={secondTab.Container}>
                        <ProfilePictureEditor currentImage={profileImage} onImageChange={handleImageChange} />
                        <div className={`${style.InputGroup} ${secondTab.Name}`}>
                        <label>Nome</label>
                        <input
                            className={style.Input}
                            type="text"
                            value={formData.personalData?.name || ''}
                            onChange={(e) => updateField("personalData.name", e.target.value)}
                        />
                        </div>
                        <div className={`${style.InputGroup} ${secondTab.BornDate}`}>
                        <label>Data de Nascimento</label>
                        <input
                            className={style.Input}
                            type="text"
                            value={formData.personalData?.bornDate || ''}
                            onChange={(e) => updateField("personalData.bornDate", e.target.value)}
                        />
                        </div>
                        <div className={`${style.InputGroup} ${secondTab.Cpf}`}>
                        <label>CPF</label>
                        <input
                            className={style.Input}
                            type="text"
                            value={formData.personalData?.cpf || ''}
                            onChange={(e) => updateField("personalData.cpf", e.target.value)}
                        />
                        </div>
                        <div className={`${style.InputGroup} ${secondTab.Phone}`}>
                        <label>Telefone</label>
                        <input
                            className={style.Input}
                            type="text"
                            value={formData.personalData?.phone || ''}
                            onChange={(e) => updateField("personalData.phone", e.target.value)}
                        />
                        </div>
                    </div>
                    )}

                    {tab === 3 && formData && (
                    <div className={thirdTab.Container}>
                        <div className={`${style.InputGroup} ${thirdTab.Road}`}>
                        <label>Rua</label>
                        <input
                            className={style.Input}
                            type="text"
                            value={formData.personalData?.address?.road || ''}
                            onChange={(e) => updateField("personalData.address.road", e.target.value)}
                        />
                        </div>
                        <div className={`${style.InputGroup} ${thirdTab.Number}`}>
                        <label>Número</label>
                        <input
                            className={style.Input}
                            type="text"
                            value={formData.personalData?.address?.number || ''}
                            onChange={(e) => updateField("personalData.address.number", e.target.value)}
                        />
                        </div>
                        <div className={`${style.InputGroup} ${thirdTab.Neighborhood}`}>
                        <label>Bairro</label>
                        <input
                            className={style.Input}
                            type="text"
                            value={formData.personalData?.address?.neighborhood || ''}
                            onChange={(e) => updateField("personalData.address.neighborhood", e.target.value)}
                        />
                        </div>
                        <div className={`${style.InputGroup} ${thirdTab.Complement}`}>
                        <label>Complemento</label>
                        <input
                            className={style.Input}
                            type="text"
                            value={formData.personalData?.address?.complement || ''}
                            onChange={(e) => updateField("personalData.address.complement", e.target.value)}
                        />
                        </div>
                        <div className={`${style.InputGroup} ${thirdTab.City}`}>
                        <label>Cidade</label>
                        <input
                            className={style.Input}
                            type="text"
                            value={formData.personalData?.address?.city || ''}
                            onChange={(e) => updateField("personalData.address.city", e.target.value)}
                        />
                        </div>
                        <div className={`${style.InputGroup} ${thirdTab.State}`}>
                        <label>Estado</label>
                        <input
                            className={style.Input}
                            type="text"
                            value={formData.personalData?.address?.state || ''}
                            onChange={(e) => updateField("personalData.address.state", e.target.value)}
                        />
                        </div>
                        <div className={`${style.InputGroup} ${thirdTab.Zip}`}>
                        <label>CEP</label>
                        <input
                            className={style.Input}
                            type="text"
                            value={formData.personalData?.address?.zip || ''}
                            onChange={(e) => updateField("personalData.address.zip", e.target.value)}
                        />
                        </div>
                    </div>
                )}

                <div className={style.ButtonsArea}>
                    <button className={style.Save} onClick={handleSave}>Salvar</button>
                    <button className={style.Cancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default EditarPerfil;
