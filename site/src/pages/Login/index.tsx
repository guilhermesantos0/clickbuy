import { Link, useNavigate } from 'react-router-dom';
import style from './Login.module.scss';
import { useState } from 'react';

const Login = () => {

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
                console.log("Usuário logado: ", result.user)
                navigate('/');
            } else {
                alert(result.message || "Erro ao fazer login")
            }
        } catch (error) {
            alert("Erro de conexão com o servidor.");
            console.error("Login error:", error)
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