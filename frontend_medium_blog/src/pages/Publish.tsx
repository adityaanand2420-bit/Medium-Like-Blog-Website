import { useState, type ChangeEvent } from "react";
import { AppBar } from "../component/AppBar";
import { InputBox } from "../component/input";
import { TextArea } from "../component/Text_Area";
import axios from "axios";
import { Backend_Url } from "../config";
import { useNavigate } from "react-router-dom";

export function PublishPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  function dbCall() {
    axios
      .post(
        `${Backend_Url}/hono/api/blog/post`,
        {
          title,
          content,
          published : true
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      .then((res) => {
        if(res.status === 200){
            navigate("/blogs")
        }
        
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <AppBar></AppBar>
      <div className="flex flex-col items-center">
        <div className="flex flex-col w-full max-w-7xl p-5">
          <InputBox
            placeholder="Title"
            onchange={(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            label=""
          ></InputBox>
          <div className="mt-9 h-screen">
            <TextArea
              onchange={(e) => setContent(e.target.value)}
              onclick={dbCall}
            ></TextArea>
          </div>
        </div>
      </div>
    </div>
  );
}
