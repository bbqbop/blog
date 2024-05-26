import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";

export default function useDeleteData(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const { isLoggedIn } = useAuth();

    useEffect(()=>{
        if(isLoggedIn){
            setToken(localStorage.getItem('token'))
        } else {
            setError("Not authorized");
        }
    },[isLoggedIn]);

    const deleteData = async (url) => {
        const port = import.meta.env.VITE_PORT
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(port + url, {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
            const result = await response.json()      
            return result      
        }
        catch(err){
            setError(error.message)
            return false
        }
        finally{
            setLoading(false)
        }
    }

    return { loading, error, deleteData }
}