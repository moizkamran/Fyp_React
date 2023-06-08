import "./EmployeeReport.css";
import React, { useEffect, useState } from "react";
import { Button, Center, Flex, Paper, Text, TextInput, Textarea, Title } from "@mantine/core";
import { signOut } from "firebase/auth";
import { get, getDatabase, ref as databaseRef, set } from "firebase/database";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth, storage } from "../../Firebase/Firebase";

const EmployeeReport = () => {
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
            const userRef = databaseRef(database, `Employees/report/${user.uid}`);
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
            const userRef = databaseRef(database, `Employees/report/${user.uid}`);
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

        <div style={{
            marginLeft: 200,


            marginTop: 20
        }}>
            <main>
                <div className="container">
                    <div className="profile-container">
                        <div className="personal-info">
                            <h1 className="text-center">Employee Profile</h1>
                            <Center>
                                {imageUrl && (
                                    <img src={imageUrl} alt="Profile" style={{ width: 200, borderRadius: "20px" }} />
                                )}</Center>
                            <Center mt={20}>
                                <Flex>

                                </Flex>
                                <br />
                                <Flex direction={"column"}>
                                    <input type="file" onChange={handleImageChange} />

                                    <Button onClick={handleImageUpload}>Upload</Button>
                                </Flex>
                            </Center>
                            <div className="details">
                                <h2>Personal Information</h2>



                                <label htmlFor="email">Email:</label>
                                <TextInput value={name} onChange={(e) => setName(e.target.value)} />

                                <label htmlFor="phone">Phone:</label>
                                <TextInput value={phone} onChange={(e) => setPhone(e.target.value)} />

                                <label htmlFor="address">Address:</label>
                                <Textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />

                                <button onClick={handleFormSubmit}>Save Changes</button>

                            </div>
                        </div>

                    </div>
                    <div className="resume">
                        <h2>Resume</h2>
                        <p>You have not uploaded your resume yet.</p>
                        <form>
                            <label htmlFor="resume-file">Upload Resume:</label>
                            <input type="file" onChange={handleResumeChange} />
                            <Button onClick={handleResumeUpload}>Upload</Button>
                            {resumeUrl && (
                                <a href={resumeUrl} target="_blank" rel="noreferrer">
                                    Download Resume
                                </a>
                            )}
                        </form>
                    </div>
                </div>
            </main>




        </div>
    );

    return (

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

    );
};

export default EmployeeReport;
