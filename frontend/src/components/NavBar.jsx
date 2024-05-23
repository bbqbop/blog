import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function NavBar(){
    const location = useLocation();
    const { isLoggedIn, user, error } = useAuth();

    return (
        <div className="navbar">
            {isLoggedIn && <p>{`Hi ${user.firstname}`}</p>}
            {error && <p>{error}</p>}
            {location.pathname != "/" && <Link to="/">Home</Link>}
        </div> 
    )
}