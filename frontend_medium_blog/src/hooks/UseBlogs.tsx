import axios from "axios";
import { useEffect, useState } from "react";
import { Backend_Url } from "../config";
import { useNavigate } from "react-router-dom";

export type blog = {
   id : string
  title: string;
  content: string;
  published : boolean
  author : {
    name : string
  }
}



export function useBlogs() {
  const [blogs, setBlogs] = useState<blog[]>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${Backend_Url}/hono/api/blog/bulk`,{
        headers: {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    }).then((response) => {
      setBlogs(response.data);
      setIsLoading(false);
    }).catch(()=>{
      navigate("/");
    })
  },[]);

  return{ blogs , isLoading};
}


export function useBlog({id} : {id:string}) {
  const [blog, setBlog] = useState<blog>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${Backend_Url}/hono/api/blog/${id}`,{
        headers: {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    }).then((response) => {
      setBlog(response.data);
      setIsLoading(false);
    });
  },[id]);

  return{ blog , isLoading};

}
