import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import style from './RedefinirSenha.module.scss';

import Header from "components/Header";
import api from "services/api";

import { sha256 } from "js-sha256";

const RedefinirSenha = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        if (password !== confirmPassword) {
            setMessage("❌ As senhas não coincidem.");
            return;
        }

        if (!token) {
            setMessage("❌ Token inválido ou expirado.");
            return;
        }

        try {
            setLoading(true);
            const hash = sha256(password);
            await api.patch('/user/reset-password', { token, newPassword: hash });
            setTimeout(() => {
                setLoading(false);
                setMessage("✅ Senha redefinida com sucesso!");
                setTimeout(() => navigate("/login"), 2000);
            }, 1500);
        } catch (error) {
            console.error(error);
            setMessage("❌ Erro ao redefinir senha.");
            setLoading(false);
        }
    };

    return (
        <div className={style.Container}>
            <Header hideOptions hideProfile user={null} />
            <div className={style.PageContent}>
                <form className={style.Form} onSubmit={handleSubmit}>
                    <h1>Nova Senha</h1>
                    <p className={style.Description}>Escolha uma nova senha segura.</p>

                    <input
                        type="password"
                        placeholder="Nova senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={style.Input}
                    />

                    <input
                        type="password"
                        placeholder="Confirmar nova senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className={style.Input}
                    />

                    <button type="submit" disabled={loading} className={style.Button}>
                        {loading ? "Salvando..." : "Redefinir Senha"}
                    </button>

                    {message && <p className={style.Message}>{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default RedefinirSenha;
