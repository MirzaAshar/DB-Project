import { React } from "react";
import { useParams } from "react-router-dom";
import { fetchImage, getEventById } from "../../Services/Services";
import NavBar from "../NavBar";
import { useEffect, useState } from "react";
import "./EventDetails.css";

const EventDetails = () => {
  const { eventId, eventName } = useParams();
  const [event, setEvent] = useState({});
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
      const fetchData = async () => {
        await getEventById(eventId).then((event) => {
          fetchImage(event.imageName).then((response) => {
            setImageUrl(URL.createObjectURL(response));
          });
          console.log(event);
          setEvent(event);
        });
      };
      fetchData();
    }, [eventName]);

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="event-details">
          <h1>{eventName}</h1>
          {/* <p className="event-organizer">Organized by: {event.eventOrganizer}</p> */}
          <strong>
            <p className="event-location">{event.eventLocation}</p>
            <p className="event-date">{event.eventTimings}</p>
          </strong>
          <img src={imageUrl} alt={eventName} className="event-image" />
          <p className="event-description">{event.eventDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
