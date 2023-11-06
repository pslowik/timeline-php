import React, { useState, useEffect, useContext } from 'react';
import { Dialog } from '@material-ui/core';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';


function EventBadge({ event, alignRight }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const badgeStyle = {
    backgroundColor: event.graphic_feature || '#f9f9f9',
  };
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleEdit = () => {
    window.location.href = `/admin?categoryIdProp=${event.category_id}`;
  };

  const handleDelete = () => {
    // Logika usuwania
  };

  return (
    <div className={`event-badge ${alignRight ? 'align-right' : ''}`} style={badgeStyle}>
      <div onClick={handleOpenDialog}>
        <h3>{event.event_name}</h3>
        <p>Start: {event.start_date}</p>
        <p>Koniec: {event.end_date}</p>
        <img src={event.image_url} alt={`${event.event_name} illustration`} />
        <p>Kategoria: {event.category_name}</p>
        {/* ... dodac inne */}
      </div>

      <AuthContext.Consumer>
        {({ user }) => (
          user && (
            <div className="event-badge-actions">
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )
        )}
      </AuthContext.Consumer>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
      >
        <div className="event-dialog-content">
          <h3>{event.event_name}</h3>
          <p>{event.description}</p>
          {/* ...dodac inne */}
        </div>
      </Dialog>
    </div>
  );
}


function EventTimeline() {
  const [eventsData, setEventsData] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios({
      method: 'post',
      url: 'http://localhost/timeline-php/php/crud.php',
      data: {
        action: 'getEvents'
      },
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    },
    {},
    { withCredentials: true }
    )
      .then(response => {
        console.log('response.data:', response.data);

        setEventsData(response.data);
      })
      .catch(error => {
        console.error('Error fetching events data:', error);
      });
  }, []);

  if (!eventsData) {
    return <div className="spinner"></div>;  
  }

  return (
      <div className="timeline">
        <div className="event-line"></div>
        {eventsData.map((event, index) => (
          <div className="event" key={index}>
            <div className="event-node"></div>
            <EventBadge event={event} alignRight={index % 2 === 1} />
          </div>
        ))}
      </div>
  );
}

export default EventTimeline;
