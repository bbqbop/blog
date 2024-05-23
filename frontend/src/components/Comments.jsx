import moment from "moment";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import useSendData from "../hooks/useSendData";
import Comment from "./Comment";

export default function Comments({ initialComments, postId }) {
    const { isLoggedIn } = useAuth();
    const [comments, setComments] = useState(initialComments)
    const [newComment, setNewComment] = useState("");

    const { loading, error, sendData } = useSendData();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            const success = await sendData(`/posts/${postId}/comments/`, { message: newComment });
            if (success) {
                const user = JSON.parse(localStorage.getItem('user'))
                const addedComment = success.newComment;
                addedComment.author = {username: user.username, _id: user.id}
                setComments([...comments, addedComment])
                setNewComment("");
            }
        }
    };

    const handleDelete = (commentId) => {
        setComments(comments.filter(comment => comment._id !== commentId));
    }


    return (
        <div className="comments">
            {comments.length < 1 ? (
                <p>No Comments!</p>
            ) : (
                comments.map((comment, idx) => (
                    <Comment
                        author={comment.author}
                        date={moment(comment.date).format("MM/DD/YY, HH:MM")}
                        message={comment.message}
                        key={comment._id}
                        id={comment._id}
                        postId={postId}
                        onDelete={handleDelete}
                    />
                ))
            )}
            {isLoggedIn ? (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="comment">New comment</label>
                    <textarea
                        type="text"
                        name="comment"
                        id="comment"
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        onKeyDown={e => e.key == "Enter" && handleSubmit(e)}
                    />
                    
                    <button type="submit" disabled={loading}>Submit</button>
                    {error && <p>Error submitting comment: {error.message}</p>}
                </form>
            ) : (
                <p>Log in to leave a comment!</p>
            )}
        </div>
    );
}
