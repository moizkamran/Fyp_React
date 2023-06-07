import React, { useEffect, useState } from "react";
import { Button, Center, Flex, Paper, Text, TextInput, Textarea, Title } from "@mantine/core";
import { AppShell, Navbar } from "@mantine/core";
import { signOut } from "firebase/auth";
import { getDatabase, ref as databaseRef, set, get } from "firebase/database";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth, storage } from "../../Firebase/Firebase";

import {
    IconHome2,
    IconGauge,
    IconDeviceDesktopAnalytics,
    IconFingerprint,
    IconUser,
    IconLogout,
} from '@tabler/icons-react';
const EmployeeProfileSetting = () => {
    const [image, setImage] = useState(null);
    const [resume, setResume] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [resumeUrl, setResumeUrl] = useState(null);
    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [facebookLink, setFacebookLink] = useState('');
    const [linkedinLink, setLinkedinLink] = useState('');
    const navigate = useNavigate(); // Add useNavigate hook to access the navigation function

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


    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleResumeChange = (e) => {
        if (e.target.files[0]) {
            setResume(e.target.files[0]);
        }
    };

    const handleImageUpload = () => {
        const imageRef = ref(storage, "profileImage/" + image.name);
        uploadBytes(imageRef, image)
            .then(() => {
                getDownloadURL(imageRef)
                    .then((url) => {
                        setImageUrl(url);
                    })
                    .catch((error) => {
                        console.log("Error getting the image URL:", error.message);
                    });
                setImage(null);
            })
            .catch((error) => {
                console.log("Error uploading the image:", error.message);
            });
    };

    const handleResumeUpload = () => {
        const resumeRef = ref(storage, "ProfileResume/" + resume.name);
        uploadBytes(resumeRef, resume)
            .then(() => {
                getDownloadURL(resumeRef)
                    .then((url) => {
                        setResumeUrl(url);
                    })
                    .catch((error) => {
                        console.log("Error getting the resume URL:", error.message);
                    });
                setResume(null);
            })
            .catch((error) => {
                console.log("Error uploading the resume:", error.message);
            });
    };
    useEffect(() => {
        // Retrieve user information from local storage
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (user) {
            const database = getDatabase();
            const userRef = databaseRef(database, `Employees/Profile/${user.uid}`);
            get(userRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        setName(data.name || '');
                        setBirthdate(data.birthdate || '');
                        setEmail(data.email || '');
                        setPhone(data.phone || '');
                        setAddress(data.address || '');
                        setFacebookLink(data.facebookLink || '');
                        setLinkedinLink(data.linkedinLink || '');
                        setImageUrl(data.imageUrl || '');
                    }
                })
                .catch((error) => {
                    console.log("Error fetching data:", error);
                });
        }
    }, []);

    const handleFormSubmit = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (user) {
            const database = getDatabase();
            const userRef = databaseRef(database, `Employees/Profile/${user.uid}`);
            const userData = {
                name: name,
                birthdate: birthdate,
                email: email,
                phone: phone,
                address: address,
                facebookLink: facebookLink,
                linkedinLink: linkedinLink,
                imageUrl: imageUrl,
            };
            set(userRef, userData)
                .then(() => {
                    console.log("Data updated successfully");
                    console.log(userData);
                })
                .catch((error) => {
                    console.log("Error updating data:", error);
                });
        }
    };

    return (
        <AppShell
            navbar={
                <Navbar
                    width={{ base: 180 }} // Adjust the base width as per your requirements
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
                        <Link to="/employee/dashboard">
                            <IconHome2 size={30} color="white" />
                        </Link>
                        <Link to="/employee/profile">
                            <IconUser size={30} color="white" />
                        </Link>
                        <Link to="/employee/analytics">
                            <IconDeviceDesktopAnalytics size={30} color="white" />
                        </Link>
                        <Link to="/employee/settings">
                            <IconGauge size={30} color="white" />
                        </Link>
                        <Link to="/employee/security">
                            <IconFingerprint size={30} color="white" />
                        </Link>
                        <Button
                            variant="outline"
                            color="white"
                            style={{ marginTop: 20 }}
                            leftIcon={<IconLogout size={20} />}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                </Navbar>
            }
        >
            <div style={{ marginLeft: 200, marginTop: 20 }}>
                <Title order={1}>Profile Settings</Title>
                <Paper padding="lg" style={{ marginTop: 20 }}>
                    <Flex direction="column" gap="md">
                        <Text>Profile Picture</Text>
                        <input type="file" onChange={handleImageChange} />
                        <Button onClick={handleImageUpload}>Upload</Button>
                        {imageUrl && (
                            <img src={imageUrl} alt="Profile" style={{ width: 200 }} />
                        )}
                    </Flex>
                </Paper>
                <Paper padding="lg" style={{ marginTop: 20 }}>
                    <Flex direction="column" gap="md">
                        <Text>Resume</Text>
                        <input type="file" onChange={handleResumeChange} />
                        <Button onClick={handleResumeUpload}>Upload</Button>
                        {resumeUrl && (
                            <a href={resumeUrl} target="_blank" rel="noreferrer">
                                Download Resume
                            </a>
                        )}
                    </Flex>
                </Paper>
                <Paper padding="lg" style={{ marginTop: 20 }}>
                    <Flex direction="column" gap="md">
                        <Text>Name</Text>
                        <TextInput value={name} onChange={(e) => setName(e.target.value)} />
                        <Text>Birthdate</Text>
                        <TextInput
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                        />
                        <Text>Email</Text>
                        <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Text>Phone</Text>
                        <TextInput value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <Text>Address</Text>
                        <Textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <Text>Facebook Link</Text>
                        <TextInput
                            value={facebookLink}
                            onChange={(e) => setFacebookLink(e.target.value)}
                        />
                        <Text>LinkedIn Link</Text>
                        <TextInput
                            value={linkedinLink}
                            onChange={(e) => setLinkedinLink(e.target.value)}
                        />
                        <Button onClick={handleFormSubmit}>Save</Button>
                    </Flex>
                </Paper>
            </div>
        </AppShell>
    );

    return (
        <AppShell
            navbar={
                <Navbar
                    width={{ base: 180 }} // Adjust the base width as per your requirements
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
                                <IconHome2 size={24} color="white" />
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
            <Center>
                <Paper shadow="sm" padding="lg" radius="md" w={800}>
                    <div style={{ marginBottom: "20px" }}>
                        <Title order={1}>Employee Profile</Title>
                        <Center>
                            <div style={{ marginBottom: "20px" }}>
                                <img
                                    src={imageUrl}
                                    alt="Profile Picture"
                                    style={{ display: "block", width: "200px", height: "200px", marginBottom: "10px", borderRadius: "50%" }}
                                />
                                <input type="file" id="image-file" accept="image/*" onChange={handleImageChange} />
                            </div>
                        </Center>

                        <>
                            <Title order={2}>Personal Information</Title>
                            <form>
                                <label htmlFor="name">Name:</label>

                                <TextInput
                                    w={"50%"}
                                    id="name"
                                    size="md"
                                    radius="md"
                                    style={{ marginBottom: "10px" }}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label htmlFor="birthdate">BirthDate:</label>
                                <TextInput
                                    w={"50%"}
                                    id="birthdate"
                                    size="md"
                                    radius="md"
                                    style={{ marginBottom: "10px" }}
                                    value={birthdate}
                                    onChange={(e) => setBirthdate(e.target.value)}
                                />
                                <label htmlFor="email">Email:</label>
                                <TextInput
                                    w={"50%"}
                                    id="email"
                                    type="email"
                                    size="md"
                                    radius="md"
                                    style={{ marginBottom: "10px" }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label htmlFor="phone">Phone:</label>
                                <TextInput
                                    w={"50%"}
                                    id="phone"
                                    type="tel"
                                    required
                                    size="md"
                                    radius="md"
                                    style={{ marginBottom: "10px" }}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <label htmlFor="address">Address:</label>
                                <Textarea
                                    w={"50%"}
                                    id="address"
                                    size="md"
                                    radius="md"
                                    style={{ marginBottom: "10px" }}
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />

                                {/* Facebook */}
                                <FaFacebook size={20} style={{ marginLeft: "10px" }} />
                                <TextInput
                                    w={"50%"}
                                    id="facebook"
                                    type="text"
                                    size="md"
                                    radius="md"
                                    style={{ marginLeft: "5px" }}
                                    value={facebookLink}
                                    onChange={(e) => setFacebookLink(e.target.value)}
                                />

                                {/* LinkedIn */}
                                <FaLinkedin size={20} style={{ marginLeft: "10px" }} />
                                <TextInput
                                    w={"50%"}
                                    id="linkedin"
                                    type="text"
                                    size="md"
                                    radius="md"
                                    style={{ marginLeft: "5px" }}
                                    value={linkedinLink}
                                    onChange={(e) => setLinkedinLink(e.target.value)}
                                />
                            </form>
                        </>
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                        <Title order={2}>Job History</Title>
                        <table>
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Promotion</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2022</td>
                                    <td>Senior Developer</td>
                                </tr>
                                <tr>
                                    <td>2018</td>
                                    <td>Developer</td>
                                </tr>
                                <tr>
                                    <td>2016</td>
                                    <td>Intern</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                        <Title order={2}>Resume</Title>
                        <Text size="sm" style={{ marginBottom: "10px" }}>
                            You have not uploaded your resume yet.
                        </Text>
                        <form>
                            <label htmlFor="resume-file">Upload Resume:</label>
                            <input type="file" name="resume-file" style={{ marginBottom: "10px" }} onChange={handleResumeChange} />
                        </form>
                    </div>
                    <Button onClick={handleUpload} radius="md">
                        Save Changes
                    </Button>
                </Paper>
            </Center>
        </AppShell>
    );
};

export default EmployeeProfileSetting;
