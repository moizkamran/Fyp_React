import AdminDashboardContent from "../Admin/AdminDashboardCotent";
import { AppShell, Header, Navbar } from "@mantine/core";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { FaCog, FaHome, FaUser, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/Firebase";

const CustomNavbar = () => {
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

    const [showLogoutOptions, setShowLogoutOptions] = useState(false);

    return (
        <AppShell

            navbar={
                <Navbar
                    width={{ base: 200 }} // Adjust the base width as per your requirements
                    position="fixed"
                    left={0}
                    top={0}
                    style={{
                        height: "100vh",
                        overflowY: "auto",
                        backgroundColor: "#6265F2", // Set the desired color for the navbar
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
                                <FaHome size={24} color="white" />
                            </li>
                            <li style={{ marginBottom: 16 }}>
                                <Link to="/charts">
                                    <FaUser size={24} color="white" />
                                </Link>                            </li>
                            <li style={{ marginBottom: 16 }}>
                                <FaCog size={24} color="white" />
                            </li>
                            <li style={{ marginBottom: 16 }}>
                                <FaHome size={24} color="white" />
                            </li>
                            <li style={{ marginBottom: 16 }}>
                                <FaUser size={24} color="white" />
                            </li>
                            <li style={{ marginBottom: 16 }}>
                                <FaCog size={24} color="white" />
                            </li>
                        </ul>
                    </div>
                </Navbar>
            }
            header={
                <Header
                    height={60}
                    p="xs"
                    style={{
                        borderBottom: "1px solid #000", // Add a solid black line at the bottom of the header
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        paddingRight: 20,
                    }}
                >
                    <FaUserCircle
                        size={24}
                        color="black"
                        style={{ cursor: "pointer" }}
                        onClick={handleLogout}
                    />
                </Header>
            }
            styles={(theme) => ({
                main: {
                    backgroundColor:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                    marginLeft: 200,
                    marginTop: 60,
                    paddingTop: theme.spacing.md,
                    overflow: "auto",
                },
            })}
        >
            <AdminDashboardContent />

        </AppShell>
    );
};

export default CustomNavbar;
