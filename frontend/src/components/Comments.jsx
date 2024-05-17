import moment from "moment"
import Comment from "./Comment"

export default function Comments({ comments }){
    if (comments.length < 1){
        return <p>No Comments!</p>
    }

    return (
        <div className="comments">
            {comments.map((comment, idx) => (
                <Comment 
                    author={comment.author.username}
                    date={moment(comment.date).format("MMM Do, YYYY")}
                    message={comment.message}
                    key={idx}
                    id={comment._id}
                    />
            ))}
        </div>
    )
}