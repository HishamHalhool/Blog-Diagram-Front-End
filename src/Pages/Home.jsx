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
    <div className="bg-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {posts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-lg mb-4">No posts yet</div>
              <div className="text-gray-500 text-sm">Create your first post to get started!</div>
            </div>
          ) : (
            posts.map((post) => (
              <Card
                post={post}
                key={post.id}
                handleDelete={handleDelete}
                user={user}
                handleEditClick={handleEditClick}
              />
            ))
          )}
        </div>
      </div>
      {user && (
        <button
          className="btn btn-circle btn-xl text-white bg-blue-600 hover:bg-blue-700 fixed bottom-6 right-6 flex items-center justify-center text-3xl leading-none shadow-lg hover:shadow-xl transition-all duration-300 z-50"
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
