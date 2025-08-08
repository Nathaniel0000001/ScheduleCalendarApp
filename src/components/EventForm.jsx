// src/components/EventForm.js
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import Firebase auth
import { db } from '../firebase';
import 'bootstrap/dist/css/bootstrap.css';
import './C.css';

function EventForm() {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to add events.");
      return;
    }

    try {
      await addDoc(collection(db, 'events'), {
        title,
        start: new Date(start),
        end: new Date(end),
        userEmail: user.email, // Include the user's email
        createdAt: new Date() // Optional: track event creation time
      });

      setTitle('');
      setStart('');
      setEnd('');
      alert("Event added!");
    } catch (error) {
      console.error("Error adding event: ", error);
      alert("Error adding event.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-light fw-bold">Add New Event</h2>
      <form
        onSubmit={handleSubmit}
        className="p-4 shadow-sm text-light rounded"
        style={{ backgroundColor: '#3e3f49' }}
      >
        <div className="mb-3">
          <label htmlFor="eventTitle" className="form-label fw-bold">Event Title</label>
          <input
            type="text"
            className="form-control bg-secondary text-light border-0"
            id="eventTitle"
            placeholder="Enter event title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="startTime" className="form-label fw-bold">Start Time</label>
          <input
            type="datetime-local"
            className="form-control bg-secondary text-light border-0"
            id="startTime"
            value={start}
            onChange={e => setStart(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endTime" className="form-label fw-bold">End Time</label>
          <input
            type="datetime-local"
            className="form-control bg-secondary text-light border-0"
            id="endTime"
            value={end}
            onChange={e => setEnd(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Event</button>
      </form>
    </div>
  );
}

export default EventForm;
