import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// uuid

import style from './css/Cadastro.module.scss';
import firstStep from './css/FirstStep.module.scss';
import secondStep from './css/SecondStep.module.scss';
import thirdStep from './css/ThirdStep.module.scss';
import fourthStep from './css/FourthStep.module.scss';

function Cadastro() {

    const navigate = useNavigate();

    const [disabledInput, setDisabledInput] = useState(false);
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        personalData: {
            name: "",
            bornDate: "",
            cpf: "",
            phone: "",
            address: { 
                road: "",
                number: "",
                city: "",
                state: "",
                zip: "",
                complement: "",
                neighborhood: ""
            }
        }
    })

    const [error, setError] = useState([false, ""]);
        
    const [validPassword, setValidPassword] = useState(true)
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNestedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          personalData: {
            ...prev.personalData,
            [name]: value
          }
    }));
};
      
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            personalData: {
                ...prev.personalData,
                address: {
                    ...prev.personalData.address,
                    [name]: value
                }
            }
        }));
    };

    const handleCheckEmail = async () => {
        
        const response = await fetch(`http://localhost:5000/checkEmail?email=${formData.email}`);

        if(response.ok) {
            nextStep();
        }else {
            setError([true, "Email já cadastrado"])
        }
    }
    
    const handleCheckPassword = (value: string) => {
        if(formData.password === value) {
            setValidPassword(true)
        }else{
            setValidPassword(false)
        }
    }

    const handleConfirmPassword = () => {
        if(validPassword){
            nextStep();
        }else {
            setError([true, "As senhas não coincidem"])
        }
    }

    const resetAddress = () => {
        setFormData((prev) => ({
            ...prev,
            personalData: {
                ...prev.personalData,
                address: {
                  ...prev.personalData.address,
                  road: '',
                  neighborhood: '',
                  city: '',
                  state: '',
                },
            }
        }));
    }

    const handleCepSearch = async (value: string) => {
        const cep = value.replace(/\D/g, "");
        if(cep.length !== 8) {
            resetAddress();
            return
        }

        try {
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json`);
            const data = await res.json();

            console.log(data)

            if(data.erro) {
                resetAddress()
                console.log('cep nao encontrado');
                return
            }

            setFormData((prev) => ({
                ...prev,
                personalData: {
                    ...prev.personalData,
                    address: {
                      ...prev.personalData.address,
                      road: data.logradouro || '',
                      neighborhood: data.bairro || '',
                      city: data.localidade || '',
                      state: data.uf ||'',
                    },
                }
            }));

            setDisabledInput(true)
        } catch (error) {
            console.log('teste')
            console.error("Erro ao buscar o CEP:", error);
        }
    }

    const handleSignUp = async () => {
        const userPayload = {
            email: formData.email,
            password: formData.password,
            personalData: {
              name: formData.personalData.name,
              bornDate: formData.personalData.bornDate,
              cpf: formData.personalData.cpf,
              phone: formData.personalData.phone,
              address: {
                road: formData.personalData.address.road,
                number: formData.personalData.address.number,
                city: formData.personalData.address.city,
                state: formData.personalData.address.state,
                zip: formData.personalData.address.zip,
                complement: formData.personalData.address.complement || "",
                neighborhood: formData.personalData.address.neighborhood
              }
            }
        };

        try {
            const response = await fetch("http://localhost:5000/user", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(userPayload)
            })

            const result = await response.json();

            if(response.ok) {
                console.log('Usuário:', result.user)
                navigate('/');
            }else {
                alert(`Erro: ${result.message}`);
                console.error(result)
            }
        }catch (error) {
            alert("Erro ao conectar com o servidor.");
            console.error("Erro:", error)
        }
    }

    const nextStep = () => {
        setError([false, ""])
        setStep(prev => prev + 1)
    }
    const prevStep = () => {
        setError([false, ""])
        setStep(prev => prev - 1)
    }

    return(
        <div className={style.Container}>
            <form action="login" className={style.Form}>
                <h1 className={style.Title}>Crie sua conta!</h1>

                {
                    step === 1 && (
                        <div className={firstStep.InputContainer}>
                            <label htmlFor="email">Email</label>
                            { error[0] && (<div className={style.Error}>{error[1]}</div>) }
                            <div className={firstStep.InputArea}>
                                <input 
                                type="email" 
                                name="email" 
                                className={`${firstStep.Input}`} 
                                value={formData.email} 
                                onChange={handleChange} />
                                <button className={firstStep.Next} onClick={(e) => { e.preventDefault(); handleCheckEmail() }}>→</button>
                            </div>
                        </div>
                    )
                }

                {
                    step === 2 && (
                        <div className={secondStep.InputContainer}>
                            <div className={secondStep.InputArea}>
                                <div className={secondStep.InputGroup}>
                                    <label htmlFor="password">Senha</label>
                                    <input 
                                    type="password" 
                                    name="password" 
                                    className={`${secondStep.Input} ${!validPassword ? secondStep.InvalidPassword : "" }`} 
                                    value={formData.password} 
                                    onChange={handleChange} />
                                </div>
                                <div className={secondStep.InputGroup}>
                                    <label htmlFor="confirmPassword">Confirme sua senha</label>
                                    <input 
                                    type="password" 
                                    name="confirmPassword" 
                                    className={`${secondStep.Input} ${!validPassword ? secondStep.InvalidPassword : "" }`} 
                                    value={confirmPassword} 
                                    onChange={(e) => { 
                                        setConfirmPassword(e.target.value); 
                                        handleCheckPassword(e.target.value); 
                                    }} />
                                </div>
                                { error[0] && (<div className={style.Error}>{error[1]}</div>) }
                            </div>
                            <div className={style.ButtonsArea}>
                                <button className={style.Prev} onClick={prevStep}>Voltar</button>
                                <button className={style.Next} onClick={(e) => { e.preventDefault(); handleConfirmPassword() }}>Próximo</button>
                            </div>
                        </div>
                    )
                }

                {
                    step === 3 && (
                        <div className={thirdStep.InputContainer}>
                            <div className={thirdStep.InputArea}>
                                <div className={`${thirdStep.InputGroup} ${thirdStep.Name}`}>
                                    <label htmlFor="name">Nome</label>
                                    <input 
                                    type="text" 
                                    name='name' 
                                    className={thirdStep.Input} 
                                    value={formData.personalData.name} 
                                    onChange={handleNestedChange} />
                                </div>

                                <div className={`${thirdStep.InputGroup} ${thirdStep.Cpf}`}>
                                    <label htmlFor="cpf">CPF</label>
                                    <input 
                                    type="text" 
                                    name='cpf' 
                                    className={thirdStep.Input} 
                                    value={formData.personalData.cpf} 
                                    onChange={handleNestedChange} />
                                </div>

                                <div className={`${thirdStep.InputGroup} ${thirdStep.Phone}`}>
                                    <label htmlFor="phone">Telefone</label>
                                    <input 
                                    type="phone" 
                                    name='phone' 
                                    className={thirdStep.Input} 
                                    value={formData.personalData.phone} 
                                    onChange={handleNestedChange} />
                                </div>
                                
                                <div className={`${thirdStep.InputGroup} ${thirdStep.BornDate}`}>
                                    <label htmlFor="bornDate">Data de nascimento</label>
                                    <input 
                                    type="date" 
                                    name='bornDate' 
                                    className={thirdStep.Input} 
                                    value={formData.personalData.bornDate} 
                                    onChange={handleNestedChange} />
                                </div>
                            </div>
                            <div className={style.ButtonsArea}>
                                <button className={style.Prev} onClick={prevStep}>Voltar</button>
                                <button className={style.Next} onClick={nextStep}>Próximo</button>
                            </div>
                        </div>
                    )
                }

                {
                    step === 4 && (
                        <div className={fourthStep.InputContainer}>
                            <div className={fourthStep.InputArea}>

                                <div className={`${fourthStep.InputGroup} ${fourthStep.Road}`}>
                                    <label htmlFor="road">Rua</label>
                                    <input 
                                    type="text" 
                                    name='road' 
                                    className={fourthStep.Input} 
                                    value={formData.personalData.address.road} 
                                    onChange={handleAddressChange}
                                    disabled={disabledInput} />
                                </div>

                                <div className={`${fourthStep.InputGroup} ${fourthStep.Number}`}>
                                    <label htmlFor="number">Número</label>
                                    <input 
                                    type="number" 
                                    name='number' 
                                    className={fourthStep.Input} 
                                    value={formData.personalData.address.number} 
                                    onChange={handleAddressChange} />
                                </div>

                                <div className={`${fourthStep.InputGroup} ${fourthStep.Complement}`}>
                                    <label htmlFor="complement">Complemento</label>
                                    <input 
                                    type="text" 
                                    name='complement' 
                                    className={fourthStep.Input} 
                                    value={formData.personalData.address.complement} 
                                    onChange={handleAddressChange} />
                                </div>

                                <div className={`${fourthStep.InputGroup} ${fourthStep.Cep}`}>
                                    <label htmlFor="zip">CEP</label>
                                    <input 
                                    type="text" 
                                    name='zip' 
                                    className={fourthStep.Input} 
                                    value={formData.personalData.address.zip} 
                                    onChange={(e) => {
                                        handleAddressChange(e);
                                        handleCepSearch(e.target.value)
                                    }} />
                                </div>

                                <div className={`${fourthStep.InputGroup} ${fourthStep.Neighborhood}`}>
                                    <label htmlFor="neighborhood">Bairro</label>
                                    <input 
                                    type="text" 
                                    name='neighborhood' 
                                    className={fourthStep.Input} 
                                    value={formData.personalData.address.neighborhood} 
                                    onChange={handleAddressChange}
                                    disabled={disabledInput} />
                                </div>

                                <div className={`${fourthStep.InputGroup} ${fourthStep.City}`}>
                                    <label htmlFor="city">Cidade</label>
                                    <input 
                                    type="text" 
                                    name='city' 
                                    className={fourthStep.Input} 
                                    value={formData.personalData.address.city} 
                                    onChange={handleAddressChange}
                                    disabled={disabledInput} />
                                </div>

                                <div className={`${fourthStep.InputGroup} ${fourthStep.State}`}>
                                    <label htmlFor="state">Estado</label>
                                    <input 
                                    type="text" 
                                    name='state' 
                                    className={fourthStep.Input} 
                                    value={formData.personalData.address.state} 
                                    onChange={handleAddressChange}
                                    disabled={disabledInput} />
                                </div>

                            </div>

                            <div className={style.ButtonsArea}>
                                <button className={style.Prev} onClick={prevStep}>Voltar</button>
                                <button className={style.Next} onClick={(e) => { e.preventDefault(); handleSignUp()}}>Finalizar</button>
                            </div>
                        </div>
                    )
                }

                {
                    step === 5 && (
                        <div>
                            Cadastro realizado!
                        </div>
                    )
                }

                <Link to='/login' className={style.Login}>Já tenho uma conta</Link>
            </form>
        </div>
    )
}

export default Cadastro;