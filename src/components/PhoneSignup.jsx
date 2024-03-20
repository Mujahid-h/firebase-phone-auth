import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase";
import toast, { Toaster } from "react-hot-toast";

const PhoneSignup = () => {
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState("");
  const [otp, setOtp] = useState("");

  const sendOTP = async () => {
    try {
      // Ensure the correct ID is used for the container element
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {});
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
      setUser(confirmation);
      console.log(confirmation);
      setPhone("");
      toast.success("OTP sent at your phone number");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", error);
    }
  };

  const verifyOTP = async () => {
    try {
      const data = await user.confirm(otp);
      console.log(data);
      setOtp("");
      toast.success("OTP Verified");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", error);
    }
  };

  return (
    <div className="phone-signin">
      <Toaster />
      <div className="phone-content">
        <PhoneInput
          country={"pk"}
          value={phone}
          onChange={(value, country, event, formattedValue) =>
            setPhone(formattedValue)
          }
        />
        <button style={{ marginTop: "20px" }} onClick={sendOTP}>
          Send OTP
        </button>
        {/* Ensure there is an element with ID recaptcha-container */}
        <div id="recaptcha-container"></div>
        <input
          type="text"
          style={{ width: "280px" }}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button onClick={verifyOTP}>Verify OTP</button>
      </div>
    </div>
  );
};

export default PhoneSignup;
