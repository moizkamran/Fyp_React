import LineChartComponent from "../Charts/LineChartComponent";
import React from "react";
import { AppShell, Header, Navbar } from "@mantine/core";
import { signOut } from "firebase/auth";
import { Link, Navigate } from "react-router-dom";
import { auth } from "../../Firebase/Firebase";

import {
    IconHome2,
    IconGauge,
    IconDeviceDesktopAnalytics,
    IconFingerprint,
    IconUser,
    IconLogout,
} from '@tabler/icons-react';
const Charts = () => {
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Redirect to login page on successful logout
                Navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (

        <LineChartComponent />


    )
}

export default Charts
