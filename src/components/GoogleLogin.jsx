// Import necessary libraries and components
import React from "react";
import { auth, googleProvider } from "../firebase";
import GoogleButton from "react-google-button";
import toast from "react-hot-toast";
import { signInWithPopup } from "firebase/auth";

// GoogleLogin component
const GoogleLogin = () => {
  // Handler for Google login
  const handleGoogleLogin = async () => {
    try {
      // Sign in with Google using a popup
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      toast.success("Google Signup Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Google Signup Failed");
    }
  };

  // Render the GoogleLogin button
  return (
    <>
      <GoogleButton type="button" onClick={handleGoogleLogin} />
    </>
  );
};

export default GoogleLogin;
