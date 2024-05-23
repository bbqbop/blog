import moment from "moment";

import useFetchData from "../hooks/useFetchData";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
 
export default function Post(){
    const { id } = useParams()
    const { data, loading, error } = useFetchData(`/posts/${id}`)
    if(loading) return <p>...loading</p>
    if(error) return <p>${error}</p>
    if (!data) {
        return <p>No data available</p>;
    } else {
        const { title, content, date } = data.post
        const author = data.post.author.username

        return (
            <div className="post">
                <>  
                <h1>{title}</h1>
                <h2>by {author}</h2>
                <p className="date">{moment(date).format("MMM Do, YYYY")}</p>
                <hr />
                <p>{content}</p>
                <hr />
                <Comments initialComments={data.comments} postId={id}/>
                </>
            </div>        
        )
    }
}