import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsById, fetchImage } from "../Services/Services";
import NavBar from "./NavBar";
import "./SingleBlog.css"; // Assuming similar CSS

const SingleNews = () => {
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [newsData, setNewsData] = useState({
    title: "",
    content: "",
    imageName: "default.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author_name: "",
    author_id:"",
  });

  useEffect(() => {
    getNewsById(id)
      .then((data) => {
        if (data.imageName) {
          fetchImage(data.imageName).then((response) => {
            setImageUrl(URL.createObjectURL(response));
          });
        }
        console.log(data);
        setNewsData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <NavBar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="blog-container">
          <h1>{newsData.title}</h1>
          <h3>Posted by: {newsData.author_name}</h3>

          <div className="content-container">
            <div className="blog-content">{newsData.content}</div>
            {newsData.imageName && (
              <div>
                <img src={imageUrl} alt="News-Image" className="blog-image" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleNews;
