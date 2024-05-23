import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function NavBar(){
    const location = useLocation();
    const { isLoggedIn } = useAuth();
    const user = JSON.parse(localStorage.getItem('user'))  

    return (
        <div className="navbar">
            {isLoggedIn && <p>{`Hi ${user.firstname}`}</p>}
            {location.pathname != "/" && <Link to="/">Home</Link>}
        </div> 
    )
}