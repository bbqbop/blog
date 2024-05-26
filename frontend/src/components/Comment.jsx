import { useAuth } from "../contexts/authContext"
import useDeleteData from "../hooks/useDeleteData";
import styles from "./Comment.module.css";

export default function Comment({author, date, message, id, postId, onDelete}){
    const { deleteData } = useDeleteData();
    const { isLoggedIn, user } = useAuth();

    const handleClick = async () => {
        const success = await deleteData(`/posts/${postId}/comments/${id}`);
        if (success) {
            console.log(success)
            onDelete(id);
        }
    }

    return (
        <div className={styles.comment} id={id}>
            <p className="date">{date}</p>
            <b>{author.username}</b>
            <p>{message}</p>
            {isLoggedIn && user.id == author._id && <button onClick={handleClick} className="delete">Delete</button>}
        </div>
    )
}