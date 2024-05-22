import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/authContext";

export default function useSendData() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState('');

    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (isLoggedIn) {
            setToken(localStorage.getItem("token"));
        } else {
            setError("Not authorized.");
        }
    }, [isLoggedIn]);

    const port = import.meta.env.VITE_PORT;

    const sendData = useCallback(async (url, data) => {
        if (!isLoggedIn) {
            setError("Not authorized.");
            return;
        }
        
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${port}${url}`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Something went wrong');
            }
            return true;
        } catch (error) {
            setError(error.message);
            return false
        } finally {
            setLoading(false);
        }
    }, [isLoggedIn, token, port]);

    return { loading, error, sendData };
}
