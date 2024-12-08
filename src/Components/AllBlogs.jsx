import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllPosts } from "../Services/Services";
import "./AllBlog.css";
import NavBar from "./NavBar";

const AllBlogs = () => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);

  const currentPage = parseInt(pageNumber, 10) || 1;

  useEffect(() => {
    setLoading(true);
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

  const handleNextPage = () => {
    navigate(`/blogs/page/${currentPage + 1}`);
  };

  const handlePreviousPage = () => {
    navigate(`/blogs/page/${Math.max(currentPage - 1, 1)}`);
  };

  const handlePostClick = (post) => {
    navigate(`/blog/${post.postId}/${post.title.replace(/ /g, "-")}`);
  };

  const renderPosts = () => {
    return posts.map((post) => (
      <div key={post.postId} className="post-container">
        <h2 onClick={() => handlePostClick(post)} className="post-title">
          {post.title}
        </h2>
        <h4 className="author-title">Created by: {post.user.name}</h4>
        <p className="post-content">{post.content}</p>
      </div>
    ));
  };

  return (
    <div>
      <NavBar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="all-blogs-container">
            {renderPosts()}
            <div className="pagination-controls">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                Previous
              </button>
              <button onClick={handleNextPage} className="pagination-button">
                Next
              </button>
              <button
                onClick={() => navigate("/create-blog")}
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
