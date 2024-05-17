import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function NavBar(){
    const { isLoggedIn, logout } = useAuth()
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            {isLoggedIn 
            ? <button onClick={handleLogout}>Logout</button>
            : <Link to="/login">Login</Link>
            }
        </div> 
    )
}