import EmployeeReport from "./EmployeeReport";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/Firebase";

const Employee = () => {
    document.body.style.overflow = "hidden";
    const navigate = useNavigate(); // Add useNavigate hook to access the navigation function



    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Redirect to login page on successful logout
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (

        <EmployeeReport />


    );
};

export default Employee;
