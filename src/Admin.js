import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Admin() {

const location = useLocation();
const { categoryIdProp, 
        eventIdProp,
        categoryNameProp,
        categoryDescriptionProp,
        eventNameProp,
        eventStartDateProp,
        eventEndDateProp,
        eventDescriptionProp,
        eventImageUrlProp,
    } = location.state || {};

    const [eventId, setEventId] = useState(eventIdProp || '');
    const [eventCategoryId, setEventCategoryId] = useState(categoryIdProp || '');

    const [categoryId, setCategoryId] = useState(categoryIdProp || '');
    const [categoryIdDel, setCategoryIdDel] = useState(categoryIdProp || '');

    const [categoryName, setCategoryName] = useState(categoryNameProp ||'');
    const [categoryDescription, setCategoryDescription] = useState(categoryDescriptionProp || '');
    const [eventName, setEventName] = useState(eventNameProp || '');
    const [eventDescription, setEventDescription] = useState(eventDescriptionProp || '');
    const [eventStartDate, setEventStartDate] = useState(eventStartDateProp || '');
    const [eventEndDate, setEventEndDate] = useState(eventEndDateProp || '');
    const [eventImageUrl, setEventImageUrl] = useState(eventImageUrlProp || '');

    const [categoryError, setCategoryError] = useState(false);
    const [categoryErrorDel, setCategoryErrorDel] = useState(false);
    const [eventError, setEventError] = useState(false);
    const [reload, setReload] = useState(false);
    const [categoriesData, setCategoriesData] = useState([]);

    const createCategory = () => {
        if (categoryName && categoryDescription) {
            const data = {
                action: 'createCategory',
                category_name: categoryName,
                graphic_feature: categoryDescription
            };

            axios.post('http://localhost/timeline-php/php/crud-json.php', JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
                .then(response => {
                    setReload(!reload);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            setCategoryError(true);
        }
    };

    const createEvent = () => {
        if (eventName && eventStartDate && eventEndDate && eventDescription && eventImageUrl && eventCategoryId) {
            const data = {
                action: 'createEvent',
                category_id: eventCategoryId,
                event_name: eventName,
                start_date: eventStartDate,
                end_date: eventEndDate,
                description: eventDescription,
                image_url: eventImageUrl
            };

            axios.post('http://localhost/timeline-php/php/crud-json.php', JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            setEventError(true);
        }
    };

    const updateCategory =  async () => {
        if (categoryName && categoryDescription) {
            const data = {
                action: 'updateCategory',
                category_id: categoryId,
                category_name: categoryName,
                graphic_feature: categoryDescription
            };
    
            try {
                const response = await axios.post('http://localhost/timeline-php/php/crud-json.php', JSON.stringify(data), {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                setReload(!reload);
                console.log(response.data.message);
            } catch (error) {
                console.log(error);
            }
        } else {
            setCategoryError(true);
        }
    };

    const updateEvent = async () => {
        if (eventName && eventStartDate && eventEndDate && eventDescription && eventImageUrl && eventCategoryId) {
            const data = {
                action: 'updateEvent',
                event_id: eventId,
                category_id: eventCategoryId,
                event_name: eventName,
                start_date: eventStartDate,
                end_date: eventEndDate,
                description: eventDescription,
                image_url: eventImageUrl
            };
    
            try {
                const response = await axios.post('http://localhost/timeline-php/php/crud-json.php', JSON.stringify(data), {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                console.log(response.data.message);
            } catch (error) {
                console.log(error);
            }
        } else {
            setEventError(true);
        }
    };

    const deleteCategory = async () => {
        if (categoryIdDel) {
            const data = {
                action: 'deleteCategory',
                category_id: categoryIdDel
            };

            try {
                const response = await axios.delete('http://localhost/timeline-php/php/crud-json.php', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(data),
                    withCredentials: true
                });
                setReload(!reload);
                console.log(response.data.message);
            } catch (error) {
                console.log(error);
            }
        } else {
            setCategoryErrorDel(true);
        }
    };

    useEffect(() => {
        axios({
            method: 'post',
            url: 'http://localhost/timeline-php/php/crud.php',
            data: {
                action: 'getCategories'
            },
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        },
        {},
        { withCredentials: true }
        )
            .then(response => {
                setCategoriesData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [reload]); // useEffect listener


    return (
        <div className="under_2 containerAdmin">
            <h2>Categories</h2>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Feature</th>
                    </tr>
                </thead>
                <tbody>
                    {categoriesData.map(category => (
                        <tr key={category.category_id}>
                            <td>{category.category_id}</td>
                            <td>{category.category_name}</td>
                            <td>{category.graphic_feature}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>{categoryId ? 'Update Category' : 'Create Category'}</h2>
            {categoryId && <label>
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
            {categoryError && <p>Please fill in all fields</p>}
            {categoryId ? <button onClick={updateCategory}>Update Category</button> : <button onClick={createCategory}>Create Category</button>}

            <hr></hr>

            <h2>{categoryId ? 'Delete Category' : 'Delete Category'}</h2>

            <label>
                ID:
                <input type="text" value={categoryIdDel} onChange={e => setCategoryIdDel(e.target.value)} />
            </label>
            {categoryErrorDel && <p>Please fill in that field</p>}
            <button onClick={deleteCategory}>Delete Category</button>
            

            <hr></hr>

            <h2>{eventId ? 'Update Event' : 'Create Event'}</h2>
            {eventId && <label>
                ID:
                <input type="text" value={eventId} readOnly />
            </label>}
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
            <label>
                Category ID:
                <input type="text" value={eventCategoryId} onChange={e => setEventCategoryId(e.target.value)} />
            </label>
            {eventError && <p>Please fill in all fields</p>}
            {eventId ? <button onClick={updateEvent}>Update Event</button> : <button onClick={createEvent}>Create Event</button>}
        </div>
    );
}

export default Admin;
