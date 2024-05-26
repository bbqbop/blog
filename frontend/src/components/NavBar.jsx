import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import styles from "./NavBar.module.css"

export default function NavBar({ className }){
    const location = useLocation();
    const { isLoggedIn, user, error } = useAuth();

    return (
        <div className={className}>
            <h2>Blog</h2>
            {isLoggedIn && <p>{`Hi ${user.firstname}`}</p>}
            {error && <p>{error}</p>}
            {location.pathname != "/" && <Link to="/">Home</Link>}
        </div> 
    )
}