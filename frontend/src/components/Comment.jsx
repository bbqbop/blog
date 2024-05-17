export default function Comment({author, date, message, id}){
    return (
        <div className="comment" id={id}>
            <p className="date">{date}</p>
            <b>{author}</b>
            <p>{message}</p>
        </div>
    )
}