import { React, useState, useEffect } from "react";
import NavBar from "./NavBar";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import NU_FEST_IMAGE from "./NuFest.png";
import FCC_IMAGE from "./FCC.png";
import ACM from "./ACM.png";
import NEWS_TO_SHOW from "./NEWS_TO_SHOW.jpg";

const Home = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "NU-Fest",
      location: "FAST NUCES, Karachi",
      date: "10-Oct-2024",
      image: NU_FEST_IMAGE,
    },
    {
      id: 2,
      name: "FCC - Closing Ceremony",
      location: "FAST NUCES, Karachi - Auditorium",
      date: "28-Nov-2024",
      image: FCC_IMAGE,
    },
    {
      id: 3,
      name: "ACM - Intro Session",
      location: "FAST NUCES, Karachi - Main Audi",
      date: "24-Oct-2024",
      image: ACM,
    }
  ]);
  const [news, setNews] = useState([
    { id: 1, title: "Muhammad Osama Wins The Best Research Award", image: NEWS_TO_SHOW },
  ]);

  const navigate = useNavigate();

  
  const handleRegister = (event) => {
    console.log(`Registering for event with ID: ${event.id}`);
    navigate("/events/" + event.name.replace(/ /g, "-"));
  };

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
                  src={item.image}
                  alt={item.name}
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
                  src={event.image}
                  alt={event.name}
                  className="event-image"
                />
                <div className="event-details">
                  <h3 className="event-name">{event.name}</h3>
                  <p className="event-location">{event.location}</p>
                  <p className="event-date">{event.date}</p>
                  <button
                    onClick={() => handleRegister(event)}
                    className="register-button"
                  >
                    View Details
                  </button>
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
