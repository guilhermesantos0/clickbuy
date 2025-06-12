import { useState } from "react";
import style from './Recuperar.module.scss';
import api from "services/api";

import Header from "components/Header";
import { Link } from "react-router-dom";

const RecuperarSenha = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageStatus, setMessageStatus] = useState("");
    const [recoveryToken, setRecoveryToken] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await api.post('/user/recovery', { email });
            setTimeout(() => {
                setLoading(false);
                if(res.status === 200) {
                    setMessage(`✉️ Um link de recuperação foi enviado para seu e-mail`);
                    setRecoveryToken(res.data.token)
                    setMessageStatus('approved');
                } else {
                    setMessage("❌ Ocorreu um erro. Verifique o e-mail digitado!");
                    setMessageStatus('denied');
                }
            }, 1000);
        } catch (error) {
            console.error(error);
            setMessage("❌ Ocorreu um erro. Verifique o e-mail digitado.");
            setLoading(false);
        }
    };

    return (
        <div className={style.Container}>
            <Header hideOptions hideProfile user={null} />
            <div className={style.PageContent}>
                <form className={style.Form} onSubmit={handleSubmit}>
                    <h1>Recuperar Senha</h1>
                    <p className={style.Description}>
                        Digite o e-mail cadastrado na sua conta. Enviaremos um link para redefinir sua senha.
                    </p>

                    <input
                        type="email"
                        placeholder="seuemail@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={style.Input}
                    />

                    <button type="submit" disabled={loading} className={style.Button}>
                        {loading ? "Enviando..." : "Enviar link de recuperação"}
                    </button>
                    {message && <p className={`${style.Message} ${messageStatus === "approved" ? '' : style.Error}`}>{message}</p>}
                </form>
                {recoveryToken && <Link to={`/redefinir-senha?token=${recoveryToken}`} className={style.RecoveryUrl} >tela de redefinição de senha</Link>}

            </div>
        </div>
    );
};

// http://clickbuy-pii.s3-website-sa-east-1.amazonaws.com/redefinir-senha?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNmI2ODI4ZS02OWJhLTQzYTctYWQzZi01ZTk5NzY0NWVjYmEiLCJpYXQiOjE3NDk2OTAwNzcsImV4cCI6MTc0OTY5MDM3N30.q3-xpnuDbliP59MTcDjNIqGw9Pp9Z7hiLd_IeVtmQKQ

export default RecuperarSenha;
