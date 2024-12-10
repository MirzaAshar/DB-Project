import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NavBar from "./NavBar";
import { createBlog, getAllCategories, getUserById } from "../Services/Services";
import "./BlogCreation.css";

const Blog = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageName: "sample-image.png",
    addedDate: new Date().toISOString(),
    category: {
      categoryId: 0,
      categoryTitle: "",
      categoryDescription: "",
    },
    user: {
      id: 0,
      name: "",
      email: "",
      about: "",
    },
    comments: [],
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "category") {
      const selectedCategory = categories.find(
        (category) => category.categoryId === parseInt(value, 10)
      );

      if (selectedCategory) {
        setFormData((prevData) => ({
          ...prevData,
          category: selectedCategory,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
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

    const userData = await getUserById(localStorage.getItem("userId"));
    formData.user.id = userData.id;
    formData.user.name = userData.name;
    formData.user.email = userData.email;
    formData.user.about = userData.about

    console.log(formData);

    const formDataToSend = new FormData();
    formDataToSend.append("postDto", new Blob([JSON.stringify(formData)], { type: 'application/json' }));
    if (image) {
      console.log(image);
      formDataToSend.append("image", image);
    }
    
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }

    try {
      const response = await createBlog(
        formDataToSend,
        formData.user.id,
        formData.category.categoryId
      );

      if (response) {
        toast.success("Blog post created successfully!");
        navigate("/blogs/page/1");
      }
    } catch (error) {
      toast.error("Failed to create blog post");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="blog-form">
        <h1>Create a New Blog Post</h1>
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
          <div className="blog-form-group">
            <label htmlFor="category" className="blog-label">
              Category
            </label>
            <select
              id="category"
              value={formData.category.categoryId || ""}
              onChange={handleChange}
              className="styled-select-blog"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryTitle}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-button">
            Create Blog Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Blog;