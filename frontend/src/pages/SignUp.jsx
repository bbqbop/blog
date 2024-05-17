import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function SignUp(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const { signUp, loading, error } = useAuth();

    const handleSubmit = (e) => {
        const navigate = useNavigate()
        e.preventDefault();
        const success = signUp(username, password, firstname, lastname)
        if (success) navigate('/')
    }

    return(
        <>
            <p>Sign up</p>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    value={username} 
                    onChange={e => setUsername(e.target.value)}   
                />
                <input 
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password} 
                    onChange={e => setPassword(e.target.value)}   
                />
                <input 
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="First Name"
                    value={firstname} 
                    onChange={e => setFirstname(e.target.value)}   
                />
                <input 
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="Last Name"
                    value={lastname} 
                    onChange={e => setLastname(e.target.value)}   
                />
                <button type="submit">Submit</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </>
    )
}