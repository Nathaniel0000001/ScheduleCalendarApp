// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import MainCalendar from './pages/MainCalendar';
import 'bootstrap/dist/css/bootstrap.min.css';

import Schedules from './pages/Schedules';
import Navbar from './components/Nav';
import './App.css';
import Login from './pages/Login';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <Router>
    <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <Routes>
            <Route path="/pages/" element={<Home />} />
            <Route path="/pages/Calendar" element={<MainCalendar />} />
            <Route path="/pages/Schedules" element={<Schedules />} />
            <Route path="/pages/Register" element={<Register />} />
            <Route path="/pages/Login" element={<Login />} />
            <Route path="/pages/ForgotPassword" element={<ForgotPassword />} />
          </Routes>
          <Footer />
      
   
    </div>
    </Router>
  );
}

export default App;
