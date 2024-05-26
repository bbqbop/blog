import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useSendData from "../hooks/useSendData";

export default function PostForm(){
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [method, setMethod] = useState('POST');
    const { sendData } = useSendData();
    const navigate = useNavigate()
    const location = useLocation();
    const url = `/posts/${useParams().id || ''}`;
   
    useEffect(()=>{
        if (location.pathname !== '/create-post'){
            setTitle(location.state.title)
            setContent(location.state.content)
            setMethod('PUT');
        } else {
            setTitle('');
            setContent('');
            setMethod('POST');
        }
    },[])

    const handleSubmit = async(e) => {
        e.preventDefault();
        const success = await sendData(url, {title, content, }, method)
        if (success){
            navigate(`/posts/${success.post._id}`)
            console.log(success)
        }
    }



 return (
    <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title: </label>
            <input 
                type="text" 
                name="title" 
                id="title" 
                onChange={e => setTitle(e.target.value)}
                value={title} />
            <label htmlFor="content">Content: </label>
            <textarea 
                type="text" 
                name="content" 
                id="content"
                onChange={e => setContent(e.target.value)}
                value={content} 
                />
                <button type="submit">Submit</button>
        </form>
    </>
 )   
}