import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext"
import useDeleteData from "../hooks/useDeleteData";
import styles from "./PostPreview.module.css"

export default function PostPreview({ title, author, id, onDelete }){
    const { isLoggedIn, user } = useAuth();
    const { deleteData } = useDeleteData();

    const handleClick = async () => {
        const success = await deleteData(`/posts/${id}`)
        if (success){
            console.log(success)
            onDelete(id);
        }
    }

    return (
        <div className={styles.postPreview}>
            <Link to={`/posts/${id}`} key={id}>
            <h2>{title}</h2>
            <h4>{author}</h4>
            </Link>
            { isLoggedIn && user.isAdmin && 
            <button onClick={handleClick} className="delete">Delete</button>}
        </div>
    )
}