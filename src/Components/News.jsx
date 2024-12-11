import React, { useEffect, useState } from "react";
import "./News.css";
import NavBar from "./NavBar";
import { getAllNews } from "../Services/Services";

const News = () => {
  const [news, setNews] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    getAllNews()
      .then((data) => {
        setNews(data);
        // update this code to fetch image but how do i do this without that imageName?
        // idk how to convert imageData to image
        setImageUrl(data.image);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <div className="news-container">
        <h1>News</h1>
        {news.map((newsItem) => (
          <div key={newsItem.id} className="news-item">
            <h2>{newsItem.title}</h2>
            <p>
              {new Date(newsItem.createdAt)
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
            <img src={imageUrl} alt={newsItem.title} />
            <p>
              {newsItem.content.length > 200
                ? newsItem.content.slice(0, 200) + "..."
                : newsItem.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
