import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllPosts, getTotalPosts } from "../Services/Services";
import { toast } from "react-toastify";
import "./AllBlog.css";
import NavBar from "./NavBar";

const AllBlogs = () => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  let loadingToast;
  const [totalPosts, setTotalPosts] = useState(0);
  const [posts, setPosts] = useState([]);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const currentPage = parseInt(pageNumber, 10) || 1;

  useEffect(() => {
    loadingToast = toast.loading("Loading Posts...");
    setLoading(true);

    getTotalPosts().then((data) => {
      setTotalPosts(data);
    });

    getAllPosts(currentPage - 1, pageSize)
      .then((data) => {
        console.log(data);
        setPosts(data.content);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [currentPage, pageSize]);

  const handlePostClick = (post) => {
    if(localStorage.getItem("token")) {
    navigate(`/blog/${post.postId}/${post.title.replace(/ /g, "-")}`);
    } else {
      toast.error("You need to be logged in to view the blog post");
    }
  };

  const renderPosts = () => {
    return posts.map((post) => (
      <div key={post.postId} className="post-container" onClick={() => handlePostClick(post)}>
        <h2 className="post-title">
          {post.title}
        </h2>
        <h4 className="author-title">Created by: {post.user.name}</h4>
        <p className="post-content">
          {new Date(post.addedDate)
            .toLocaleString({
              day: "2-digit",
              month: "short",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })
            .replace(/:\d{2}\s/, " ")
            .replace(/,/g, " at")}
        </p>
      </div>
    ));
  };

  const totalPages = Math.ceil(totalPosts / pageSize);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => navigate(`/blogs/page/${i}`)}
          className={`pagination-button ${currentPage === i ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      <NavBar />
      {loading ? (
        <div></div>
      ) : (
        <div>
          {toast.dismiss(loadingToast)}
          <div className="all-blogs-container">
          <div >
            <h1>All Blog Posts</h1>
          </div>
            {renderPosts()}
            <div className="pagination-controls">
              {renderPageNumbers()}
            </div>
            <div className="create-blog-div">
              <button
                onClick={() => {
                  if (localStorage.getItem("token")) {
                    navigate("/create-blog");
                  } else {
                    toast.error(
                      "You need to be logged in to create a blog post"
                    );
                  }
                }}
                className="create-blog"
              >
                Create your own Blog Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
