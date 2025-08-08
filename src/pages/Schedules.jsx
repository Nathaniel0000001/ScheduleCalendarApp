// src/pages/Schedules.js
import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../firebase';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';

function Schedules() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setEvents([]);
        setLoading(false);
        return;
      }

      const eventsRef = collection(db, 'events');
      const q = query(eventsRef, where('userEmail', '==', user.email));

      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const eventsData = snapshot.docs.map(docSnap => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            title: data.title,
            start: data.start?.toDate ? data.start.toDate() : new Date(data.start),
            end: data.end?.toDate ? data.end.toDate() : new Date(data.end),
          };
        });
        setEvents(eventsData);
        setLoading(false);
      });

      // Clean up Firestore listener
      return () => unsubscribeSnapshot();
    });

    // Clean up auth listener
    return () => unsubscribeAuth();
  }, []);

  // Function to delete an event
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteDoc(doc(db, "events", id));
        console.log("Event deleted successfully");
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2 className='mb-4 justify-content-center d-flex text-light fw-bold'>📅 Schedule List</h2>
      <div className='mb-4 justify-content-center' style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {loading ? (
          <p className="text-light">Loading...</p>
        ) : events.length === 0 ? (
          <p className="text-light">No events scheduled.</p>
        ) : (
          events.map(event => (
            <div key={event.id} className="card bg-secondary text-white" style={{ width: '18rem' }}>
              <div className="card-header border-bottom border-secondary d-flex justify-content-between align-items-center">
                <h3 className="text-white mb-0">{event.title}</h3>
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(event.id)}
                >
                  🗑
                </button>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-dark text-light border-secondary">
                  <p><strong>Start:</strong> {moment(event.start).format('MMMM Do YYYY, h:mm A')}</p>
                </li>
                <li className="list-group-item bg-dark text-light border-secondary">
                  <p><strong>End:</strong> {moment(event.end).format('MMMM Do YYYY, h:mm A')}</p>
                </li>
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Schedules;
