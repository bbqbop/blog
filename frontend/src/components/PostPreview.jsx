import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext"
import useDeleteData from "../hooks/useDeleteData";

export default function PostPreview({ title, author, id, onDelete }){
    const { isLoggedIn } = useAuth();
    const { deleteData } = useDeleteData();
    const user = JSON.parse(localStorage.getItem('user'))

    const handleClick = () => {
        const success = deleteData(`/posts/${id}`)
        if (success){
            onDelete(id);
        }
    }

    return (
        <div className="postpreview">
            <Link to={`/posts/${id}`} key={id}>
            <h2>{title}</h2>
            <h4>{author}</h4>
            </Link>
            { isLoggedIn && user.isAdmin && 
            <button onClick={handleClick}>Delete Post</button>}
        </div>
    )
}