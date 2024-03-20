import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "../styles.css";
import toast, { Toaster } from "react-hot-toast";
import GoogleLogin from "../components/GoogleLogin";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    uppercase: false,
    numeric: false,
    special: false,
  });

  const checkPasswordCriteria = (newPassword) => {
    setPasswordCriteria({
      uppercase: newPassword.match(/[A-Z]/),
      numeric: newPassword.match(/\d/),
      special: newPassword.match(/[@$!%*?&]/),
    });
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;

    if (newPassword.length > 0) {
      checkPasswordCriteria(newPassword);
    } else {
      setPasswordCriteria({
        uppercase: false,
        numeric: false,
        special: false,
      });
    }

    setPassword(newPassword);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters and include one uppercase letter, one numeric digit, and one special character."
      );
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      setUsername("");
      setEmail("");
      setPassword("");

      const currentUser = auth.currentUser;
      if (currentUser) {
        await signOut(auth);
      }

      toast.success("Registered Successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <Toaster />
      <form onSubmit={handleSignup}>
        <h2>Create an Account</h2>
        <label>User Name:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="form-control"
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-control"
        />
        <label>Password:</label>
        <div className="password-input">
          <input
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            required
            className="form-control"
          />
          {passwordVisible ? (
            <AiOutlineEye onClick={togglePasswordVisibility} />
          ) : (
            <AiOutlineEyeInvisible onClick={togglePasswordVisibility} />
          )}
        </div>
        {password.length > 0 && (
          <div>
            <p style={{ color: passwordCriteria.uppercase ? "green" : "red" }}>
              At least 1 uppercase letter
            </p>
            <p style={{ color: passwordCriteria.numeric ? "green" : "red" }}>
              At least 1 numeric digit
            </p>
            <p style={{ color: passwordCriteria.special ? "green" : "red" }}>
              At least 1 special character ("@$!%*?&")
            </p>
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
        <GoogleLogin />{" "}
      </form>
    </div>
  );
};

export default Signup;
