import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NavBar from "./NavBar";
import { addNews, getUserById } from "../Services/Services";
import "./BlogCreation.css";

const CreateNews = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageName: "default.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author_name: "",
    author_id: localStorage.getItem("userId"),
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setFormData((prevData) => ({
        ...prevData,
        imageName: file.name.replace(/\s/g, "_"),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    getUserById(localStorage.getItem("userId")).then((response) => {
      formData.author_name = response.name;
    });
    const formDataToSend = new FormData();
    formDataToSend.append(
      "news",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );
    if (image) {
      console.log(image);
      formDataToSend.append("image", image);
    }
    console.log(formData);
    const userId = localStorage.getItem("userId");

    addNews(formDataToSend, userId)
      .then(() => {
        toast.success("News created successfully");
      })
      .catch(() => {
        toast.error("Failed to create news");
      });

    // navigate("/news");
  };

  return (
    <div>
      <NavBar />
      <div className="blog-form">
        <h1>Create a News Article</h1>
        <form onSubmit={handleSubmit}>
          <div className="blog-form-group">
            <label htmlFor="title" className="blog-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="blog-input"
            />
          </div>
          <div className="blog-form-group">
            <label htmlFor="content" className="blog-label">
              Content
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={handleChange}
              className="blog-textarea"
            ></textarea>
          </div>
          <div className="blog-form-group">
            <label htmlFor="image" className="blog-label">
              Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="blog-image-upload"
              onChange={handleFileChange}
            />
          </div>
          {image && <p>Selected file: {image.name}</p>}
          <button type="submit" className="submit-button">
            Create News
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNews;
