import React, { useState } from "react";
import "./AddEvent.css";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../Services/Services";
import NavBar from "../NavBar";
import { toast } from "react-toastify";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventName: "",
    eventLocation: "",
    eventTimings: "",
    eventVenue: "",
    eventOrganizer: "",
    eventDescription: "",
    eventRegistration: false,
    attendees: [],
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("event", new Blob([JSON.stringify(formData)], { type: 'application/json' }));
    if (image) formDataToSubmit.append("image", image);
    let loadingToast = toast.loading("Creating Event...");
    createEvent(formDataToSubmit)
      .then(() => {
        toast.dismiss(loadingToast);
        toast.success("Event created successfully");
        setTimeout(() => {
          navigate("/events");
        }
        , 1000);
      })
      .catch(() => {
        toast.dismiss(loadingToast);
        toast.error("Failed to create event");
      });
  };

  return (
    <div>
      <NavBar />
      <div className="create-event-form">
        <h1>Create a New Event</h1>
        <form onSubmit={handleSubmit}>
          <div className="event-form-group">
            <label htmlFor="eventName" className="event-label">
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              className="event-input"
            />
          </div>
          <div className="event-form-group">
            <label htmlFor="eventLocation" className="event-label">
              Event Location
            </label>
            <input
              type="text"
              id="eventLocation"
              name="eventLocation"
              value={formData.eventLocation}
              onChange={handleChange}
              className="event-input"
            />
          </div>
          <div className="event-form-group">
            <label htmlFor="eventTimings" className="event-label">
              Event Timings
            </label>
            <input
              type="datetime-local"
              id="eventTimings"
              name="eventTimings"
              value={formData.eventTimings}
              onChange={handleChange}
              className="event-input"
            />
          </div>
          <div className="event-form-group">
            <label htmlFor="eventVenue" className="event-label">
              Event Venue
            </label>
            <input
              type="text"
              id="eventVenue"
              name="eventVenue"
              value={formData.eventVenue}
              onChange={handleChange}
              className="event-input"
            />
          </div>
          <div className="event-form-group">
            <label htmlFor="eventOrganizer" className="event-label">
              Event Organizer
            </label>
            <input
              type="text"
              id="eventOrganizer"
              name="eventOrganizer"
              value={formData.eventOrganizer}
              onChange={handleChange}
              className="event-input"
            />
          </div>
          <div className="event-form-group">
            <label htmlFor="eventDescription" className="event-label">
              Event Description
            </label>
            <textarea
              id="eventDescription"
              name="eventDescription"
              value={formData.eventDescription}
              onChange={handleChange}
              className="event-textarea"
            ></textarea>
          </div>
          <div className="event-form-group">
            <label htmlFor="image" className="event-label">
              Event Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="event-image-upload"
              onChange={handleFileChange}
            />
          </div>
          {image && <p>Selected file: {image.name}</p>}

          <button type="submit" className="submit-button">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
