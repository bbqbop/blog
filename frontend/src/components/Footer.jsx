import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function Footer(){
    const location = useLocation()
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <div className="footer">
            {isLoggedIn 
            ? <button onClick={handleLogout}>Logout</button>
            : <Link to="/login">Login</Link>
            }
            {isLoggedIn && user.isAdmin && location.pathname !== "/create-post" && <Link to="/create-post">Create New Post</Link>}
        </div>
        )
}