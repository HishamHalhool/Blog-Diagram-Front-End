import React, { useState } from "react";
import Card from "../Components/Card";
import Modal from "../Components/Modal";

export default function Home(props) {
  const { posts, handleDelete, handleCreatePost, user, handleUpdatePost } =
    props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("");
  const [editPost, setEditPost] = useState({});

  const handleEditClick = (post) => {
    setEditPost(post);
    setModalMode("edit");
    setIsModalOpen(true);
  };
  const handleAddClick = () => {
    setModalMode("add");
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-800">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-gray-800">

        {posts.map((post) => (
          <Card
            post={post}
            key={post.id}
            handleDelete={handleDelete}
            user={user}
            handleEditClick={handleEditClick}
          />
        ))}
      </div>
      {user && (
        <button

          className="btn btn-circle btn-xl text-black bg-blue-700 fixed bottom-2 right-1 flex items-center justify-center text-3xl leading-none"

          onClick={handleAddClick}
        >
          +
        </button>
      )}
      <Modal
        handleCreatePost={handleCreatePost}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalMode={modalMode}
        editPost={editPost}
        handleUpdatePost={handleUpdatePost}
      />
    </div>
  );
}
