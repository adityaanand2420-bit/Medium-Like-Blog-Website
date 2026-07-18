import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";

export function AppBar() {
    const navigate = useNavigate()
    
    function Logout(){
        localStorage.removeItem("token");
        navigate("/");
    }



  return (
    <div className="flex border-b justify-between px-10 py-4 items-center mb-4">
      <Link to={"/blogs"}>
        <div className="cursor-pointer text-2xl font-extrabold font-sans">
          Medium
        </div>
      </Link>

      <div className="flex gap-4 items-center">
        <Link to={"/publish"}>
          <button
            type="button"
            className="text-white bg-gray-950 box-border border border-transparent hover:bg-success-strong focus:ring-4 focus:ring-success-medium shadow-xs font-sans leading-5 rounded-2xl text-sm px-2 py-1.5 focus:outline-none cursor-pointer"
          >
            publish
          </button>
        </Link>
        <button
          type="button"
          className="text-white bg-gray-950 box-border border border-transparent hover:bg-success-strong focus:ring-4 focus:ring-success-medium shadow-xs font-sans leading-5 rounded-2xl text-sm px-2 py-1.5 focus:outline-none cursor-pointer" onClick={Logout}
        >
          logout
        </button>
        <Avatar size={"big"} avatarName="Aditya Anand" />
      </div>
    </div>
  );
}
