import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllEvents, fetchImage, isAdmin } from "../../Services/Services";
import "./AllEvents.css";
import NavBar from "../NavBar";

const AllEvents = () => {
  const navigate = useNavigate();
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [events, setEvents] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    isAdmin(localStorage.getItem("userId"))
      .then((data) => {
        setIsAdminUser(data);
      })
      .catch((error) => {
        console.error(error);
      });
    getAllEvents().then((events) => {
      // const filteredEvents = events.filter(
      //   (event) => new Date(event.eventTimings) >= new Date()
      // );
      setEvents(events);
      const fetchImages = async () => {
        const urls = {};
        for (const event of events) {
          if (event.imageName) {
            const response = await fetchImage(event.imageName);
            urls[event.imageName] = URL.createObjectURL(response);
          }
        }
        setImageUrls(urls);
      };
      fetchImages();
    });
  }, []);
  const handleClick = (event) => {
    navigate(`/events/${event.eventId}/` + event.eventName.replace(/ /g, "-"));
  };
  return (
    <div>
      <NavBar />
      <div className="event-container">
        <h2 className="section-title">Upcoming Events</h2>
        <div className="events-list">
          {events.map((event, index) => (
            <div key={index} className="event-card">
              {event.imageName && (
                <img
                  src={imageUrls[event.imageName]}
                  alt={event.eventName}
                  className="event-image"
                />
              )}
              <div className="event-details">
                <h3 className="event-name">{event.eventName}</h3>
                <p className="event-location">{event.eventLocation}</p>
                <p className="event-date">{event.eventTimings}</p>
                <button
                  onClick={() => handleClick(event)}
                  className="register-button"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        {isAdminUser && (
          <button className="create-event" onClick={() => navigate("/add-event")}>
            Add Event
          </button>
        )}
      </div>
    </div>
  );
};

export default AllEvents;
