import { useEffect, useState } from "react";

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
      .get("http://localhost:3000/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching data", err));
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
      await axios.delete(`http://localhost:3000/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts((prev) => prev.filter((post) => "" + post.id !== "" + id));
    } catch (err) {
      console.error("Delete failed", err);
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
    </>
  );
}

export default App;
