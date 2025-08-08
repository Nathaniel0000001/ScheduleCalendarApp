import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function Footer() {
  return (
    <footer className="bg-dark text-light py-5 mt-auto">
      <div className="container">
        <div className="row text-center text-md-start">
          
          {/* Contact Info */}
          <div className="col-md-4 mb-4 justify-content-center text-center">
            <h5 className="fw-bold mb-3">Contact Us</h5>
            <p className="mb-1">Email: support@schedulerapp.com</p>
            <p className="mb-1">Phone: +63 900 123 4567</p>
            <p className="mb-0">Address: 123 Scheduler St., Quezon City, PH</p>
          </div>

          {/* Company Info */}
          <div className="col-md-4 mb-4 text-center">
            <h5 className="fw-bold mb-3">About Scheduler</h5>
            <p className="mb-1">Scheduler is a modern web-based solution to manage your appointments and meetings with ease.</p>
            <p className="mb-0">Built with passion and precision for your productivity.</p>
          </div>

          {/* Support Info */}
          <div className="col-md-4 mb-4 text-center">
            <h5 className="fw-bold mb-3">Support Hours</h5>
            <p className="mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="mb-1">Saturday: 10:00 AM - 4:00 PM</p>
            <p className="mb-0 text-muted fst-italic">Closed on Sundays & Holidays</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-light" />

        {/* Footer Bottom */}
        <div className="text-center small text-secondary">
          &copy; {new Date().getFullYear()} Scheduler Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
