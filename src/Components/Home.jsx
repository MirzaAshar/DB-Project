import { React, useState, useEffect } from "react";
import NavBar from "./NavBar";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { getAllNews, getAllEvents, fetchImage } from "../Services/Services";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [newsImageUrl, setNewsImageUrl] = useState("");
  const [eventImageUrl, setEventImageUrl] = useState([]);
  const [news, setNews] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    getAllNews().then((response) => {
      const latestNews = response.slice(-1);
      setNews(latestNews);
      console.log(response);

      if (latestNews.length > 0) {
        if (latestNews[0].imageName.includes("default.png")) {
          setNewsImageUrl(
            "https://via.placeholder.com/150?text=No+Image+Available"
          );
        } else {
          fetchImage(latestNews[0].imageName).then((x) => {
            setNewsImageUrl(URL.createObjectURL(x));
            console.log(newsImageUrl);
          });
        }
      }
    });
  }, []);

  useEffect(() => {
    getAllEvents().then((response) => {
      setEvents(response.slice(-3));
      const fetchEventImages = async (events) => {
        const imagePromises = events.map((event) => {
          if (event.imageName.includes("default.png")) {
            return "https://via.placeholder.com/150?text=No+Image+Available";
          }
          return fetchImage(event.imageName).then((image) =>
            URL.createObjectURL(image)
          );
        });
        const images = await Promise.all(imagePromises);
        setEventImageUrl(images);
      };

      fetchEventImages(response.slice(-3));
    });
  }, []);

  return (
    <div>
      <NavBar />
      <div className="home-container">
        <h1 className="home-title">Welcome to the Alumni Portal</h1>
        <p className="home-description">
          This is the home page of the Alumni Portal. Here you can find
          information about our alumni, upcoming events, and more.
        </p>
        <div className="news-section">
          <h2 className="section-title">Latest News</h2>
          <ul className="news-list">
            {news.map((item, index) => (
              <li key={index}>
                {item.title}
                <img
                  src={newsImageUrl}
                  alt={item.title}
                  className="event-image"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="events-section">
          <h2 className="section-title">Upcoming Events</h2>
          <div className="events-list">
            {events.map((event, index) => (
              <div key={index} className="event-card">
                <img
                  src={eventImageUrl[index]}
                  alt={event.eventName}
                  className="event-image"
                />
                <div className="event-details">
                  <h3 className="event-name">{event.eventName}</h3>
                  <p className="event-location">{event.eventLocation}</p>
                  <p className="event-date">
                    {new Date(event.eventTimings)
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
