import React, { createContext, useContext, useState } from "react";

export interface UserData {
    iss: string;
    id: number;
    name: string;
    email: string;
    role: string;
}

interface AuthContextProps {
    userData: UserData | null;
    isLoggedIn: boolean;
    setAuthState: (userData: UserData | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const setAuthState = (userData: UserData | null) => {
        setUserData(userData);
        setIsLoggedIn(!!userData);
    };

    return (
        <AuthContext.Provider value={{ userData, isLoggedIn, setAuthState }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
