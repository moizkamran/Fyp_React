import React, { useEffect, useState } from "react";
import { Avatar, Chip, Container, Divider, Flex, Paper, ScrollArea, Text, Title } from "@mantine/core";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { getDatabase, ref as databaseRef, set, get } from "firebase/database";
import { database, storage } from "../../Firebase/Firebase";

const EmployeeProfile = () => {

    //initialize states
    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [facebookLink, setFacebookLink] = useState('');
    const [linkedinLink, setLinkedinLink] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [imageUrl, setImageUrl] = useState('');

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
                        setGithubLink(data.githubLink || '');
                        setImageUrl(data.imageUrl || '');
                    }
                })
                .catch((error) => {
                    console.log("Error fetching data:", error);
                });
        }
    }, []);

    return (
        <>
            <Title>Employee</Title>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",

                }}
            >
                <Flex direction={"column"} gap={100}>
                    <Paper shadow="sm" h={250} padding="lg" w={800} radius="md" background="white">
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
                            <Text
                                mt={10}
                                size="xl"
                                weight={700}
                                style={{ textAlign: "center", fontFamily: "Arial, sans-serif", marginBottom: "10px" }}
                            >{name}
                            </Text>
                            <Flex p={10} align="center" gap="md">

                                <Avatar
                                    sx={{ width: 150, height: 150 }}
                                    src={imageUrl}
                                />
                                <Flex direction="column" gap={2}>


                                    <Flex align="center" gap="sm">
                                        <Text size="lg" color="gray" weight={500}>
                                            Email:
                                        </Text>
                                        <Text size="lg" weight={500}>
                                            {email}
                                        </Text>
                                    </Flex>
                                    <Flex align="center" gap="sm">
                                        <Text size="lg" color="gray" weight={500}>
                                            Phone:
                                        </Text>
                                        <Text size="lg" weight={500}>
                                            {phone}
                                        </Text>
                                    </Flex>

                                    <Flex align="center" gap="sm">
                                        <Text size="lg" color="gray" weight={500}>
                                            Social Media:
                                        </Text>
                                        <a href={linkedinLink} style={{ color: "#0E76A8" }}>
                                            <FaLinkedin />
                                        </a>
                                        <a href={githubLink} style={{ color: "#211F1F" }}>
                                            <FaGithub />
                                        </a>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </div>
                    </Paper>

                    <Paper shadow="sm" h={500} padding="lg" w={800} radius="md">
                        <Container style={{ marginBottom: "20px" }}>
                            <Title style={{ marginBottom: "10px", fontFamily: "Arial, sans-serif", fontSize: "24px" }}>
                                Personal Information
                            </Title>
                            <Flex gap="md">
                                <Flex direction="column">
                                    <Text color="blue" style={{ fontFamily: "Arial, sans-serif", fontSize: "16px" }}>
                                        Hire Date
                                    </Text>
                                    <Chip
                                    checked={false}
                                        color="light-blue"
                                        style={{ borderRadius: "4px", marginTop: "5px", display: "flex", alignItems: "center", justifyContent: "center" }}
                                    >
                                        <Text>20 May 2023</Text>
                                    </Chip>
                                </Flex>
                                <Flex direction="column">
                                    <Text color="blue" style={{ fontFamily: "Arial, sans-serif", fontSize: "16px" }}>
                                        Worked For
                                    </Text>
                                    <Chip
                                    checked={false}
                                        color="light-blue"
                                        style={{ borderRadius: "4px", marginTop: "5px", display: "flex", alignItems: "center", justifyContent: "center" }}
                                    >
                                        <Text>1 Year</Text>
                                    </Chip>
                                </Flex>
                                <Flex direction="column">
                                    <Text color="blue" style={{ fontFamily: "Arial, sans-serif", fontSize: "16px" }}>
                                        Employee ID
                                    </Text>
                                    <Chip
                                    checked={false}
                                        color="light-blue"
                                        style={{ borderRadius: "4px", marginTop: "5px", display: "flex", alignItems: "center", justifyContent: "center" }}
                                    >
                                        <Text>1234</Text>
                                    </Chip>
                                </Flex>
                            </Flex>
                            <Divider />
                        </Container>

                        <Container style={{ marginBottom: "20px" }}>
                            <Title style={{ marginBottom: "10px", fontFamily: "Arial, sans-serif", fontSize: "24px" }}>
                                Personal Information
                            </Title>
                            <Flex gap="md">
                                <Flex direction="column">
                                    <Text color="blue" style={{ fontFamily: "Arial, sans-serif", fontSize: "16px" }}>
                                        Birth Date
                                    </Text>
                                    <Chip
                                    checked={false}
                                        color="light-blue"
                                        style={{ borderRadius: "4px", marginTop: "5px", display: "flex", alignItems: "center", justifyContent: "center" }}
                                    >
                                        {birthdate}
                                    </Chip>
                                </Flex>
                                <Flex direction="column">
                                    <Text color="blue" style={{ fontFamily: "Arial, sans-serif", fontSize: "16px" }}>
                                        Address
                                    </Text>
                                    <Flex gap="sm">
                                        <Chip
                                        checked={false}
                                            color="light-blue"
                                            style={{ borderRadius: "4px", marginTop: "5px", display: "flex", alignItems: "center", justifyContent: "center" }}
                                        >
                                            {address}
                                        </Chip>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Divider />
                        </Container>

                        <Container>
                            <Title style={{ marginBottom: "10px", fontFamily: "Arial, sans-serif", fontSize: "24px" }}>
                                Occupied Information
                            </Title>
                            <Flex gap="md">
                                <Flex style={{ alignItems: "center" }}>
                                    <Avatar
                                        size="lg"
                                        radius="xl" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                                    />
                                    <Text style={{ fontFamily: "Arial, sans-serif", fontSize: "16px", marginLeft: "10px" }}>Full Time</Text>
                                </Flex>
                                <Flex style={{ alignItems: "center" }}>
                                    <Avatar
                                        size="lg"
                                        radius="xl" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                                    />
                                    <Text style={{ fontFamily: "Arial, sans-serif", fontSize: "16px", marginLeft: "10px" }}>Engineer</Text>
                                </Flex>
                            </Flex>
                            <Divider />
                        </Container>
                    </Paper>

                </Flex>
            </div >
        </>
    );
};

export default EmployeeProfile;
