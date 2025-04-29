import { Link, useNavigate } from 'react-router-dom';
import style from './Login.module.scss';
import { useState } from 'react';

import { useUser } from '../../contexts/UserContext';

import { toast } from 'react-toastify';

const Login = () => {
    const { setUser } = useUser();

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:5000/login", {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    email, 
                    password
                })
            })

            const result = await response.json();

            if(response.ok) {
                toast.success('Login realizado com sucesso!');

                setUser( {
                    _id: result.user._id,
                    name: result.user.name,
                    email: result.user.email,
                    profilePic: result.user.profilePic || ""
                })
                navigate('/');
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error("Erro de conexão com o servidor")
        }
    }

    return (
        <div className={style.Container}>
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
                <Link to='/recovery' className={style.Recovery}>Esqueci minha senha</Link>
                <div className={style.ButtonsArea}>
                    <button className={style.Login} onClick={(e) => { e.preventDefault(); handleLogin() }}>ENTRAR</button>
                    <Link to='/cadastro' className={style.SignUp}>CADASTRE-SE</Link>
                </div>
            </form>
            
        </div>
    )
}

export default Login