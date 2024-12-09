// import React, { useState } from "react";
// import NavBar from "./NavBar";
// import "./BlogCreation.css";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useLocation } from "react-router-dom";
// import {
//   createBlog,
//   getAllCategories,
//   getUserById,
// } from "../Services/Services";

// const useAuthRedirect = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       if (!toast.isActive("signin-toast")) {
//         toast.info("Please sign in to view this page", {
//           toastId: "signin-toast",
//         });
//       }
//       navigate("/signin", { state: { from: location } });
//     }
//   }, [navigate, location]);
// };

// const Blog = () => {
//   useAuthRedirect();
//   const navigate = useNavigate();

//   const [image, setImage] = useState(null);
//   const [_category, setCategory] = useState({ categoryId: 0, categoryTitle: "", categoryDescription: "" });
//   const [user, setUser] = useState({
//     id: 0,
//     name: "",
//     email: "",
//     about: ""
//   });

//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     addedDate: new Date(),
//     category: _category,
//     user: user,
//   });

//   const [categories, setCategories] = useState([
//     {
//       id: 0,
//       name: "",
//       description: "",
//     },
//   ]);

//   useEffect(() => {
//     let isMounted = true;
//     getAllCategories().then((data) => {
//       if (isMounted) {
//         setCategories(data);
//       }
//     });
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const userId = localStorage.getItem("userId");
//     const categoryId = localStorage.getItem("categoryId");

//     const userData = await getUserById(userId);
//     const updatedUser = {
//       id: userId,
//       name: userData.name,
//       email: userData.email,
//       about: userData.about,
//     };

//     const updatedCategory = {
//       categoryId: categoryId,
//       categoryTitle: localStorage.getItem("categoryName"),
//       categoryDescription: "",
//     };

//     const updatedFormData = {
//       ...formData,
//       user: updatedUser,
//       category: updatedCategory,
//     };

//     const formDataToSend = new FormData();
//     formDataToSend.append("postDto", JSON.stringify(updatedFormData));
//     if (image) {
//       formDataToSend.append("image", e.target.image.files[0]);
//     }
//   for (let pair of formDataToSend.entries()) {
//     console.log(pair[0] + ': ' + pair[1]);
//   }
//     try {
//       const response = await createBlog(
//         formDataToSend,
//         updatedUser.id,
//         updatedCategory.categoryId
//       );
//       if (response) {
//         toast.success("Blog post created successfully");
//       }
//     } catch (error) {
//       toast.error("Failed to create blog post");
//     }
//   };


//   const handleChange = (e) => {
//     const { id, value } = e.target;

//     if (id === "category") {
//       localStorage.setItem("category", value);
//       const selectedCategory = categories.find(
//         (category) => category.categoryTitle === value
//       );
//       localStorage.setItem("categoryId", selectedCategory.categoryId);
//       if (selectedCategory) {
//         setCategory((prevCategory) => ({
//           ...prevCategory,
//           categoryId: selectedCategory.categoryId,
//           categoryTitle: selectedCategory.categoryTitle,
//         }));
//       }
//     }
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };


//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     console.log(file);
//     if (file) {
//       setImage(file.name);
//     } else {
//       setImage(null);
//     }
//   };

//   return (
//     <div>
//       <NavBar />
//       <div className="blog-form">
//         <h1>Create a new blog post</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="blog-form-group">
//             <label htmlFor="title" className="blog-label">
//               Title
//             </label>
//             <input
//               type="text"
//               id="title"
//               value={formData.title}
//               onChange={handleChange}
//               className="blog-input"
//             />
//           </div>
//           <div className="blog-form-group">
//             <label htmlFor="content" className="blog-label">
//               Content
//             </label>
//             <textarea
//               id="content"
//               value={formData.content}
//               onChange={handleChange}
//               className="blog-textarea"
//             ></textarea>
//           </div>
//           <div>
//             <label htmlFor="image" className="blog-label">
//               Image
//             </label>
//             <input
//               type="file"
//               id="image"
//               accept="image/*"
//               className="blog-image-upload"
//               onChange={handleFileChange}
//             />
//             {image && <p>Selected file: {image}</p>}
//           </div>
//           <div className="blog-form-group">
//             <label htmlFor="category" className="blog-label">
//               Category
//             </label>
//             <select
//               id="category"
//               value={formData.category}
//               onChange={handleChange}
//               className="styled-select-blog"
//             >
//               <option value="">Select a category</option>
//               {categories.map((category) => (
//                 <option
//                   key={category.categoryId}
//                   value={category.categoryTitle}
//                 >
//                   {category.categoryTitle}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button type="submit" className="submit-button">
//             Create
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Blog;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NavBar from "./NavBar";
import { createBlog, getAllCategories, getUserById } from "../Services/Services";
import "./BlogCreation.css";
import { type } from "@testing-library/user-event/dist/type";

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
      id: 0, // Replace with the actual logged-in user ID
      name: "", // Replace with actual user name
      email: "", // Replace with actual user email
      about: "", // Replace with actual user details
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
        imageName: file.name,
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