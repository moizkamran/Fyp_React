import EmpNavbar from "../Navbar/EmpNavbar";
import React, { useEffect, useState } from "react";
import { Avatar, Chip, Container, Divider, Flex, Paper, ScrollArea, Text, Title } from "@mantine/core";
import { get, getDatabase, ref as databaseRef, set } from "firebase/database";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { database, storage } from "../../Firebase/Firebase";

const EmployeeProfile = () => {

    //initialize states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [imageUrl, setImageUrl] = useState('');
    const [jobHistory, setJobHistory] = useState([]);
    const [resumeUrl, setResumeUrl] = useState(null);

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
                        setEmail(data.email || '');
                        setPhone(data.phone || '');
                        setAddress(data.address || '');

                        setImageUrl(data.imageUrl || ''); setJobHistory(data.jobHistory || []);

                        setResumeUrl(data.resumeUrl || '');

                    }
                })
                .catch((error) => {
                    console.log("Error fetching data:", error);
                });
        }
    }, []);

    return (
        <>
            <EmpNavbar />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Flex direction={"column"} gap={100}>
                    <Paper shadow="sm" h={250} padding="lg" w={800} radius="md" background="white" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>

                            <Flex

                                p={30} align="center" gap="md">

                                <Avatar
                                    mr={
                                        50
                                    }
                                    radius={40}
                                    sx={{ width: 200, height: 200 }}
                                    src={imageUrl}
                                />
                                <Flex direction="column" gap={2}>


                                    <Flex

                                        align="center" gap={12}>
                                        <Text size="xl" color="gray" weight={500}>
                                            Email:
                                        </Text>
                                        <Text size="xl" weight={500}>
                                            {name}
                                        </Text>
                                    </Flex>
                                    <Flex align="center" gap="sm">
                                        <Text size="xl" color="gray" weight={500}>
                                            Phone:
                                        </Text>
                                        <Text size="xl" weight={500}>
                                            {phone}
                                        </Text>
                                    </Flex>
                                    <Flex align="center" gap="sm">
                                        <Text size="xl" color="gray" weight={500}>
                                            Address:
                                        </Text>
                                        <Text size="xl" weight={500}>
                                            {address}
                                        </Text>
                                    </Flex>

                                </Flex>
                            </Flex>
                        </div>
                    </Paper>

                    <Paper shadow="sm" h={500} padding="lg" w={800} radius="md">
                        <h2 style={{ marginBottom: "20px" }}>Job History</h2>
                        <table style={{ width: "100%" }}>
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Promotion</th>                                    <th>Description</th>

                                </tr>
                            </thead>
                            <tbody>
                                {jobHistory.map((job, index) => (
                                    <tr key={index}>
                                        <td>{job.year}</td>
                                        <td>{job.promotion}</td>                                        <td>{job.Description}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Paper>





                </Flex>
            </div >
        </>
    );
};

export default EmployeeProfile;