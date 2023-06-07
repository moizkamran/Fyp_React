import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/Firebase";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);

        const handlePasswordChange = (event) => {
            setPassword(event.target.value);
        };


        const Register = (e) => {
            e.preventDefault();
            createUserWithEmailAndPassword(auth, email, password).then((userCredenial) => {
                console.log(userCredenial)
            }).catch((error) => {
                console.log(error)
            })
        }

        return (
            <div>
                <form onSubmit={Register}>
                    <h1>Create Account</h1>
                    <label>
                        Email:
                        <input type="email" value={email} onChange={handleEmailChange} />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="password" value={password} onChange={handlePasswordChange} />
                    </label>
                    <br />
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    };

    export default Register;
