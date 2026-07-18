import { useParams } from "react-router-dom";
import { Article } from "../component/Article"
import { useBlog } from "../hooks/UseBlogs"

export function BlogPage(){
    const {id} = useParams();

    const {blog,isLoading} = useBlog({id});

    if(isLoading){
        return <div>....Loading {id}</div>
    }

    return <div>
        <Article blog={blog}></Article>
    </div>
}   