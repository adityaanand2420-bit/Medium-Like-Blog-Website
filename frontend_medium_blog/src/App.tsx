import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Signin } from "./pages/Signin";
import { BlogPage } from "./pages/Blog";
import { Signup } from "./pages/signup";
import { AllBlogs } from "./pages/AllBlogs";
import { PublishPost } from "./pages/Publish";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/blog/:id" element={<BlogPage />}></Route>
        <Route path="/blogs" element={<AllBlogs />}></Route>
        <Route path="/publish" element={<PublishPost />}></Route>
        <Route></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
