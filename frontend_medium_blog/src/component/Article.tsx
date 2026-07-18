import type { blog } from "../hooks/UseBlogs";
import { AppBar } from "./AppBar";
import { Avatar } from "./BlogCard";

export function Article({blog} : {blog:blog}){
    

    return(
        <div>
        <AppBar></AppBar>
        <div className="flex justify-center ">
        <div className="grid grid-cols-12 px-9 w-full max-w-7xl pt-10">
            <div className="col-span-9 ">
                <div className="text-4xl font-extrabold">
                    {blog.title}
                </div>
                <span className="text-slate-500 pt-2 text-sm">Posted on 2nd dec 2023</span>
                <div className="mt-3">
                    {blog.content} 
                </div>
            </div>
            <div className="col-span-3">
                <div className="text-sm text-slate-500 p-2">Author</div>
                <div className="px-3 flex gap-2">
                    <div className="mt-1">
                        <Avatar avatarName={blog.author.name || "A" } size={"small"}></Avatar>
                    </div>
                    <div>
                        <div className="font-medium text-lg">{blog.author.name || "Anonymous"}</div>
                        <div className="text-slate-700">random catchphrase to author sfasfasfasfas  sdfasfa sdf asf saf sadfasf </div>
                    </div>
                    
                </div> 
            </div>
        </div>
        </div>
        </div>
    )
}