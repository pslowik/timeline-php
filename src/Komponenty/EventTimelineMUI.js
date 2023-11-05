import React, { useState, useEffect, useContext } from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { Dialog, Button } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function EventBadgeMUI({ event, alignRight }) {
    const [dialogOpen, setDialogOpen] = useState(false);

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
        // Deletion logic
    };

    return (
        <>
            <div onClick={handleOpenDialog} style={{ padding: '10px', backgroundColor: event.graphic_feature || '#f9f9f9' }}>
                <h3>{event.event_name}</h3>
                {/* ... other event info */}
            </div>

            <AuthContext.Consumer>
                {({ user }) => (
                    user && (
                        <div style={{ marginTop: '10px' }}>
                            <Button variant="outlined" color="primary" onClick={handleEdit}>Edit</Button>
                            <Button variant="outlined" color="secondary" onClick={handleDelete} style={{ marginLeft: '10px' }}>Delete</Button>
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
        axios.get({
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
