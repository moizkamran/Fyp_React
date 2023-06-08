import "./Login.css";
import React, { useState } from "react";
import { Button, Center, Flex, Text, TextInput } from "@mantine/core";
import { Icon2fa, IconKey } from "@tabler/icons-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { signIn } = UserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signIn(username, password, role);
            navigate("/AdminUser");
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        }
    };

    return (
        <Center mt={100}>
            <div className="login-card">
                <div className="login-header">
                    <h3 className="text-center">Logo</h3>
                    <h4 className="p-3 text-center">
                        Secure Employee Career Pathing System using AES
                    </h4>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter password"
                        />
                        <Flex mt={15}><IconKey /><Text c="blue" component={NavLink} to="/ForgotPassword">Forgot Password</Text></Flex>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="role">Role:</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            style={{ marginBottom: "20px", borderRadius: "8px" }}
                        >
                            <option value="">Select a role</option>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>
                    <Button
                        size="md"
                        type="submit" className="btn btn-primary">
                        Login
                    </Button>
                </form>
                <div className="features">
                    <p>
                        Interested in Employee Career Pathing System using AES?{" "}
                        <a href="#">Contact us</a> to know more!
                    </p>
                </div>
            </div>
        </Center>
    );
};

export default Login;
