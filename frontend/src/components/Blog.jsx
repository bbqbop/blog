import useFetchData from "../hooks/useFetchData"
import { Link } from "react-router-dom";
import PostPreview from "./PostPreview";

export default function Blog() {
    const { data, error, loading } = useFetchData('/')

    if(loading){
        return <p>...loading</p>
    } 
    if(error) {
        return <p>{error}</p>
    }
    else{
        return (
            <div className="blog">
                {data.posts.map((post, idx) => (
                    <Link to={`/posts/${post._id}`} key={idx}>
                        <PostPreview 
                            title={post.title} 
                            author={post.author.username} 
                            key={idx} id={post._id}
                        />
                    </Link> 
                ))}
            </div>
        )}
}