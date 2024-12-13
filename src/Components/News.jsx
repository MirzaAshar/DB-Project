import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllNews, isAdmin } from "../Services/Services";
import { toast } from "react-toastify";
import "./AllBlog.css";
import NavBar from "./NavBar";

const AllNews = () => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  let loadingToast;
  const [totalNews, setTotalNews] = useState(0);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [news, setNews] = useState([]);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const currentPage = parseInt(pageNumber, 10) || 1;

  useEffect(() => {
    loadingToast = toast.loading("Loading News...");
    setLoading(true);
    isAdmin(localStorage.getItem("userId"))
      .then((data) => {
        setIsAdminUser(data);
      })
      .catch((error) => {
        console.error(error);
      });

    getAllNews(currentPage - 1, pageSize)
      .then((data) => {
        console.log(data);
        setNews(data);
        setTotalNews(data.length);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [currentPage, pageSize]);

  const handleNewsClick = (article) => {
    navigate(`/news/${article.id}/${article.title.replace(/ /g, "-")}`);
  };

  const renderNews = () => {
    return news.map((article) => (
      <div
        key={article.newsId}
        className="post-container"
        onClick={() => handleNewsClick(article)}
      >
        <h2 className="post-title">{article.title}</h2>
        <p className="post-content">
          {new Date(article.createdAt)
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

  const totalPages = Math.ceil(totalNews / pageSize);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => navigate(`/news/page/${i}`)}
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
            <div>
              <h1>All News Articles</h1>
            </div>
            {renderNews()}
            <div className="pagination-controls">{renderPageNumbers()}</div>
            {isAdminUser && (
              <div className="create-blog-div">
                <button
                  onClick={() => {
                    if (localStorage.getItem("token")) {
                      navigate("/create-news");
                    } else {
                      toast.error(
                        "You need to be logged in to create a news article"
                      );
                    }
                  }}
                  className="create-blog"
                >
                  Create a News Article
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllNews;
