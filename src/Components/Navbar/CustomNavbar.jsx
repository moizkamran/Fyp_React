
import { AppShell, Button, Header, Navbar, ScrollArea, Text } from "@mantine/core";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { Link, NavLink, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../../Context/AuthContext";
import { auth } from "../../Firebase/Firebase";

import {
    IconHome2,
    IconGauge,
    IconDeviceDesktopAnalytics,
    IconFingerprint,
    IconUser,
    IconLogout,
} from '@tabler/icons-react';
const CustomNavbar = () => {
    const navigate = useNavigate(); // Add useNavigate hook to access the navigation function

    const { logout } = UserAuth(); // Add logout function from the AuthContext

    const handleLogout = () => {
        logout();
        signOut(auth)
            .then(() => {
                // Redirect to login page on successful logout
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // get user form localstoage
    const user = JSON.parse(localStorage.getItem('user'));


    const location = useLocation();

    // remove the / from the pathname
    const path = location.pathname.slice(1);
    // space words
    const pathName = path.replace(/([A-Z])/g, " $1").trim();
    //remove the word admin
    const pathName2 = pathName.replace("Admin", "");




    return (
        <>
        <header>
                <nav className="navbar navbar-expand-lg px-5">
                    <div className="container-fluid d-flex justify-content-center">
                        <a className="navbar-brand text-white" href="#">
                            {pathName2}
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
                        <div
                            className="collapse navbar-collapse justify-content-center"
                            id="navbarNav"
                        >
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Text component={NavLink} to="/AdminUser"
                                    className="nav-link text-white">User Management</Text>
                                </li>
                                <li className="nav-item">
                                <Text component={NavLink} to="/AdminPerformance"
                                    className="nav-link text-white">Performance Management</Text>
                                </li>
                                <li className="nav-item">
                                <Text component={NavLink} to="/AdminCareerPath"
                                    className="nav-link text-white">Carrer Pathing</Text>
                                </li>
                                <li className="nav-item">
                                <Text component={NavLink} to="/AdminReport"
                                    className="nav-link text-white">Reporting</Text>
                                </li>
                                <li className="nav-item">
                                    <Button rightIcon={<IconLogout/>} onClick={handleLogout} color="dark">
                                        Logout
                                    </Button>
                                </li>
                            </ul>
                        </div>
                        <div className="user ms-auto">
                            <p>
                                Welcome, <span className="username">{user.email}</span>
                            </p>
                        </div>
                    </div>
                </nav>
            </header>
                <Outlet />
            </>
    );
};

export default CustomNavbar;
