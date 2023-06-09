import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase/Firebase";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [resetSent, setResetSent] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleResetPassword = (event) => {
        event.preventDefault();

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setResetSent(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <section id="login">
                <div className="login-card">
                    <div className="login-header ">
                        <h3 className="text-center">Logo</h3>
                        <h4 className="p-3 text-center">Forgot Password</h4>
                        {resetSent ? (
                            <p className="text-center">Password reset email sent. Please check your inbox.</p>
                        ) : (
                            <p>Please enter your email to reset your password:</p>
                        )}
                    </div>
                    <form onSubmit={handleResetPassword}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                required
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-primary">
                                Reset password
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default ForgotPassword;