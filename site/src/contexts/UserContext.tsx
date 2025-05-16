import { createContext, useState, useContext, ReactNode, useEffect } from "react";

import { User } from '@modules/User';
import { getUserFavourites } from "services/favouriteService";

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    loadUserFavourites: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<User | null>(null);

    const setUser = (user: User | null) => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
        setUserState(user);
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser: User = JSON.parse(storedUser);
                setUserState(parsedUser);
            } catch (err) {
                console.error("Erro ao restaurar sessão:", err);
            }
        }
    }, []);

    const loadUserFavourites = async () => {
        if (!user?._id) return;

        try {
            const favourites = await getUserFavourites(user._id);
            setUser({ ...user, favourites });
        } catch (err) {
            console.error("Erro ao carregar favoritos:", err);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, loadUserFavourites }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser deve ser usado dentro de um UserProvider');
    }
    return context;
};
