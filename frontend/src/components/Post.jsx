import moment from "moment";

import useFetchData from "../hooks/useFetchData";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "./Comments";
import { useAuth } from "../contexts/authContext";
 
export default function Post(){
    const { id } = useParams()
    const { data, loading, error } = useFetchData(`/posts/${id}`)
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate()

    const handleEdit = () => {
        navigate(`/posts/${id}/edit`, { state: data.post })
    }

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
                {isLoggedIn && user.isAdmin && <button onClick={handleEdit}>Edit Post</button>}
                <hr />
                <Comments initialComments={data.comments} postId={id}/>
                </>
            </div>        
        )
    }
}