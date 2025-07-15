import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Modal({
  isOpen,
  onClose,
  handleCreatePost,
  modalMode,
  editPost,
  handleUpdatePost,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    url: "",
  });

  useEffect(() => {
    if (modalMode === "edit" && editPost) {
      setForm({
        title: editPost.title || "",
        description: editPost.description || "",
        url: editPost.url || "",
      });
    } else {
      setForm({ title: "", description: "", url: "" });
    }
  }, [modalMode, editPost]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      if (modalMode === "add") {
        const res = await axios.post(
          "http://localhost:5000/api/posts",
          {
            ...form,
            userId: user.id,
            createdBy: user.name,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        handleCreatePost(res.data);
        toast.success("Post created successfully!");
      } else if (modalMode === "edit") {
        const res = await axios.put(
          `http://localhost:5000/api/posts/${editPost.id}`,
          {
            ...form,
            userId: editPost.userId,
            createdBy: editPost.createdBy,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const updatedPost = {
          ...res.data,
          userId: editPost.userId,
          createdBy: editPost.createdBy,
        };
        handleUpdatePost(updatedPost);
        toast.success("Post updated successfully!");
      }

      setForm({ title: "", description: "", url: "" });
      onClose();
    } catch (err) {
      console.error(
        "Error submitting form:",
        err.response?.data || err.message
      );
      toast.error(err.response?.data?.message || "Failed to save post. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open bg-black bg-opacity-40 fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-box p-6 rounded-lg shadow-lg w-96 text-center">
        <h3 className="font-bold text-lg mb-4">
          {modalMode === "edit" ? "Edit Post" : "Create New Post"}
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            className="input input-bordered"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            className="input input-bordered"
          />
          <input
            type="text"
            name="url"
            placeholder="Image URL"
            value={form.url}
            onChange={handleChange}
            className="input input-bordered"
          />

          <div className="modal-action mt-4 flex justify-between">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {modalMode === "add" ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
