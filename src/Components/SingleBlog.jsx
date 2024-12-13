import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById, addComment, fetchImage } from "../Services/Services";
import NavBar from "./NavBar";
import "./SingleBlog.css";
import { toast } from "react-toastify";

const SingleBlog = () => {
  const { postId } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState({
    addedDate: "",
    category: { categoryId: 0, categoryTitle: "", categoryDescription: "" },
    comments: [],
    content: "",
    imageName: "",
    postId: 0,
    title: "",
    user: { id: 0, name: "", email: "", about: "", universityId: "" },
  });

  useEffect(() => {
    getBlogById(postId)
      .then((data) => {
        console.log(data);
        if (data.imageName) {
          fetchImage(data.imageName).then((response) => {
            setImageUrl(URL.createObjectURL(response));
          });
        }
        setBlogData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [postId]);

  return (
    <div>
      <NavBar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="blog-container">
          <h1>{blogData.title}</h1>
          <h3>Posted by: {blogData.user?.name || "Unknown"}</h3>

          {blogData.category?.categoryTitle && (
            <div className="blog-category">
              <strong>Category: </strong>
              {blogData.category.categoryTitle}
            </div>
          )}
          <div className="content-container">
            <div className="blog-content">{blogData.content}</div>
            {
              blogData.imageName  && (
                <div>
              <img src={imageUrl} alt="Blog-Image" className="blog-image" />
              </div>  )  
            }
          </div>

          <div className="add-comment-section">
            <h2>Comments</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!localStorage.getItem("token")) {
                  toast.error("Login to add comment");
                  return;
                }
                const commentContent = e.target.elements.commentContent.value;
                addComment(
                  commentContent,
                  postId,
                  localStorage.getItem("userId")
                )
                  .then(() => {
                    return getBlogById(postId);
                  })
                  .then((data) => {
                    setBlogData(data);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                e.target.elements.commentContent.value = "";
              }}
            >
              <input
                type="text"
                name="commentContent"
                placeholder="Write your comment here..."
                className="comment-input"
                required
              ></input>
              <button type="submit" className="comment-add-btn">
                Add Comment
              </button>
            </form>
          </div>

          <div className="comments-section">
            {blogData.comments && blogData.comments.length > 0 ? (
              blogData.comments.map((comment, index) => (
                <div key={comment.id} className="comment">
                  <p>
                    <strong>{comment.userName || "Anonymous"}: </strong>
                    <span>{comment.content}</span>
                  </p>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleBlog;
