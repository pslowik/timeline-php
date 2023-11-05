import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { Dialog, Button } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';


function EventBadgeMUI({ event, alignRight }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleEdit = () => {
        console.log('event:', event.event_id);
        console.log('category:', event.category_id);
        navigate('/admin', { state: { categoryIdProp: event.category_id, eventIdProp: event.event_id } });
        //navigate('/admin', { state: { event } });

    };

    const handleDelete = async (eventId) => {
        try {
            const data = {
                action: 'deleteEvent',
                event_id: eventId
            };

            const response = await axios.delete('http://localhost/timeline-php/php/crud-json.php', {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data),
                withCredentials: true
            });

            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div onClick={handleOpenDialog} style={{ padding: '10px', backgroundColor: event.graphic_feature || '#f9f9f9' }}>
                <h3>{event.event_name}</h3>
                <p>Start: {event.start_date}</p>
                <p>Koniec: {event.end_date}</p>
                {event.image_url && /^https?:\/\/.+/.test(event.image_url) ? <img src={event.image_url} alt={`${event.event_name} illustration`} /> : <p>Brak obrazka</p>}
                <p>Kategoria: {event.category_name}</p>
                {/* ... dodac inne informacje o wydarzeniu */}
            </div>

            <AuthContext.Consumer>
                {({ user }) => (
                    user && (
                        <div style={{ marginTop: '10px' }}>
                            <Button variant="outlined" color="primary" onClick={handleEdit}>Edit</Button>
                            <Button variant="outlined" color="secondary" onClick={() => handleDelete(event.event_id)} style={{ marginLeft: '10px' }}>Delete</Button>
                        </div>
                    )
                )}
            </AuthContext.Consumer>

            <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
            >
                <div style={{ padding: '20px' }}>
                    <h3>{event.event_name}</h3>
                    <p>{event.description}</p>
                    {/* ... more event info */}
                </div>
            </Dialog>
        </>
    );
}

function EventTimelineMUI() {
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
                setEventsData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    if (!eventsData) {
        return <div className="spinner"></div>;
    }

    return (
        <Timeline position="alternate">
            {eventsData.map((event, index) => (
                <TimelineItem key={index}>
                    <TimelineSeparator>
                        <TimelineDot />
                        {index < eventsData.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                        <EventBadgeMUI event={event} alignRight={index % 2 === 1} />
                    </TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    );
}

export default EventTimelineMUI;
