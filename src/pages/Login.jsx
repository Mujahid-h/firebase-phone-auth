// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "../styles.css";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import GoogleLogin from "../components/GoogleLogin";

// Login component
const Login = () => {
  // State for form fields and authentication user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // useEffect to listen for changes in authentication state
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  // Handler for sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setAuthUser(null);
      toast.success("Sign out Successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Handler for login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      toast.success("Login Successfully");

      // Clear form fields after successful login
      setEmail("");
      setPassword("");
    } catch (error) {
      // Display error message for invalid credentials
      toast.error("Invalid Credentials");
    }
  };

  // Handler to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Render the Login form
  return (
    <div className="container" style={{ flexDirection: "column" }}>
      <Toaster />
      <form onSubmit={handleLogin}>
        <h2>Login to your Account</h2>

        {/* Email input */}
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password input with toggleable visibility */}
        <label>Password:</label>
        <div className="password-input">
          <input
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordVisible ? (
            <AiOutlineEye onClick={togglePasswordVisibility} />
          ) : (
            <AiOutlineEyeInvisible onClick={togglePasswordVisibility} />
          )}
        </div>

        {/* Display login and GoogleLogin components if not authenticated */}
        {authUser ? null : (
          <>
            <button type="submit">Login</button>
            <GoogleLogin />
          </>
        )}
      </form>

      {/* Display user info and sign out button if authenticated */}
      <div style={{ margin: "10px 0", textAlign: "center" }}>
        {authUser ? (
          <>
            <p>
              Signed In as{" "}
              <strong>
                {" "}
                {authUser.username ? authUser.username : authUser.email}
              </strong>
            </p>{" "}
            <button onClick={handleSignOut}>Sign Out</button>{" "}
          </>
        ) : (
          <p>
            <strong>Not Signed In</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
