import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function Footer(){
    const location = useLocation()
    const navigate = useNavigate();
    const { isLoggedIn, user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <div className="footer">
            {isLoggedIn 
            ? <button onClick={handleLogout}>Logout</button>
            : location.pathname !== "/login" && <Link to="/login">Login</Link>
            }
            {isLoggedIn && user.isAdmin && location.pathname !== "/create-post" && <Link to="/create-post">Create New Post</Link>}
        </div>
        )
}