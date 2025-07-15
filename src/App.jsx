import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import "./App.css";
import Navbar from "./Components/Navbar";
import { Route, Routes} from "react-router";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import axios from "axios";


function App() {
  const [posts, setPosts] = useState([]);
  
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    axios

      .get("http://localhost:5000/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => {
        console.error("Error fetching data", err);
        toast.error("Failed to load posts. Please refresh the page.");
      });

  }, []);

  

  const handleCreatePost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleUpdatePost = (updatedPost) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/posts/${id}`, {

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts((prev) => prev.filter((post) => "" + post.id !== "" + id));

      toast.success("Post deleted successfully!");
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete post. Please try again.");
    }
  };

  const handleUserLogin = (userData) => {
    setUser(userData);
  };


  const onLogout =()=>{
    setUser(null)
  }
  

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              posts={posts}
              handleDelete={handleDelete}
              handleCreatePost={handleCreatePost}
              user={user}
              handleUpdatePost={handleUpdatePost}
            />
          }
        />
        <Route
          path="/login"
          element={<Login handleUserLogin={handleUserLogin} />}
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </>
  );
}

export default App;
