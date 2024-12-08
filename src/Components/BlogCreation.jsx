import React, { useState } from "react";
import NavBar from "./NavBar";
import "./BlogCreation.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import {
  createBlog,
  getAllCategories,
  getUserById,
} from "../Services/Services";

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      if (!toast.isActive("signin-toast")) {
        toast.info("Please sign in to view this page", {
          toastId: "signin-toast",
        });
      }
      navigate("/signin", { state: { from: location } });
    }
  }, [navigate, location]);
};

const Blog = () => {
  useAuthRedirect();
  const navigate = useNavigate();

  const [_category, setCategory] = useState({ categoryId: 0, categoryName: "" });
  const [user, setUser] = useState({
    userId: 0,
    username: "",
    email: "",
  });

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageName: "post-image.png",
    addedDate: new Date(),
    category: _category,
    user: user,
  });

  const [categories, setCategories] = useState([
    {
      id: 0,
      name: "",
      description: "",
    },
  ]);

  useEffect(() => {
    let isMounted = true;
    getAllCategories().then((data) => {
      if (isMounted) {
        setCategories(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userId = localStorage.getItem("userId");
    const categoryId = localStorage.getItem("categoryId");
    const categoryName = localStorage.getItem("categoryName");
  
    const userData = await getUserById(userId);
    const updatedUser = {
      userId: userId,
      username: userData.name,
      email: userData.email,
    };
  
    const updatedCategory = {
      categoryId: categoryId,
      categoryName: categoryName,
    };
  
    setUser(updatedUser);
    setCategory(updatedCategory);
  
    const updatedFormData = {
      ...formData,
      user: updatedUser,
      category: updatedCategory,
    };
  
    setFormData(updatedFormData);
  
    createBlog(updatedUser.userId, updatedCategory.categoryId, updatedFormData);
  
    console.log(updatedFormData);
  
    setFormData({
      title: "",
      content: "",
      imageName: "post-image.png",
      addedDate: new Date(),
      category: { categoryId: 0, categoryName: "" },
      user: { userId: 0, username: "", email: "" },
    });
    navigate("/blogs/page/1");
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "category") {
      localStorage.setItem("category", value);
      const selectedCategory = categories.find(
        (category) => category.categoryTitle === value
      );
      localStorage.setItem("categoryId", selectedCategory.categoryId);
      if (selectedCategory) {
        setCategory((prevCategory) => ({
          ...prevCategory,
          categoryId: selectedCategory.categoryId,
          categoryName: selectedCategory.categoryTitle,
        }));
        console.log(_category);
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div>
      <NavBar />
      <div className="blog-form">
        <h1>Create a new blog post</h1>
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
            <label htmlFor="category" className="blog-label">
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="styled-select-blog"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option
                  key={category.categoryId}
                  value={category.categoryTitle}
                >
                  {category.categoryTitle}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-button">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Blog;
