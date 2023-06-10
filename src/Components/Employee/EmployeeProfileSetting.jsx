import "./EmployeeReport.css";
import React, { useEffect, useState } from "react";
import { Button, Center, Flex, Paper, Text, TextInput, Textarea, Title } from "@mantine/core";
import { signOut } from "firebase/auth";
import { get, getDatabase, ref as databaseRef, set } from "firebase/database";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth, storage } from "../../Firebase/Firebase";

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
        if (image) {
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
        }
    };
    const [jobHistory, setJobHistory] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editedYear, setEditedYear] = useState("");
    const [editedPromotion, setEditedPromotion] = useState("");
    const [editedDescription, seteditedDescription] = useState("");

    const handleAdd = () => {
        const newJob = {
            year: editedYear,
            promotion: editedPromotion,
            Description: editedDescription
        };

        setJobHistory([...jobHistory, newJob]);
        setEditedYear("");
        setEditedPromotion(""); seteditedDescription("")
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditedYear(jobHistory[index].year);
        setEditedPromotion(jobHistory[index].promotion); seteditedDescription(jobHistory[index].Description);

    };

    const handleSave = (index) => {
        const updatedJobHistory = [...jobHistory];
        updatedJobHistory[index].year = editedYear;
        updatedJobHistory[index].promotion = editedPromotion; updatedJobHistory[index].Description = editedDescription;

        setJobHistory(updatedJobHistory);
        setEditingIndex(-1);
    };

    const handleDelete = (index) => {
        const updatedJobHistory = [...jobHistory];
        updatedJobHistory.splice(index, 1);
        setJobHistory(updatedJobHistory);

        // Update the jobHistory in the database
        const user = JSON.parse(localStorage.getItem('user'));
        const database = getDatabase();
        const userRef = databaseRef(database, `Employees/Profile/${user.uid}/jobHistory`);
        set(userRef, updatedJobHistory)
            .then(() => {
                console.log("Job history deleted and updated in the database");
            })
            .catch((error) => {
                console.log("Error updating job history in the database:", error);
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
                        setJobHistory(data.jobHistory || []);
                        setResumeUrl(data.resumeUrl || '');
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
                jobHistory: jobHistory,
                resumeUrl: resumeUrl,
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


                                <div>
                                    <h1>Job History</h1>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Year</th>
                                                <th>Promotion</th>
                                                <th>Description</th>                                                <th>Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {jobHistory.map((job, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        {editingIndex === index ? (
                                                            <input
                                                                type="text"
                                                                value={editedYear}
                                                                onChange={(e) => setEditedYear(e.target.value)}
                                                            />
                                                        ) : (
                                                            job.year
                                                        )}
                                                    </td>
                                                    <td>
                                                        {editingIndex === index ? (
                                                            <input
                                                                type="text"
                                                                value={editedPromotion}
                                                                onChange={(e) => setEditedPromotion(e.target.value)}
                                                            />
                                                        ) : (
                                                            job.promotion
                                                        )}
                                                    </td>  <td>
                                                        {editingIndex === index ? (
                                                            <input
                                                                type="text"
                                                                value={editedDescription}
                                                                onChange={(e) => seteditedDescription(e.target.value)}
                                                            />
                                                        ) : (
                                                            job.Description
                                                        )}
                                                    </td>
                                                    <td>
                                                        {editingIndex === index ? (
                                                            <>
                                                                <button onClick={() => handleSave(index)}>Save</button>
                                                                <button onClick={() => setEditingIndex(-1)}>Cancel</button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <button onClick={() => handleEdit(index)}>Edit</button>
                                                                <button onClick={() => handleDelete(index)}>Delete</button>
                                                            </>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div>
                                        <input
                                            type="text"
                                            value={editedYear}
                                            onChange={(e) => setEditedYear(e.target.value)}
                                            placeholder="Year"
                                        />
                                        <input
                                            type="text"
                                            value={editedPromotion}
                                            onChange={(e) => setEditedPromotion(e.target.value)}
                                            placeholder="Promotion"
                                        /><input
                                            type="text"
                                            value={editedDescription}
                                            onChange={(e) => seteditedDescription(e.target.value)}
                                            placeholder="Description"
                                        />
                                        <button onClick={handleAdd}>Add</button>
                                    </div>
                                </div> <button
                                    style={{ marginBottom: "10px", marginTop: "10px" }}
                                    onClick={handleFormSubmit}>Save Changes</button>
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
                                <>

                                    <a
                                        style={{ marginLeft: "10px" }}
                                        href={resumeUrl} target="_blank" rel="noreferrer">
                                        <Button >
                                            Download Resume

                                        </Button>

                                    </a>

                                </>
                            )}
                        </form>
                    </div>
                </div>
            </main>




        </div>
    );


};

export default EmployeeProfileSetting;
