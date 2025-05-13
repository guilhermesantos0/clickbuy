import { createContext, useState, useContext, ReactNode } from "react";

import { User } from '@modules/User';

import { getUserFavourites } from "services/favouriteService";

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const loadUserFavourites = async () => {
        try {
            const userFavourites: any[] = await getUserFavourites(user?._id);
            setUser({ ...user, favourites: userFavourites});
        } catch (error) {
            console.error('Erro ao carregar favoritos: ', error)
        }
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
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
}