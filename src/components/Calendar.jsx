import React, { useEffect, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../firebase';
import 'bootstrap/dist/css/bootstrap.css';

const localizer = momentLocalizer(moment);

function Calendar() {
  const [events, setEvents] = useState([]);
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const auth = getAuth();
  
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) return;
  
      const eventsRef = collection(db, 'events');
      const q = query(eventsRef, where('userEmail', '==', user.email));
  
      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const eventsData = snapshot.docs.map(doc => {
          const data = doc.data();
          const start = data.start?.toDate ? data.start.toDate() : new Date(data.start);
          const end = data.end?.toDate ? data.end.toDate() : new Date(data.end);
  
          return {
            ...data,
            start,
            end,
          };
        });
  
        setEvents(eventsData);
  
        const highlightDates = eventsData.map(event =>
          moment(event.start).format('YYYY-MM-DD')
        );
  
        setHighlightedDates([...new Set(highlightDates)]); // Remove duplicates
      });
  
      // Clean up Firestore listener
      return () => unsubscribeSnapshot();
    });
  
    // Clean up auth listener
    return () => unsubscribeAuth();
  }, []);

  const dayPropGetter = (date) => {
    const dateStr = moment(date).format('YYYY-MM-DD');
    const todayStr = moment().format('YYYY-MM-DD');
    const isInCurrentMonth = date.getMonth() === currentDate.getMonth();

    if (dateStr === todayStr) {
      return {
        style: {
          backgroundColor: '#3e3f49',
          border: '#302b77',
        },
      };
    }

    if (highlightedDates.includes(dateStr)) {
      return {
        style: {
          backgroundColor: '#3e3f49',
        },
      };
    }

    if (!isInCurrentMonth) {
      return {
        style: {
          backgroundColor: '#26262f',
        },
      };
    }

    return {};
  };

  return (
    <div style={{ height: 600, color: 'white', paddingBottom: '5em' }}>

      <div className="mb-4 text-center">
     <h1 style={{ fontWeight: 'bold', color: 'white' }}>Calendar</h1>
      <h4 style={{ color: '#aaa' }}>{moment(currentDate).format('MMMM YYYY')}</h4>
    </div>

      <div className="mb-3 d-flex justify-content-center">
        <button
          className="btn-dark custom-btn-middle"
          style={{ borderRadius: '20px 0 0 20px', fontWeight: 'bold' }}
          onClick={() => setCurrentDate(new Date())}
        >
          Today
        </button>
        <button
          className="btn-dark custom-btn-middle"
          style={{ borderRadius: '0', fontWeight: 'bold' }}
          onClick={() =>
            setCurrentDate(prev => moment(prev).subtract(1, 'month').toDate())
          }
        >
          Back
        </button>
        <button
          className="btn-dark custom-btn-middle"
          style={{ borderRadius: '0 20px 20px 0', fontWeight: 'bold' }}
          onClick={() =>
            setCurrentDate(prev => moment(prev).add(1, 'month').toDate())
          }
        >
          Next
        </button>
      </div>

      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        components={{
          toolbar: () => null,
        }}
        date={currentDate}
        onNavigate={(date) => setCurrentDate(date)}
        defaultView="month"
        views={['month']}
        selectable
        dayPropGetter={dayPropGetter}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: '#7067f0',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '4px',
            padding: '4px',
          },
        })}
      />
    </div>
  );
}

export default Calendar;
