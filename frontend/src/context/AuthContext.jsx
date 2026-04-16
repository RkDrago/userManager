import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const data = localStorage.getItem("user");

        if (data) {
            setUser(JSON.parse(data));
        }

        setLoading(false);
    }, []);

    const login = (data) => {
        const userData = {
            user: data.user,
            token: data.token
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};