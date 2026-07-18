import { Link, useNavigate } from "react-router-dom";
import { InputBox } from "./input";
import type { SignupType } from "@adityaworkspace24/medium-common";
import { useState } from "react";
import axios from "axios";
import { Backend_Url } from "../config";

export function Auth({buttonText} : {buttonText : "signin" | "signup"}) {
  const [signupForm, setSignuForm] = useState<SignupType>({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();

  async function sendRequset(){
        try {
           const res = await axios.post(`${Backend_Url}/hono/api/${buttonText == "signup" ? "signup" : "signin"}`,signupForm)
           const jwtToken  = res.data.token;
           localStorage.setItem("token" , jwtToken);
           navigate("/blogs")
        } catch (err) {
            console.error(err);
        }
        
  }



  return (
    <div className=" h-screen flex justify-center flex-col items-center p-6">
      <div className="flex flex-col gap-3">
        <header className="px-9 gap-7">
          <div className="font-medium text-3xl mb-1">{buttonText === "signup" ? "Create an Account" : "Login to an account"}</div>
          <div className="flex text-sm font-medium text-slate-400 ml-1 justify-center">
           {buttonText === "signup" ? "Already have an account?" : "Don't have an account?"}
            <Link to={buttonText === "signup" ? "/": "/signup"} className="pl-1 underline">
              {buttonText === "signup" ? "Login" : "Signup"}
            </Link>
          </div>
        </header>
        <InputBox
          placeholder="Enter your name"
          label="Name"
          onchange={(e) =>
            setSignuForm((c) => ({ ...c, name: e.target.value }))
          }
        />
        <InputBox
          placeholder="Enter your email"
          label="Email"
          onchange={(e) =>
            setSignuForm((c) => ({ ...c, email: e.target.value }))
          }
        />
        <InputBox
          placeholder="Enter your password"
          label="Password"
          type="Password"
          onchange={(e) =>
            setSignuForm((c) => ({ ...c, password: e.target.value }))
          }
        />
        <button type="button" className="text-white bg-black box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-2xl text-sm px-4 py-2.5 focus:outline-none mt-3" onClick={sendRequset}>{buttonText === "signin" ? "Signin" : "Signup"}</button>
      </div>
    </div>
  );
}
