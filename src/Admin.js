import React, { useState } from 'react';
import axios from 'axios';

function Admin({categoryIdProp, eventIdProp}) {
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [categoryId, setCategoryId] = useState(categoryIdProp || '');
    const [eventId, setEventId] = useState(eventIdProp || '');
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventStartDate, setEventStartDate] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [eventImageUrl, setEventImageUrl] = useState('');

    const createCategory = () => {
        axios.post('http://localhost/timeline-php/php/crud.php', {
            action: 'createCategory',
            category_name: categoryName,
            graphic_feature: categoryDescription
        }, { withCredentials: true })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    };

    const createEvent = () => {
        axios.post('http://localhost/timeline-php/php/crud.php', {
            action: 'createEvent',
            category_id: categoryId,
            name: eventName,
            start_date: eventStartDate,
            end_date: eventEndDate,
            description: eventDescription,
            image_url: eventImageUrl
        }, { withCredentials: true })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    };

    const updateCategory = () => {
        axios.post('http://localhost/timeline-php/php/crud.php', {
            action: 'updateCategory',
            category_id: categoryId,
            category_name: categoryName,
            graphic_feature: categoryDescription
        },
        { withCredentials: true })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    };

    const updateEvent = () => {
        axios.post('http://localhost/timeline-php/php/crud.php', {
            action: 'updateEvent',
            id: eventId,
            category_id: categoryId,
            name: eventName,
            start_date: eventStartDate,
            end_date: eventEndDate,
            description: eventDescription,
            image_url: eventImageUrl
        }, { withCredentials: true })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    };

    return (
        <div>
            <h2>Create or Update Category</h2>
            {categoryIdProp && <label>
                ID:
                <input type="text" value={categoryId} readOnly />
            </label>}
            <label>
                Name:
                <input type="text" value={categoryName} onChange={e => setCategoryName(e.target.value)} />
            </label>
            <label>
                Feature:
                <input type="text" value={categoryDescription} onChange={e => setCategoryDescription(e.target.value)} />
            </label>
            <button onClick={createCategory}>Create Category</button>
            <button onClick={updateCategory}>Update Category</button>

            <h2>Create or Update Event</h2>
            {eventIdProp && <label>
                ID:
                <input type="text" value={eventId} readOnly />
            </label>}
            <label>
                Category ID:
                <input type="text" value={categoryId} onChange={e => setCategoryId(e.target.value)} />
            </label>
            <label>
                Name:
                <input type="text" value={eventName} onChange={e => setEventName(e.target.value)} />
            </label>
            <label>
                Start Date:
                <input type="datetime-local" value={eventStartDate} onChange={e => setEventStartDate(e.target.value)} />
            </label>
            <label>
                End Date:
                <input type="datetime-local" value={eventEndDate} onChange={e => setEventEndDate(e.target.value)} />
            </label>
            <label>
                Description:
                <input type="text" value={eventDescription} onChange={e => setEventDescription(e.target.value)} />
            </label>
            <label>
                Image URL:
                <input type="text" value={eventImageUrl} onChange={e => setEventImageUrl(e.target.value)} />
            </label>
            <button onClick={createEvent}>Create Event</button>
            <button onClick={updateEvent}>Update Event</button>
        </div>
    );
}

export default Admin;
