import React, { useEffect, useState } from "react";
import { Button, Col, Grid, Paper, TextInput, Title } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signIn } = UserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try {
            await signIn(email, password)
            navigate('/dashboard')
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    };

    return (
        <div style={{ height: "100vh", display: "flex" }}>
            <Grid gutter="xl" style={{ flex: 1 }}>
                <Col span={6} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Paper
                        shadow="md" padding="xl" width="500px">
                        <Title order={2} style={{ marginBottom: "20px", textAlign: "center" }}>
                            Login In
                        </Title>
                        <form onSubmit={handleSubmit}>
                            <TextInput
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"
                                required
                                size="xl"
                                style={{ marginBottom: "20px", borderRadius: "8px" }}
                            />
                            <TextInput
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} type="password"
                                placeholder="Enter your password"
                                required
                                size="xl"
                                style={{ marginBottom: "20px", borderRadius: "8px" }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                size="xl"
                                style={{ marginBottom: "20px", borderRadius: "8px" }}
                            >
                                Login
                            </Button>
                        </form>


                    </Paper>
                </Col>
                <Col span={6} style={{ height: "100%", width: "50%", backgroundSize: "cover", backgroundPosition: "center", backgroundImage: "url(https://images.unsplash.com/photo-1499063078284-f78f7d89616a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80)" }} />
            </Grid>
        </div>
    );
}