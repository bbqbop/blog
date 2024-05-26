import { useState, useEffect } from "react";

const port = import.meta.env.VITE_PORT

export default function useFetchData(url = ''){
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(port + url, { mode: "cors"} )
        .then(response => {
            if (response.status >= 400) {
                throw new Error("server error");
            }
            return response.json();
        })
        .then(data => setData(data))
        .catch(err => setError(err))
        .finally(() => setLoading(false));
    }, [url])

    return { data, error, loading };
}