import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import EventForm from '../components/EventForm';
import Calendar from '../components/Calendar';

export default function MainCalendar() {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {

        setUserEmail(currentUser.email.split('@')[0]);
      } else {
        setUserEmail("");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="container mt-4 mb-5">
        <h1 className="mb-4 justify-content-center d-flex">
          {userEmail ? `${userEmail}'s Event Calendar` : "Calendar"}
        </h1>

        <div className="row mb-4">
          <div className="col-12 col-lg-4 mb-5 mb-lg-0">
            <EventForm />
          </div>
          <div className="col-12 col-lg-8 mb-5">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
}
