import React, { createContext, useState, useContext } from "react";

interface UserData {
    id: number | null;
    name: string | null;
    email: string | null;
}

interface AuthContextType {
    isLoggedIn: boolean; // Tracks whether the user is logged in
    userData: UserData; // Stores user data
    login: (userData: UserData) => void; // Login function
    logout: () => void; // Logout function
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState<UserData>({
        id: null,
        name: null,
        email: null,
    });

    const login = (userData: UserData) => {
        setIsLoggedIn(true);
        setUserData(userData);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserData({ id: null, name: null, email: null });
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};