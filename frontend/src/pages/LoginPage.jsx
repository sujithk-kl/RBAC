import React from 'react';

const LoginPage = () => {
    const handleGoogleLogin = () => {
        window.open('http://localhost:5000/auth/google', '_self');
    };

    const handleSignUp = () => {
        // Add logic for sign up (for example, redirect to a sign-up page)
        window.location.href = '/signup';
    };

    const handleForgotPassword = () => {
        // Add logic for forgot password (for example, redirect to reset password page)
        window.location.href = '/forgot-password';
    };

    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={handleGoogleLogin}>Login with Google</button>
            <br />
            <button onClick={handleSignUp}>Sign Up</button>
            <br />
            <button onClick={handleForgotPassword}>Forgot Password</button>
        </div>
    );
};

export default LoginPage;
