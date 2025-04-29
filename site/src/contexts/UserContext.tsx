import { createContext, useState, useContext, ReactNode } from "react";

interface UserData {
    _id: string;
    email: string;
    profilePic: string;
    personalData: {
        name: string
    };
}

interface UserContextType {
    user: UserData | null;
    setUser: (user: UserData) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(null);

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