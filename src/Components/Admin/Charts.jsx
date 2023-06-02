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
        <div>
            <AppShell
                navbar={
                    <Navbar
                        width={{ base: 100 }} // Adjust the base width as per your requirements
                        position="fixed"
                        left={0}
                        top={0}
                        style={{
                            height: "100vh",
                            overflowY: "auto",
                            backgroundColor: "rgb(34, 139, 230)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                color: "white",
                                fontSize: 24,
                                fontWeight: "bold",
                                marginTop: 20,
                                textAlign: "center",
                            }}
                        >
                            FYP
                        </div>
                        <div
                            style={{
                                flexGrow: 1,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            <ul
                                style={{
                                    listStyle: "none",
                                    padding: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <li style={{ marginBottom: 16 }}>

                                    <Link to="/dashboard">
                                        <IconHome2 size={24} color="white" />
                                    </Link>
                                </li>
                                <li style={{ marginBottom: 16 }}>
                                    <Link to="/charts">
                                        <IconGauge size={24} color="white" />
                                    </Link>                            </li>
                                <li style={{ marginBottom: 16 }}>
                                    <IconDeviceDesktopAnalytics size={24} color="white" />
                                </li>
                                <li style={{ marginBottom: 16 }}>
                                    <IconFingerprint size={24} color="white" />
                                </li>
                                <li style={{ marginBottom: 16 }}>
                                    <IconUser size={24} color="white" />
                                </li>
                                <li

                                    style={{ marginBottom: 16 }}>
                                    <IconLogout
                                        onClick={handleLogout}
                                        size={24} color="white" />
                                </li>
                            </ul>
                        </div>
                    </Navbar>
                }

                styles={(theme) => ({
                    main: {

                        marginTop: "20px",
                        paddingTop: theme.spacing.md,
                        overflow: "auto",
                        backgroundColor: "white",

                    },
                })}
            >
                <LineChartComponent />

            </AppShell>
        </div>
    )
}

export default Charts
