import React from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const { eventName } = useParams();

  return (
    <div>
      <h1>Event Details</h1>
      <h2>{eventName.replace(/-/g, ' ')}</h2>
      <p>Details about the event go here...</p>
    </div>
  );
};

export default EventDetails;
