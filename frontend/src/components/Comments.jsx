import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import useSendData from "../hooks/useSendData";
import Comment from "./Comment";

export default function Comments({ comments, postId }) {
    const { isLoggedIn } = useAuth();
    const [newComment, setNewComment] = useState("");
    const navigate = useNavigate()

    const { loading, error, sendData } = useSendData();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            const success = await sendData(`/posts/${postId}/comments/`, { message: newComment });
            if (success) {
                setNewComment("");
                navigate(0);
            }
        }
    };

    return (
        <div className="comments">
            {comments.length < 1 ? (
                <p>No Comments!</p>
            ) : (
                comments.map((comment, idx) => (
                    <Comment
                        author={comment.author.username}
                        date={moment(comment.date).format("MMM Do, YYYY")}
                        message={comment.message}
                        key={comment._id}
                        id={comment._id}
                    />
                ))
            )}
            {isLoggedIn ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        New comment
                        <textarea
                            type="text"
                            name="comment"
                            id="comment"
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                        />
                    </label>
                    <button type="submit" disabled={loading}>
                        Submit
                    </button>
                    {error && <p>Error submitting comment: {error.message}</p>}
                </form>
            ) : (
                <p>Log in to leave a comment!</p>
            )}
        </div>
    );
}
