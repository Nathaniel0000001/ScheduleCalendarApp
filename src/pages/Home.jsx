import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";
import Carousel1 from '../assets/carousel1.jpg';
import Carousel2 from '../assets/carousel2.jpg';
import Carousel3 from '../assets/carousel3.jpg';
import './Home.css';


function Home() {
  return (
    <div className="bg-dark text-light min-vh-100 d-flex flex-column">

      {/* Hero Section */}
      <section className="text-center py-5 bg-black">
        <div className="container">
          <h1 className="display-4 fw-bold text-light">Welcome to Scheduler</h1>
          <p className="lead text-secondary">
            Your simple and reliable tool to add events to your calendar effortlessly.
          </p>
          <Link to="/pages/login" className="btn btn-outline-light btn-lg mt-3">
            Start Scheduling
          </Link>
        </div>
      </section>

      <section className="home-section-bg2 py-5">
      <div className="container">

        <div id="featureCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner rounded shadow overflow-hidden">

            <div className="carousel-item active">
              <img
                src={Carousel1}
                className="d-block w-100 carousel-image"
                alt="Create Events"
              />
              <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100">
                <h3 className="text-white fw-bold display-5">Create Events</h3>
                <p className="text-light fs-5">Add tasks and appointments with ease.</p>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src={Carousel2}
                className="d-block w-100 carousel-image"
                alt="Calendar View"
              />
                <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100">
                <h3 className="text-white fw-bold display-5">Calendar View </h3>
                <p className="text-light fs-5">Visualize your entire schedule.</p>
                </div>
            </div>

            <div className="carousel-item">
              <img
                src={Carousel3}
                className="d-block w-100 carousel-image"
                alt="Dark Mode UI"
              />
               <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100">
                <h3 className="text-white fw-bold display-5">Dark Mode UI </h3>
                <p className="text-light fs-5">Comfortable on your eyes, day or night.</p>
                </div>
            </div>

          </div>

          {/* Controls */}
          <button className="carousel-control-prev" type="button" data-bs-target="#featureCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon bg-dark rounded-circle" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button className="carousel-control-next" type="button" data-bs-target="#featureCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon bg-dark rounded-circle" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>


      {/* Feature Section */}
      <section className="py-5 bg-black text-light">
        <div className="container">
          <div className="row align-items-center text-center text-md-start">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src="https://static-cse.canva.com/blob/564803/createeffectiveschedulefeaturedimage1.jpg"
                alt="Calendar feature"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">Add Events Easily</h2>
              <p className="text-light fs-5">
                Add tasks, meetings, and reminders to your calendar in just a few clicks.
                Stay organized without the clutter of complicated tools.
              </p>
              <p className="text-secondary">
                Scheduler is all about keeping things simple — log in, add your event, and you’re done.
              </p>
            </div>
          </div>
        </div>
      </section>

    
    </div>
  );
}

export default Home;
