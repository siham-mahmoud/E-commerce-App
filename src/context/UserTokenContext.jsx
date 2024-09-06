import { createContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';


export const userTokenContext = createContext(null);

export default function UserTokenContext({ children }) {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    function convertToken() {
        const token = window.localStorage.getItem("token");
        if (token) {
            const data = jwtDecode(token);
            setUserId(data.id);
           
        }
    }

    useEffect(() => {
        const storedToken = window.localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            convertToken();
        }
    }, []);

    return (
        <userTokenContext.Provider value={{ token, convertToken, userId, setToken }}>
            {children}
        </userTokenContext.Provider>
    );
}
