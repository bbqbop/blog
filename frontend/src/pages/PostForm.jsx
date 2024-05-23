import { useState } from "react"
import { useNavigate } from "react-router-dom";
import useSendData from "../hooks/useSendData";

export default function PostForm(){
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { sendData } = useSendData();
    const navigate = useNavigate()


    const handleSubmit = async(e) => {
        e.preventDefault();
        const success = await sendData('/posts', {title, content})
        if (success){
            navigate(`/posts/${success.newPost._id}`)
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