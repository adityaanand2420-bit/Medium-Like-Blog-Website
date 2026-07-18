
import { useEffect } from "react";
import { Auth } from "../component/Auth";
import { Quote } from "../component/Quote";
import axios from "axios";
import { Backend_Url } from "../config";
import { useNavigate } from "react-router-dom";



export function Signin() {
    const navigate = useNavigate()

  useEffect(()=>{
    axios.get(`${Backend_Url}/hono/api/me`,{
      headers : {
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
      }
    }).then((res)=>{
      if(res.status === 200){
        navigate("/blogs")
      }
    })
  },[]);


  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 text-2xl font-bold">
        <Auth buttonText="signin" />
        <div className="hidden md:block">
          <Quote></Quote>
        </div>
      </div>
    </div>
  );
}
