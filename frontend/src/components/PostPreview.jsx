export default function PostPreview({ title, author }){
    return (
        <div className="postpreview">
            <h2>{title}</h2>
            <h4>{author}</h4>
        </div>
    )
}