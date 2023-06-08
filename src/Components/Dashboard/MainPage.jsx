import "bootstrap/dist/css/bootstrap.min.css";
import "./Main.css";
import React from "react";
import { Box, Image } from "@mantine/core";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const MainPage = () => {
    return (
        <div>
            <Helmet>
                <script
                    src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
                    integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3"
                    crossOrigin="anonymous"
                ></script>
                <script
                    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/js/bootstrap.min.js"
                    integrity="sha384-heAjqF+bCxXpCWLa6Zhcp4fu20XoNIA98ecBC1YkdXhszjoejr5y9Q77hIrv8R9i"
                    crossOrigin="anonymous"
                ></script>
                <script
                    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-qKXV1j0HvMUeCBQ+QVp7JcfGl760yU08IQ+GpUo5hlbpg51QRiuqHAJz8+BrxE/N"
                    crossOrigin="anonymous"
                ></script>
            </Helmet>
            <nav className="navbar navbar-expand-lg px-5">
                <div className="container-fluid">
                    <a className="navbar-brand text-white" href="#">
                        Logo
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link text-white" href="main.html">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">
                                    About Us
                                </a>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link text-white">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div id="hero">
                <div id="hero-slider" className="carousel slide">
                    <ol className="carousel-indicators">
                        <li
                            data-bs-target="#hero-slider"
                            data-bs-slide-to="0"
                            className="active"
                        ></li>
                        <li data-bs-target="#hero-slider" data-bs-slide-to="1"></li>
                        <li data-bs-target="#hero-slider" data-bs-slide-to="2"></li>
                    </ol>

                    <div className="carousel-inner">
                        <div
                            className="carousel-item active"
                            data-bs-interval="false"
                        >      <Image
                                radius="md"
                                src="https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
                                alt="Random unsplash image"
                                caption="My dog begging for treats"
                            />

                            <div className="carousel-caption d-none d-md-block">
                                <h2>Empower Your Employees with Our Career Pathing System</h2>
                                <p>
                                    Explore various career opportunities, and log in to embark on
                                    your journey toward a fulfilling career.
                                </p>
                                <button className="btn btn-primary startBtn">
                                    <Link to="/login" className="btn btn-primary startBtn">
                                        Get Started
                                    </Link>                                </button>
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="false">
                            <Image
                                radius="md"
                                src="https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
                                alt="Random unsplash image"
                                caption="My dog begging for treats"
                            />
                            <div className="carousel-caption d-none d-md-block">
                                <h2>Empower Your Employees with Our Career Pathing System</h2>
                                <p>
                                    Explore various career opportunities, and log in to embark on
                                    your journey toward a fulfilling career.
                                </p>
                                <button className="btn btn-primary">Get Started</button>
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="false">
                            <Image
                                radius="md"
                                src="https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
                                alt="Random unsplash image"
                                caption="My dog begging for treats"
                            />
                            <div className="carousel-caption d-none d-md-block">
                                <h2>Empower Your Employees with Our Career Pathing System</h2>
                                <p>
                                    Explore various career opportunities, and log in to embark on
                                    your journey toward a fulfilling career.
                                </p>
                                <button className="btn btn-primary">Get Started</button>
                            </div>
                        </div>
                    </div>

                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#hero-slider"
                        data-bs-slide="prev"
                    >
                        <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#hero-slider"
                        data-bs-slide="next"
                    >
                        <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <section id="cards">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="text-center pb-3 title">Our Features</h2>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <img
                                        src="images/customizable.png"
                                        alt="Small Image"
                                        className="float-start me-3 card-icon"
                                    />
                                    <h5 className="card-title">Customizable Career Paths</h5>
                                    <p className="card-text">
                                        Design personalized career paths for each employee based on
                                        their interest and goals
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <img
                                        src="images/check-list.png"
                                        alt="Small Image"
                                        className="float-start me-3 card-icon"
                                    />
                                    <h5 className="card-title">Skill Assessment</h5>
                                    <p className="card-text">
                                        Assess the skills of your employees and identify skill gaps
                                        to provide targeted training
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <img
                                        src="images/goal.png"
                                        alt="Small Image"
                                        className="float-start me-3 card-icon"
                                    />
                                    <h5 className="card-title">Goal Setting</h5>
                                    <p className="card-text">
                                        Set goals and track progress towards them to ensure employee
                                        development and retention
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="footer">
                <p>&copy; All rights reserved.</p>
            </div>
        </div>
    );
};

export default MainPage;
