import { Link, useNavigate } from 'react-router-dom';
import style from './Login.module.scss';
import { useState } from 'react';

import { useUser } from '../../contexts/UserContext';

import { toast } from 'react-toastify';

import Header from '../../components/Header';
import api from 'services/api';

import { sha256 } from "js-sha256";

const Login = () => {
    const { setUser } = useUser();

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        try {

            const hashPassword = sha256(password);

            const userPayload = {
                email, password: hashPassword
            }

            const response = await api.post('/login', userPayload);
            const result = response.data;

            if(response.status == 200) {
                toast.success('Login realizado com sucesso!');

                setUser( result.user )
                navigate('/');
            } else {
                toast.error("Usuário ou senha incorretos!");
                console.log(result.message);
            }
        } catch (error) {
            toast.error("Erro de conexão com o servidor")
        }
    }

    return (
        <div className={style.Container}>
            <Header hideOptions={true } user={null} />
            <form action="login" className={style.Form}>
                <h1 className={style.Title}>Entre para comprar!</h1>
                <div className={style.InputContainer}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" className={style.Input} value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className={style.InputContainer}>
                    <label htmlFor="password">Senha</label>
                    <input type="password" name="password" className={style.Input} value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <Link to='/recuperar-senha' className={style.Recovery}>Esqueci minha senha</Link>
                <div className={style.ButtonsArea}>
                    <button className={style.Login} onClick={(e) => { e.preventDefault(); handleLogin() }}>ENTRAR</button>
                    <Link to='/cadastro' className={style.SignUp}>CADASTRE-SE</Link>
                </div>
            </form>
            
        </div>
    )
}

export default Login