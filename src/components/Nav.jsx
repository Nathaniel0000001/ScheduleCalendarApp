import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import 'bootstrap/dist/css/bootstrap.css';

function Navbar() {
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false); // Close menu on route change
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
  try {
    await signOut(auth);
    setToastMessage('👋 Logged out successfully');
    setShowToast(true);
    navigate('/pages/Login');
  } catch (error) {
    console.error('Logout failed:', error.message);
  }
};

useEffect(() => {
  if (showToast) {
    const timer = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(timer);
  }
}, [showToast]);


  return (
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fw-bold py-2">
      <div className="container-fluid">
        {/* Brand and compact toggler */}
        <div className="d-flex align-items-center w-100 justify-content-between">
          <Link className="navbar-brand text-light  fw-bold fs-5 py-0" to="/pages/">Scheduler</Link>

          <button
            className="navbar-toggler p-1"
            style={{ fontSize: '0.8rem', width: '32px', height: '32px' }}
            type="button"
            onClick={toggleMobileMenu}
            aria-controls="navbarNav"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" style={{ transform: 'scale(0.8)' }}></span>
          </button>
        </div>

        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav w-100 d-flex align-items-center small">
            {!user && (
              <>
              <li className="nav-item">
                <Link to="/pages/" className="nav-link py-1">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/pages/Register" className="nav-link py-1">Register</Link>
              </li>
              </>
            )}

            {user && (
              <>
                <li className="nav-item">
                  <Link to="/pages/Calendar" className="nav-link py-1">Scheduler</Link>
                </li>
                <li className="nav-item">
                  <Link to="/pages/Schedules" className="nav-link py-1">ScheduleList</Link>
                </li>
              </>
            )}

            <li className="nav-item">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="nav-link btn btn-link text-decoration-none py-1"
                >
                  Logout
                </button>
              ) : (
                <Link to="/pages/Login" className="nav-link py-1">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
      {/* Toast Container */}
        <div
          className="toast-container position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 9999 }}
        >
          {showToast && (
            <div
              className="toast show align-items-center text-bg-success border-0"
              role="alert"
            >
              <div className="d-flex">
                <div className="toast-body">{toastMessage}</div>
                <button
                  type="button"
                  className="btn-close btn-close-white me-2 m-auto"
                  onClick={() => setShowToast(false)}
                ></button>
              </div>
            </div>
          )}
        </div>

    </nav>
    
    
  );
}

export default Navbar;
