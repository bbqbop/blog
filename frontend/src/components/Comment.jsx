import { useAuth } from "../contexts/authContext"
import useDeleteData from "../hooks/useDeleteData";

export default function Comment({author, date, message, id, postId, onDelete}){
    const { deleteData } = useDeleteData();
    const { isLoggedIn, user } = useAuth();

    const handleClick = async () => {
        const success = await deleteData(`/posts/${postId}/comments/${id}`);
        if (success) onDelete(id);
    }

    return (
        <div className="comment" id={id}>
            <p className="date">{date}</p>
            <b>{author.username}</b>
            <p>{message}</p>
            {isLoggedIn && user.id == author._id && <button onClick={handleClick}>Delete</button>}
        </div>
    )
}