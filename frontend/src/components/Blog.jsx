import useFetchData from "../hooks/useFetchData"
import PostPreview from "./PostPreview";
import { useEffect, useState } from "react";
import styles from "./Blog.module.css"

export default function Blog() {
    const { data, error, loading } = useFetchData('/');
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        if(!!data) setPosts(data.posts)
    },[data])

    const handleDelete = (postId) => {
        setPosts(posts.filter(post => post._id !== postId))
    }

    if(loading){
        return <p>...loading</p>
    } 
    if(error) {
        return <p>{error.message}</p>
    }
    else{
        return (
            <div className={styles.blog}>
                { posts.length < 1 ? (
                    <p>No Posts!</p>
                ) : (posts.map((post, idx) => (
                        <PostPreview 
                            title={post.title} 
                            author={post.author.username} 
                            key={idx} 
                            id={post._id}
                            onDelete={handleDelete}
                        />
                )))}
            </div>
        )}
}